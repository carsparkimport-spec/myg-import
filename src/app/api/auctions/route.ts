import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type AuctionItem = {
  id: string;
  title?: string;
  year?: number;
  mileage?: number;
  auctionHouse?: string;
  grade?: string;
  priceYen?: number;
  description?: string;
  images: string[];
};

type AuctionMeta = Partial<AuctionItem> & {
  order?: string[];
  groups?: {
    label?: string[];
    exterior?: string[];
    interior?: string[];
  };
};

function toTitleFromSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function isImageFilename(name: string): boolean {
  return /\.(?:jpe?g|png|webp|gif)$/i.test(name);
}

function normalize(str: string): string {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

function detectGroup(fileName: string): 'label' | 'exterior' | 'interior' {
  const n = normalize(fileName);
  // Heuristic: label/price screenshot or composed image first
  if (
    n.includes('prix') ||
    n.includes('price') ||
    n.includes('eur') ||
    n.includes('€') ||
    n.includes('yen') ||
    n.includes('¥') ||
    /\b\d{1,3}(?:[ .]\d{3})+\s*km\b/.test(n) ||
    n.includes("capture d ecran") ||
    n.includes('capture d') // broad fallback for screenshots
  ) {
    return 'label';
  }
  // Interior detection
  if (
    n.includes('interieur') ||
    n.includes('interior') ||
    n.includes('inside') ||
    n.includes('cockpit') ||
    n.includes('dashboard') ||
    n.includes('dash') ||
    n.includes('console') ||
    n.includes('seat') ||
    n.includes('siege') ||
    n.includes('volant') ||
    n.includes('steering')
  ) {
    return 'interior';
  }
  return 'exterior';
}

function getGroupWeight(fileName: string, metaGroups?: AuctionMeta['groups']): number {
  if (metaGroups) {
    if (metaGroups.label?.includes(fileName)) return 0;
    if (metaGroups.exterior?.includes(fileName)) return 1;
    if (metaGroups.interior?.includes(fileName)) return 2;
  }
  const g = detectGroup(fileName);
  return g === 'label' ? 0 : g === 'interior' ? 2 : 1;
}

function listImagesInDir(dirPath: string, webBasePath: string, meta?: AuctionMeta): string[] {
  const fileNames = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((f) => f.isFile())
    .map((f) => f.name)
    .filter(isImageFilename);

  // Collect file stats for time-based fallback ordering
  const entries = fileNames.map((name) => {
    const fullPath = path.join(dirPath, name);
    let ctime = 0;
    try {
      const st = fs.statSync(fullPath);
      // Prefer birthtime (creation) then ctime/mtime
      ctime = (st.birthtimeMs || st.ctimeMs || st.mtimeMs || 0) as number;
    } catch {}
    const numMatch = name.match(/^\s*(\d+)/);
    const leadingNum = numMatch ? parseInt(numMatch[1] as string, 10) : Number.POSITIVE_INFINITY;
    const groupW = getGroupWeight(name, meta?.groups);
    return { name, ctime, leadingNum, groupW };
  });

  const usesNumeric = entries.filter((e) => Number.isFinite(e.leadingNum)).length >= 1;

  const ordered = [...entries];
  if (meta?.order && Array.isArray(meta.order) && meta.order.length > 0) {
    const orderIndex = new Map<string, number>();
    meta.order.forEach((n, i) => orderIndex.set(n, i));
    ordered.sort((a, b) => {
      const ia = orderIndex.has(a.name) ? (orderIndex.get(a.name) as number) : Number.POSITIVE_INFINITY;
      const ib = orderIndex.has(b.name) ? (orderIndex.get(b.name) as number) : Number.POSITIVE_INFINITY;
      if (ia !== ib) return ia - ib;
      // If both unspecified, keep a stable sensible fallback
      if (usesNumeric && a.leadingNum !== b.leadingNum) return a.leadingNum - b.leadingNum;
      if (a.groupW !== b.groupW) return a.groupW - b.groupW;
      if (a.ctime !== b.ctime) return a.ctime - b.ctime;
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });
  } else if (usesNumeric) {
    // Strict numeric-first ordering when at least one file is numbered
    ordered.sort((a, b) => {
      const an = a.leadingNum;
      const bn = b.leadingNum;
      if (an !== bn) return an - bn;
      // Non-numbered (Infinity) go after numbered
      if (!Number.isFinite(an) && Number.isFinite(bn)) return 1;
      if (Number.isFinite(an) && !Number.isFinite(bn)) return -1;
      // Fallbacks: time then natural
      if (a.ctime !== b.ctime) return a.ctime - b.ctime;
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });
  } else {
    // Heuristic (label/exterior/interior) then by capture time then natural
    ordered.sort((a, b) => {
      if (a.groupW !== b.groupW) return a.groupW - b.groupW;
      if (a.ctime !== b.ctime) return a.ctime - b.ctime;
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });
  }

  return ordered.map((e) => `${webBasePath}/${encodeURIComponent(e.name)}`);
}

function readMetaIfPresent(dirPath: string): AuctionMeta {
  const metaPath = path.join(dirPath, 'meta.json');
  if (!fs.existsSync(metaPath)) return {};
  try {
    const raw = fs.readFileSync(metaPath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed as AuctionMeta;
  } catch {}
  return {};
}

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const auctionsDir = path.join(publicDir, 'images', 'auctions');

    if (!fs.existsSync(auctionsDir)) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const topLevelEntries = fs.readdirSync(auctionsDir, { withFileTypes: true });
    const directoryNames = topLevelEntries.filter((d) => d.isDirectory()).map((d) => d.name);

    const items: AuctionItem[] = [];

    for (const dirName of directoryNames) {
      const dirPath = path.join(auctionsDir, dirName);
      const webBasePath = `/images/auctions/${encodeURIComponent(dirName)}`;
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });

      const hasImagesHere = entries.some((e) => e.isFile() && isImageFilename(e.name));
      const hasSubdirs = entries.some((e) => e.isDirectory());

      if (hasImagesHere || !hasSubdirs) {
        // Prefer a nested "source" directory if present (to use numbered files 1..n)
        const sourceEntry = entries.find((e) => e.isDirectory() && e.name.toLowerCase() === 'source');
        const preferredPath = sourceEntry ? path.join(dirPath, sourceEntry.name) : dirPath;
        const preferredWebBase = sourceEntry ? `${webBasePath}/${encodeURIComponent(sourceEntry.name)}` : webBasePath;
        const meta = readMetaIfPresent(preferredPath);
        const images = listImagesInDir(preferredPath, preferredWebBase, meta);
        if (images.length > 0) {
          items.push({
            id: dirName,
            title: meta.title ?? toTitleFromSlug(dirName),
            year: meta.year,
            mileage: meta.mileage,
            auctionHouse: meta.auctionHouse,
            grade: meta.grade,
            priceYen: meta.priceYen,
            description: meta.description,
            images,
          });
        }
        continue;
      }

      // Nested structure: iterate subdirectories as individual auction items
      const subdirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
      for (const sub of subdirs) {
        const subPath = path.join(dirPath, sub);
        const subWebBase = `${webBasePath}/${encodeURIComponent(sub)}`;
        const subEntries = fs.readdirSync(subPath, { withFileTypes: true });
        const sourceEntry = subEntries.find((e) => e.isDirectory() && e.name.toLowerCase() === 'source');
        const preferredPath = sourceEntry ? path.join(subPath, sourceEntry.name) : subPath;
        const preferredWebBase = sourceEntry ? `${subWebBase}/${encodeURIComponent(sourceEntry.name)}` : subWebBase;
        const meta = readMetaIfPresent(preferredPath);
        const images = listImagesInDir(preferredPath, preferredWebBase, meta);
        if (images.length === 0) continue;
        items.push({
          id: sub,
          title: meta.title ?? toTitleFromSlug(sub),
          year: meta.year,
          mileage: meta.mileage,
          auctionHouse: meta.auctionHouse,
          grade: meta.grade,
          priceYen: meta.priceYen,
          description: meta.description,
          images,
        });
      }
    }

    return NextResponse.json({ items }, { status: 200 });
  } catch {
    return NextResponse.json({ items: [], error: 'Failed to load auctions' }, { status: 200 });
  }
}


