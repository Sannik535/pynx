// lib/actions/update-product.ts
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

export async function updateProduct(formData: FormData) {
  const id = String(formData.get("id") ?? "");
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

  if (!id || !name || !sku || !categoryName || Number.isNaN(price)) {
    throw new Error(
      "Missing required fields: name, sku, category, and price are required."
    );
  }

  const categorySlug = slugify(categoryName);

  const category = await prisma.category.upsert({
    where: { slug: categorySlug },
    update: {},
    create: { name: categoryName, slug: categorySlug },
  });

  const existingImage = await prisma.productImage.findFirst({
    where: { productId: id },
    orderBy: { position: "asc" },
  });

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      brand,
      sku,
      stock,
      rating,
      categoryId: category.id,
    },
  });

  if (imageUrl) {
    if (existingImage) {
      await prisma.productImage.update({
        where: { id: existingImage.id },
        data: { url: imageUrl, alt: imageAlt },
      });
    } else {
      await prisma.productImage.create({
        data: { productId: id, url: imageUrl, alt: imageAlt, position: 0 },
      });
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");

  redirect("/admin/products?updated=1");
}