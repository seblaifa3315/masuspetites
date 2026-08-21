import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/admin/sidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [newOrderCount, unreadMessageCount] = await Promise.all([
    prisma.order.count({ where: { status: "PAID" } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  return (
    <div className="flex min-h-screen">
      <Sidebar newOrderCount={newOrderCount} unreadMessageCount={unreadMessageCount} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
