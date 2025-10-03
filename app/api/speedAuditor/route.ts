export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { SEOAnalysisOrchestrator } from '@/lib/analyzeSeoWebsite';
import { SpeedAuditor } from '@/lib/technical-seo-analyzer/speed-audit';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = body?.url;
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid "url" in request body' }, { status: 400 });
    }

  // Allow caller to request a fast response (kick off background analyses)
  const fastMode = !!body?.fastMode;
  const seoAnalyzer = new SEOAnalysisOrchestrator(url, { fastMode });
  // runFullAnalysis will either run everything and return final results (normal mode)
  // or return partial results and a tasks record immediately when fastMode is true.
  const auditor = new SpeedAuditor();
  const result = await auditor.audit(url);
  console.log("Speed audit result:", result);
  return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error('Analyze API error', err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
