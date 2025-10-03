import { NextResponse } from 'next/server';
import { analyzeWebsite } from '../../../lib/websiteAnalyzer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = body?.url;
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid "url" in request body' }, { status: 400 });
    }

    const result = await analyzeWebsite(url);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error('Analyze API error', err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
