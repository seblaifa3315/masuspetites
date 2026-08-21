"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Package, FileText, MessageSquare, Settings, ChevronsLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "./logout-button";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ newOrderCount = 0, unreadMessageCount = 0 }: { newOrderCount?: number; unreadMessageCount?: number }) {
  const [collapsed, setCollapsed] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setEmail(session?.user?.email ?? null);
    });
  }, []);

  return (
    <aside
      className={`flex flex-col border-r border-border bg-surface transition-all duration-200 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center">
          {!collapsed && (
            <h2 className="flex-1 font-heading text-lg font-bold">Admin Panel</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`rounded-md border border-border p-2 text-muted transition-colors hover:bg-background hover:text-foreground ${collapsed ? "mx-auto" : ""}`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronsLeft
              className={`h-4 w-4 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* User info */}
        <div className={`mt-4 flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
          <div
            className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full"
            title={collapsed ? email ?? undefined : undefined}
          >
            <Image
              src="/admin-login.png"
              alt="Avatar"
              fill
              sizes="40px"
              className="object-cover object-[center_25%]"
            />
          </div>
          {!collapsed && (
            <span className="truncate text-sm text-muted">{email}</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const badgeCount =
            item.href === "/admin/orders" ? newOrderCount :
            item.href === "/admin/messages" ? unreadMessageCount : 0;
          const showBadge = badgeCount > 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`relative flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-background hover:text-foreground ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {showBadge && collapsed && (
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent" />
                )}
              </div>
              {!collapsed && (
                <span className="flex items-center gap-1.5">
                  {item.label}
                  {showBadge && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-white">
                      {badgeCount}
                    </span>
                  )}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-2">
        {collapsed ? (
          <div className="flex flex-col items-center gap-2">
            <ThemeToggle />
            <LogoutButton collapsed />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <LogoutButton />
            <ThemeToggle />
          </div>
        )}
      </div>
    </aside>
  );
}
