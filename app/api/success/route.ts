export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const {
      userId,
      address,
      totalAmount,
      items,
    }: {
      userId: number;
      address: string;
      totalAmount: number;
      items: {
        productId: number;
        quantity: number;
        note?: string;
        protection: boolean;
      }[];
    } = await request.json();

    if (!userId || !address || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Incorrect order data" },
        { status: 400 }
      );
    }

    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          userId,
          status: "PENDING",
          address,
          totalAmount,
          items: {
            create: items.map((it) => ({
              product: { connect: { id: it.productId } },
              quantity: it.quantity,
              note: it.note ?? null,
              protection: it.protection,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      for (const it of items) {
        await tx.product.update({
          where: { id: it.productId },
          data: {
            stock: {
              decrement: it.quantity,
            },
          },
        });
      }

      return createdOrder;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: unknown) {
    console.error("Order creation error:", error);
    const message = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
