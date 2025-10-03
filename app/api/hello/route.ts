import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse('hello world', {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
