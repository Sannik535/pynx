// lib/actions/delete-category.ts
"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function deleteCategory(formData: FormData) {
  const id = String(formData.get("id"));

  const productCount = await prisma.product.count({
    where: { categoryId: id },
  });

  if (productCount > 0) {
    throw new Error(
      `Can't delete this category — ${productCount} product(s) still use it. Move or delete those products first.`
    );
  }

  await prisma.category.delete({ where: { id } });

  revalidatePath("/admin/categories");
}