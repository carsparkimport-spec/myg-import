import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const from = (searchParams.get('from') || 'JPY').toUpperCase();
    const to = (searchParams.get('to') || 'EUR').toUpperCase();
    const windowDays = Math.min(Math.max(parseInt(searchParams.get('window') || '7', 10) || 7, 1), 30);

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (windowDays - 1));
    const startStr = toISODate(start);
    const endStr = toISODate(end);

    const xeAccountId = process.env.XE_ACCOUNT_ID;
    const xeApiKey = process.env.XE_API_KEY;

    // Try XE live rate if credentials are present (single-day rate)
    if (xeAccountId && xeApiKey) {
      try {
        const auth = Buffer.from(`${xeAccountId}:${xeApiKey}`).toString('base64');
        const xeUrl = `https://xecdapi.xe.com/v1/convert_to.json?to=${to}&from=${from}&amount=1`;
        const xeRes = await fetch(xeUrl, {
          headers: { Authorization: `Basic ${auth}` },
          cache: 'no-store',
        });
        if (xeRes.ok) {
          const data = await xeRes.json();
          // data.to[0].mid typically contains the mid-market rate
          const mid = data?.to?.[0]?.mid ?? data?.to?.[0]?.rate;
          if (typeof mid === 'number' && isFinite(mid)) {
            const eurPerJpy = to === 'EUR' && from === 'JPY' ? mid : 1 / mid;
            const jpyPerEur = 1 / eurPerJpy;
            return NextResponse.json({
              eurPerJpy: +eurPerJpy.toFixed(6),
              jpyPerEur: +jpyPerEur.toFixed(6),
              source: 'XE',
              window: 1,
              start: startStr,
              end: endStr,
              updatedAt: new Date().toISOString(),
            });
          }
        }
      } catch (err) {
        // fall through to fallback
      }
    }

    // Fallback: exchangerate.host timeseries to compute 7-day average JPY per EUR
    const url = `https://api.exchangerate.host/timeseries?base=${to}&symbols=${from}&start_date=${startStr}&end_date=${endStr}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 502 });
    }
    const json = await res.json();
    const rates = json?.rates || {};
    let sum = 0;
    let count = 0;
    for (const day of Object.keys(rates)) {
      const v = rates[day]?.[from];
      if (typeof v === 'number' && isFinite(v)) {
        sum += v;
        count += 1;
      }
    }
    const jpyPerEur = count ? +(sum / count).toFixed(6) : null;
    const eurPerJpy = jpyPerEur ? +(1 / jpyPerEur).toFixed(6) : null;

    return NextResponse.json({
      eurPerJpy,
      jpyPerEur,
      source: 'exchangerate.host',
      window: windowDays,
      start: startStr,
      end: endStr,
      updatedAt: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}


