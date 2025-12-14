export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const ids = await req.json();
    if (!Array.isArray(ids) || !ids.every((i) => typeof i === "number")) {
      return new NextResponse("Invalid body format", { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        price: true,
        stock: true,
        category: { select: { name: true } },
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Cart API error:", error);
    return NextResponse.json(
  { error: (error as Error).message },
  { status: 500 }
);
  }
}