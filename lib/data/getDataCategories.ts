import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type CategoryFields = "id" | "name" | "imageUrl" | "iconUrl" | "description" | "exploreInfo";

type GetCategoriesOptions = {
  fields?: CategoryFields[];
};

export const getDataCategories = unstable_cache(
  async (options?: GetCategoriesOptions) => {
    const requestedFields = options?.fields ?? ["id", "name", "imageUrl", "iconUrl", "description"];

    const select: Record<CategoryFields, boolean> = {
      id: requestedFields.includes("id"),
      name: requestedFields.includes("name"),
      imageUrl: requestedFields.includes("imageUrl"),
      iconUrl: requestedFields.includes("iconUrl"),
      description: requestedFields.includes("description"),
      exploreInfo: requestedFields.includes("exploreInfo"),
    };

    return await prisma.category.findMany({ select });
  },
  ["categories-cache-key"],
  { revalidate: 3600 }
);
