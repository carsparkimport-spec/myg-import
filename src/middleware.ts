import { NextRequest, NextResponse } from 'next/server';

// Aperçu privé : protège uniquement les adresses de prévisualisation Replit (*.replit.dev).
// Le site public (nom de domaine, .replit.app) et localhost ne sont pas concernés.
// Le mot de passe est PREVIEW_TOKEN (.env.local, jamais commité). Sans lui, l'aperçu reste fermé.
// Accès : ouvrir une fois  https://<domaine-apercu>/eu/stock?key=<PREVIEW_TOKEN>  (cookie de 7 jours).
const COOKIE = 'myg_preview';
const MAX_AGE = 60 * 60 * 24 * 7;

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function closed(status: number, message: string): NextResponse {
  return new NextResponse(
    `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="robots" content="noindex">` +
      `<title>Accès privé</title><body style="margin:0;min-height:100vh;display:grid;place-items:center;` +
      `background:#000;color:#9ca3af;font:16px system-ui,sans-serif;text-align:center">` +
      `<p>${message}</p></body></html>`,
    {
      status,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'x-robots-tag': 'noindex, nofollow',
      },
    }
  );
}

export async function middleware(req: NextRequest) {
  const host = (req.headers.get('host') ?? '').split(':')[0].toLowerCase();
  if (!host.endsWith('.replit.dev')) return NextResponse.next();

  const token = process.env.PREVIEW_TOKEN;
  if (!token) return closed(503, 'Aperçu privé : non configuré.');

  const expected = await sha256(token);

  // Premier accès avec le mot de passe dans l'adresse : on pose le cookie puis on nettoie l'adresse
  const given = req.nextUrl.searchParams.get('key');
  if (given && safeEqual(await sha256(given), expected)) {
    const proto = req.headers.get('x-forwarded-proto') ?? 'https';
    const target = new URL(`${proto}://${req.headers.get('host')}${req.nextUrl.pathname}`);
    req.nextUrl.searchParams.forEach((value, name) => {
      if (name !== 'key') target.searchParams.append(name, value);
    });
    const res = NextResponse.redirect(target);
    res.cookies.set(COOKIE, expected, { httpOnly: true, secure: true, sameSite: 'none', maxAge: MAX_AGE, path: '/' });
    res.headers.set('cache-control', 'no-store');
    return res;
  }

  const cookie = req.cookies.get(COOKIE)?.value;
  if (cookie && safeEqual(cookie, expected)) {
    const res = NextResponse.next();
    res.headers.set('x-robots-tag', 'noindex, nofollow');
    return res;
  }

  return closed(401, 'Accès privé.');
}

export const config = { matcher: '/:path*' };
