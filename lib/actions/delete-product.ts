// lib/actions/delete-product.ts
"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get("id"));

  await prisma.product.delete({ where: { id } });

  revalidatePath("/admin/products");
  revalidatePath("/products");
}