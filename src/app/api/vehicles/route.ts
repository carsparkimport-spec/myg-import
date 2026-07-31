import { NextResponse } from 'next/server';
import vehiclesData from '@/data/vehicles.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const visible = (vehiclesData as Array<Record<string, unknown>>).filter(v => !v.hidden);
  return NextResponse.json(visible);
}
