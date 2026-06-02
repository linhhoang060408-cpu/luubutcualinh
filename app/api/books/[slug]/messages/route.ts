import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
export async function POST(request: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await request.json();
    const { senderName, senderClass, email, facebook, instagram, message, memorableQ, futureWishQ, anonymous, images } = body;
    const book = await prisma.memoryBook.findUnique({ where: { slug: params.slug } });
    if (!book) return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });

    const newMessage = await prisma.message.create({
      data: {
        memoryBookId: book.id,
        senderName: anonymous ? "Người bí ẩn" : senderName,
        senderClass, email, facebook, instagram, message, memorableQ, futureWishQ, anonymous,
        images: { create: images.map((url: string) => ({ url })) }
      }
    });
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
