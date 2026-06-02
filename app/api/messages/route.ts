import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'messages.json');

async function ensureDataFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, '[]', 'utf8');
  }
}

async function readMessages() {
  await ensureDataFile();
  const raw = await fs.readFile(dataFile, 'utf8');
  return JSON.parse(raw) as any[];
}

async function writeMessages(messages: any[]) {
  await ensureDataFile();
  await fs.writeFile(dataFile, JSON.stringify(messages, null, 2), 'utf8');
}

export async function GET() {
  try {
    const messages = await readMessages();
    return NextResponse.json(messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Không thể đọc dữ liệu.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = await readMessages();
    const createdAt = new Date().toISOString();
    const message = {
      id: typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      ...body,
      createdAt,
    };
    await writeMessages([message, ...messages]);
    return NextResponse.json(message, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Lỗi khi lưu lời nhắn.' }, { status: 500 });
  }
}
