import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

interface KpiCardsProps {
  totalRevenue: number;
  orderCount: number;
  newClients: number;
  averageOrderValue: number;
}

const cards = [
  {
    key: "revenue",
    label: "Revenue",
    icon: DollarSign,
    format: (v: number) => `$${(v / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    prop: "totalRevenue" as const,
  },
  {
    key: "orders",
    label: "Orders",
    icon: ShoppingCart,
    format: (v: number) => v.toString(),
    prop: "orderCount" as const,
  },
  {
    key: "clients",
    label: "New Clients",
    icon: Users,
    format: (v: number) => v.toString(),
    prop: "newClients" as const,
  },
  {
    key: "aov",
    label: "Avg. Order Value",
    icon: TrendingUp,
    format: (v: number) => `$${(v / 100).toFixed(2)}`,
    prop: "averageOrderValue" as const,
  },
];

export function KpiCards(props: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.key}
            className="rounded-lg border border-border bg-surface p-6"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-accent/10 p-2">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <p className="text-sm text-muted">{card.label}</p>
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">
              {card.format(props[card.prop])}
            </p>
          </div>
        );
      })}
    </div>
  );
}
