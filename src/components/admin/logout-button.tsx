"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton({ collapsed }: { collapsed?: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (collapsed) {
    return (
      <button
        onClick={handleLogout}
        title="Sign out"
        className="rounded-md border border-border p-2 text-muted transition-colors hover:bg-background hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full rounded-md border border-border px-3 py-2 text-sm text-muted transition-colors hover:bg-background hover:text-foreground"
    >
      Sign out
    </button>
  );
}
