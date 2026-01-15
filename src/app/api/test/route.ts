import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  return NextResponse.json({
    apiKeyPresent: !!apiKey,
    apiKeyLength: apiKey?.length || 0,
    apiKeyPreview: apiKey ? `${apiKey.substring(0, 10)}...` : 'Not set',
    environment: process.env.NODE_ENV,
    message: apiKey ? 'API key is configured' : 'API key is MISSING - check Netlify environment variables'
  });
}
