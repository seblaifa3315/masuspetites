"use server";

import { prisma } from "@/lib/prisma";

interface ContactFormState {
  success?: boolean;
  error?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const message = formData.get("message") as string | null;

  if (!name || !name.trim()) {
    return { error: "Name is required." };
  }
  if (!email || !email.trim()) {
    return { error: "Email is required." };
  }
  if (!message || !message.trim()) {
    return { error: "Message is required." };
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      },
    });
    return { success: true };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}
