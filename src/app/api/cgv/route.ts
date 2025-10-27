import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

type Section = { id: string; title: string; body: string };

function parseCgvText(text: string): Section[] {
  const headingRe = /Article\s+(\d+)\s*[–—-]\s*([^\n\r]+)/gi;
  const matches = Array.from(text.matchAll(headingRe));
  if (matches.length === 0) return [];
  const sections: Section[] = [];
  for (let i = 0; i < matches.length; i += 1) {
    const m = matches[i];
    const id = m[1];
    const titleText = m[2];
    const start = (m.index ?? 0) + m[0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? text.length) : text.length;
    const body = text.slice(start, end).trim();
    sections.push({ id, title: `Article ${id} – ${titleText}`, body });
  }
  return sections;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') === 'sale' ? 'sale' : 'import';
  const locale = url.searchParams.get('locale') === 'en' ? 'en' : 'fr';

  const publicDir = path.join(process.cwd(), 'public', 'cgv', type);
  const mdPath = path.join(publicDir, `${locale}.md`);
  const docxPath = path.join(publicDir, `${locale}.docx`);

  // Try markdown first
  try {
    const md = await fs.readFile(mdPath, 'utf8');
    const sections = parseCgvText(md);
    if (sections.length > 0) {
      return new NextResponse(JSON.stringify({ sections, source: 'md' }), {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    }
  } catch {}

  // Fallback: docx to raw text using a lightweight parser (no external deps server-side)
  // We avoid parsing binary DOCX; instead, serve empty sections when only docx is present.
  // The client-side already handles DOCX via mammoth if present at the same path.
  try {
    await fs.stat(docxPath);
    // Let the client handle conversion; indicate presence so the UI can fetch the file directly
    return new NextResponse(JSON.stringify({ sections: [], source: 'docx' }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch {}

  return new NextResponse(JSON.stringify({ sections: [], source: 'none' }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}


