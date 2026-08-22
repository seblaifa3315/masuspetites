import {
  getTotalRevenue,
  getOrderCount,
  getNewClients,
  getAverageOrderValue,
  getMonthlyRevenue,
  getMonthlyOrders,
  getYearlyRevenue,
  getYearlyOrders,
  getTopProducts,
  getTopProductsThisMonth,
  getTopProductsThisYear,
  getOrderStatusBreakdown,
  getRecentOrders,
  type DateRange,
} from "@/lib/dashboard-queries";
import { KpiCards } from "@/components/admin/dashboard/kpi-cards";
import { DashboardDateFilter } from "@/components/admin/dashboard/date-filter";
import {
  RevenueBarChart,
  OrdersLineChart,
  TopProductsChart,
  OrderStatusDonut,
} from "@/components/admin/dashboard/charts";
import { RecentOrdersTable } from "@/components/admin/dashboard/recent-orders-table";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { from, to } = await searchParams;

  const dateFrom = from || "";
  const dateTo = to || "";

  const range: DateRange = {};
  if (dateFrom) range.from = new Date(dateFrom);
  if (dateTo) range.to = new Date(dateTo);

  const [
    totalRevenue,
    orderCount,
    newClients,
    averageOrderValue,
    monthlyRevenue,
    yearlyRevenue,
    monthlyOrders,
    yearlyOrders,
    topProducts,
    topProductsThisMonth,
    topProductsThisYear,
    orderStatusBreakdown,
    recentOrders,
  ] = await Promise.all([
    getTotalRevenue(range),
    getOrderCount(range),
    getNewClients(range),
    getAverageOrderValue(range),
    getMonthlyRevenue(),
    getYearlyRevenue(),
    getMonthlyOrders(),
    getYearlyOrders(),
    getTopProducts(),
    getTopProductsThisMonth(),
    getTopProductsThisYear(),
    getOrderStatusBreakdown(),
    getRecentOrders(),
  ]);

  const serializedRecentOrders = recentOrders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    totalCents: order.totalCents,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
    itemCount: order.items.reduce((sum, i) => sum + i.quantity, 0),
  }));

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted">
          Overview of your store performance.
        </p>
      </div>

      <div className="space-y-6">
        <DashboardDateFilter dateFrom={dateFrom} dateTo={dateTo} />

        <KpiCards
          totalRevenue={totalRevenue}
          orderCount={orderCount}
          newClients={newClients}
          averageOrderValue={averageOrderValue}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RevenueBarChart
            monthlyData={monthlyRevenue}
            yearlyData={yearlyRevenue}
          />
          <OrdersLineChart
            monthlyData={monthlyOrders}
            yearlyData={yearlyOrders}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TopProductsChart
            allTimeData={topProducts}
            thisMonthData={topProductsThisMonth}
            thisYearData={topProductsThisYear}
          />
          <OrderStatusDonut data={orderStatusBreakdown} />
        </div>

        <RecentOrdersTable orders={serializedRecentOrders} />
      </div>
    </div>
  );
}
