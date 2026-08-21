"use client";

import { useRouter } from "next/navigation";

export function OrderRow({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <tr
      onClick={() => router.push(href)}
      className="cursor-pointer border-b border-border transition-colors hover:bg-surface"
    >
      {children}
    </tr>
  );
}
