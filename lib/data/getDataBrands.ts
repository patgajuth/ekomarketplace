import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type BrandFields = "id" | "name" | "imageUrl";

type GetBrandOptions = {
  fields?: BrandFields[];
};

export const getDataBrands = unstable_cache(
  async (options?: GetBrandOptions) => {
    const requestedFields = options?.fields ?? ["id", "name", "imageUrl"];

    const select: Record<BrandFields, boolean> = {
      id: requestedFields.includes("id"),
      name: requestedFields.includes("name"),
      imageUrl: requestedFields.includes("imageUrl"),
    };

    return await prisma.brand.findMany({ select });
  },
  ["brand-cache-key"],
  { revalidate: 3600 }
);
