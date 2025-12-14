export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { id:Number(id) },
      select: {
        id: true,
        name: true,
        description: true,
        exploreInfo: true,
        price: true,
        discount: true,
        stock: true,
        imageUrl: true,
        category: { select: { name: true } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
  { error: (error as Error).message },
  { status: 500 }
);
  }
}
