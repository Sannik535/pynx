// lib/actions/create-product.ts
"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const brand = String(formData.get("brand") ?? "").trim() || undefined;
  const sku = String(formData.get("sku") ?? "").trim();
  const stock = Number(formData.get("stock") ?? 0);
  const ratingRaw = formData.get("rating");
  const rating = ratingRaw ? Number(ratingRaw) : undefined;
  const categoryName = String(formData.get("category") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const imageAlt = String(formData.get("imageAlt") ?? "").trim() || name;

  if (!name || !sku || !categoryName || Number.isNaN(price)) {
    throw new Error("Missing required fields: name, sku, category, and price are required.");
  }

  const categorySlug = slugify(categoryName);

  const category = await prisma.category.upsert({
    where: { slug: categorySlug },
    update: {},
    create: { name: categoryName, slug: categorySlug },
  });

  const productSlug = slugify(name);

  await prisma.product.create({
    data: {
      name,
      slug: productSlug,
      description,
      price,
      brand,
      sku,
      stock,
      rating,
      categoryId: category.id,
      images: imageUrl
        ? {
            create: [{ url: imageUrl, alt: imageAlt, position: 0 }],
          }
        : undefined,
    },
  });

  // Refresh the products listing so the new product shows up immediately.
  revalidatePath("/products");

  redirect("/admin/products/new?success=1");
}