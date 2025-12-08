import { NextResponse } from 'next/server';
import { fetchVehiclesFromGitHub } from '@/lib/github';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const vehicles = await fetchVehiclesFromGitHub();
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vehicles data' },
      { status: 500 }
    );
  }
}
