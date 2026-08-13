"use server";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

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

    // Send email notification
    const recipients = process.env.CONTACT_NOTIFICATION_EMAIL?.split(",").map((e) => e.trim()).filter(Boolean);
    if (recipients && recipients.length > 0) {
      await resend.emails.send({
        from: "Masus Petites <onboarding@resend.dev>",
        to: recipients,
        subject: `New contact message from ${name.trim()}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0A0A0A;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="text-align:center;padding-bottom:32px;">
              <h1 style="margin:0;font-size:24px;color:#F0F0F0;letter-spacing:1px;">Masus Petites</h1>
              <p style="margin:4px 0 0;font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:2px;">Tattoo Art Prints</p>
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background-color:#161616;border-radius:12px;border:1px solid #262626;padding:32px;">
              <h2 style="margin:0 0 24px;font-size:18px;color:#EC4899;">New Contact Message</h2>
              <!-- Name -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Name</td>
                </tr>
                <tr>
                  <td style="font-size:15px;color:#F0F0F0;">${name.trim()}</td>
                </tr>
              </table>
              <!-- Email -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Email</td>
                </tr>
                <tr>
                  <td style="font-size:15px;">
                    <a href="mailto:${email.trim()}" style="color:#EC4899;text-decoration:none;">${email.trim()}</a>
                  </td>
                </tr>
              </table>
              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #262626;margin:20px 0;">
              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:1px;padding-bottom:8px;">Message</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#F0F0F0;line-height:1.6;">${message.trim().replace(/\n/g, "<br>")}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="text-align:center;padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#737373;">This message was sent from the contact form on your website.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      });
    }

    return { success: true };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}
