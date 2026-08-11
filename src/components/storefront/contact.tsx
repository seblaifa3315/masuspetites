"use client";

import { useActionState } from "react";
import { Mail, Send } from "lucide-react";
import { InstagramIcon, TikTokIcon, XIcon } from "./icons";
import { submitContactForm } from "@/app/actions";

const socials = [
  { label: "Instagram", href: "https://instagram.com/", icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com/@", icon: TikTokIcon },
  { label: "X", href: "https://x.com/", icon: XIcon },
];

export default function Contact() {
  const [state, formAction, pending] = useActionState(submitContactForm, null);

  return (
    <section id="contact" className="scroll-mt-20 bg-surface py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          Get in Touch
        </h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Left — contact info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-lg font-semibold mb-2">Email</h3>
              <a
                href="mailto:hello@masuspetites.com"
                className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@masuspetites.com
              </a>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold mb-3">Follow Us</h3>
              <div className="flex items-center gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background hover:bg-accent hover:text-white text-muted transition-colors"
                    aria-label={s.label}
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — contact form */}
          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors disabled:opacity-50 text-sm"
            >
              <Send className="w-4 h-4" />
              {pending ? "Sending..." : "Send Message"}
            </button>
            {state?.success && (
              <p className="text-green-400 text-sm">
                Message sent! We&apos;ll get back to you soon.
              </p>
            )}
            {state?.error && (
              <p className="text-red-400 text-sm">{state.error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
