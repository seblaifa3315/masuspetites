"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleReadStatus(messageId: string) {
  const message = await prisma.contactMessage.findUnique({
    where: { id: messageId },
  });

  if (!message) return;

  await prisma.contactMessage.update({
    where: { id: messageId },
    data: { isRead: !message.isRead },
  });

  revalidatePath("/admin/messages");
}

export async function deleteMessage(messageId: string) {
  await prisma.contactMessage.delete({
    where: { id: messageId },
  });

  revalidatePath("/admin/messages");
}

export async function markAllAsRead() {
  await prisma.contactMessage.updateMany({
    where: { isRead: false },
    data: { isRead: true },
  });

  revalidatePath("/admin/messages");
}

export async function toggleStarred(messageId: string) {
  const message = await prisma.contactMessage.findUnique({
    where: { id: messageId },
  });

  if (!message) return;

  await prisma.contactMessage.update({
    where: { id: messageId },
    data: { isStarred: !message.isStarred },
  });

  revalidatePath("/admin/messages");
}

export async function bulkMarkRead(ids: string[]) {
  await prisma.contactMessage.updateMany({
    where: { id: { in: ids } },
    data: { isRead: true },
  });

  revalidatePath("/admin/messages");
}

export async function bulkMarkUnread(ids: string[]) {
  await prisma.contactMessage.updateMany({
    where: { id: { in: ids } },
    data: { isRead: false },
  });

  revalidatePath("/admin/messages");
}

export async function bulkToggleStarred(ids: string[], starred: boolean) {
  await prisma.contactMessage.updateMany({
    where: { id: { in: ids } },
    data: { isStarred: starred },
  });

  revalidatePath("/admin/messages");
}

export async function bulkDelete(ids: string[]) {
  await prisma.contactMessage.deleteMany({
    where: { id: { in: ids } },
  });

  revalidatePath("/admin/messages");
}
