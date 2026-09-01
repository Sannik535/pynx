// lib/actions/create-category.ts
"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createCategory(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || undefined;

  if (!name) {
    throw new Error("Category name is required.");
  }

  const slug = slugify(name);

  await prisma.category.upsert({
    where: { slug },
    update: {},
    create: { name, slug, description },
  });

  revalidatePath("/admin/categories");
}