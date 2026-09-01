import prisma from "@/prisma/db";

export async function getAllProducts() {
  return prisma.product.findMany({
    include: {
      category: true,
      images: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { position: "asc" } },
      variants: {
        include: {
          images: { orderBy: { position: "asc" } },
        },
      },
    },
  });
}

export async function getProductsByCategory(categorySlug: string) {
  return prisma.product.findMany({
    where: {
      category: { slug: categorySlug },
    },
    include: {
      category: true,
      images: true,
    },
  });
}