import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updated = await prisma.message.update({ where: { id: params.id }, data: { reaction: body.reaction } });
    return NextResponse.json(updated);
  } catch (error: any) { return NextResponse.json({ error: error.message }, { status: 500 }); }
}
