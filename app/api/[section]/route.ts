import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const VALID_SECTIONS = [
  'work',
  'education',
  'projects',
  'skills',
  'leadership',
  'certifications',
] as const;

type ValidSection = (typeof VALID_SECTIONS)[number];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;

  if (!VALID_SECTIONS.includes(section as ValidSection)) {
    return NextResponse.json(
      { _error: true, message: `SECTION_NOT_FOUND: ${section}` },
      { status: 404 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), 'data', `${section}.json`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json(
      { _error: true, message: 'FILE_READ_ERROR', endpoint: section },
      { status: 500 }
    );
  }
}
