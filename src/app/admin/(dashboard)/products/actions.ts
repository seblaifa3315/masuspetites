"use server";

import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ProductActionState = {
  error?: string;
} | null;

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

async function ensureUniqueSlug(
  slug: string,
  excludeId?: string,
): Promise<string> {
  const existing = await prisma.product.findUnique({ where: { slug } });
  if (!existing || existing.id === excludeId) return slug;
  const suffix = Math.random().toString(36).substring(2, 8);
  return `${slug}-${suffix}`;
}

async function uploadImage(
  file: File,
  slug: string,
): Promise<string | null> {
  const supabase = createAdminClient();
  const ext = file.name.split(".").pop();
  const filePath = `${slug}-${Date.now()}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, buffer, {
      upsert: true,
      contentType: file.type,
    });

  if (error) {
    console.error("Image upload error:", error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(filePath);

  return publicUrl;
}

async function deleteImage(imageUrl: string) {
  const supabase = createAdminClient();
  const parts = imageUrl.split("/product-images/");
  if (parts.length < 2) return;
  const filePath = parts[1];
  await supabase.storage.from("product-images").remove([filePath]);
}

export async function createProduct(
  _prevState: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const isActive = formData.get("isActive") === "on";
  const imageFile = formData.get("image") as File | null;

  if (!name?.trim()) {
    return { error: "Product name is required." };
  }

  if (!price || isNaN(parseFloat(price)) || parseFloat(price) < 0) {
    return { error: "A valid price is required." };
  }

  const baseSlug = generateSlug(name);
  const slug = await ensureUniqueSlug(baseSlug);

  let imageUrl: string | null = null;
  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage(imageFile, slug);
    if (!imageUrl) {
      return { error: "Failed to upload image." };
    }
  }

  await prisma.product.create({
    data: {
      name: name.trim(),
      slug,
      description: description?.trim() || null,
      imageUrl,
      isActive,
      variants: {
        create: {
          sizeLabel: "Standard",
          dimensions: "",
          priceCents: Math.round(parseFloat(price) * 100),
        },
      },
    },
  });

  redirect("/admin/products");
}

export async function updateProduct(
  _prevState: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const productId = formData.get("productId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const variantId = formData.get("variantId") as string | null;
  const isActive = formData.get("isActive") === "on";
  const imageFile = formData.get("image") as File | null;

  if (!name?.trim()) {
    return { error: "Product name is required." };
  }

  if (!price || isNaN(parseFloat(price)) || parseFloat(price) < 0) {
    return { error: "A valid price is required." };
  }

  const existing = await prisma.product.findUnique({
    where: { id: productId },
    include: { variants: true },
  });

  if (!existing) {
    return { error: "Product not found." };
  }

  const baseSlug = generateSlug(name);
  const slug = await ensureUniqueSlug(baseSlug, productId);

  let imageUrl = existing.imageUrl;
  if (imageFile && imageFile.size > 0) {
    const newUrl = await uploadImage(imageFile, slug);
    if (!newUrl) {
      return { error: "Failed to upload image." };
    }
    if (existing.imageUrl) {
      await deleteImage(existing.imageUrl);
    }
    imageUrl = newUrl;
  }

  const priceCents = Math.round(parseFloat(price) * 100);

  if (variantId) {
    await prisma.$transaction([
      prisma.product.update({
        where: { id: productId },
        data: {
          name: name.trim(),
          slug,
          description: description?.trim() || null,
          imageUrl,
          isActive,
        },
      }),
      prisma.productVariant.update({
        where: { id: variantId },
        data: { priceCents },
      }),
    ]);
  } else {
    await prisma.product.update({
      where: { id: productId },
      data: {
        name: name.trim(),
        slug,
        description: description?.trim() || null,
        imageUrl,
        isActive,
        variants: {
          create: {
            sizeLabel: "Standard",
            dimensions: "",
            priceCents,
          },
        },
      },
    });
  }

  redirect("/admin/products");
}

export async function deleteProduct(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (product?.imageUrl) {
    await deleteImage(product.imageUrl);
  }

  await prisma.product.delete({ where: { id: productId } });
  revalidatePath("/admin/products");
}

export async function toggleProductActive(
  productId: string,
  isActive: boolean,
) {
  await prisma.product.update({
    where: { id: productId },
    data: { isActive },
  });
  revalidatePath("/admin/products");
}
