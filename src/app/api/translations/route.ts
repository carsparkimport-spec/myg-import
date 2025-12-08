import { NextRequest, NextResponse } from 'next/server';
import { fetchTranslationsFromGitHub, Locale } from '@/lib/github';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') as Locale;
    
    if (!locale || (locale !== 'fr' && locale !== 'en')) {
      return NextResponse.json(
        { error: 'Invalid locale. Use "fr" or "en"' },
        { status: 400 }
      );
    }
    
    const translations = await fetchTranslationsFromGitHub(locale);
    return NextResponse.json(translations);
  } catch (error) {
    console.error('Error fetching translations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch translations' },
      { status: 500 }
    );
  }
}
