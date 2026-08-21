import Link from "next/link";
import { InstagramIcon, TikTokIcon, XIcon } from "./icons";

const quickLinks = [
  { label: "Shop", href: "/#collection" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/", icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com/@", icon: TikTokIcon },
  { label: "X", href: "https://x.com/", icon: XIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <Link href="/" className="font-heading text-lg font-semibold">
            Masus Petites
          </Link>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Original tattoo art prints — designed by hand, made for your walls.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-heading text-sm font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-heading text-sm font-semibold mb-3">Follow Us</h4>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface hover:bg-accent hover:text-white text-muted transition-colors"
                aria-label={s.label}
              >
                <s.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-border text-center text-xs text-muted">
        &copy; {new Date().getFullYear()} Masus Petites. All rights reserved.
      </div>
    </footer>
  );
}
