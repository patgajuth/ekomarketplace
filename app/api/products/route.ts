export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const pageParam = parseInt(searchParams.get("page") || "1");
    const limitParam = parseInt(searchParams.get("limit") || "6");
    const skipItems = (pageParam - 1) * limitParam;

    const sortedParam = searchParams.get("sorted");
    const sortedByPrice = sortedParam === "highest_price" ? "desc" : "asc";

    const categoryParam = searchParams.get("category")?.split("_");
    const brandParam = searchParams.get("brand")?.split("_");

    const maxPriceParam = searchParams.get("maxPrice");
    const minPriceParam = searchParams.get("minPrice");

const filters: Prisma.ProductWhereInput = {};

    if (categoryParam) {
      filters.category = {
        name: {in: categoryParam},
      };
    }
    if (brandParam) {
      filters.brand = {
        name: { in: brandParam },
      };
    }
    if (minPriceParam || maxPriceParam) {
      filters.price = {};
      if (minPriceParam) {
        filters.price.gte = parseInt(minPriceParam);
      }
      if (maxPriceParam) {
        filters.price.lte = parseInt(maxPriceParam);
      }
    }

    const totalCount = await prisma.product.count({
      where: filters,
    });

    const totalPages = Math.ceil(totalCount / limitParam);

    const products = await prisma.product.findMany({
      where: filters,
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
        discount: true,
        stock: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: sortedParam === "latest" ? { createdAt: "asc" } : { price: sortedByPrice },
      skip: skipItems,
      take: limitParam,
    });

    return NextResponse.json({ products, totalPages, currentPage: pageParam, totalItems: totalCount });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
