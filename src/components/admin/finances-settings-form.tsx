"use client";

import { useEffect, useState, useActionState } from "react";
import { Calculator } from "lucide-react";
import {
  updateFinancesSettings,
  getFinancesSettingsAction,
} from "@/app/admin/(dashboard)/settings/actions";

export function FinancesSettingsForm() {
  const [financesState, financesAction, financesPending] = useActionState(
    updateFinancesSettings,
    null,
  );

  const [stripeFeePercent, setStripeFeePercent] = useState("2.9");
  const [stripeFeeFixed, setStripeFeeFixed] = useState("30");
  const [shippingFlatCost, setShippingFlatCost] = useState("550");
  const [taxRatePercent, setTaxRatePercent] = useState("25.0");

  useEffect(() => {
    getFinancesSettingsAction().then((settings) => {
      setStripeFeePercent(String(settings.stripeFeePercent));
      setStripeFeeFixed(String(settings.stripeFeeFixed));
      setShippingFlatCost(String(settings.shippingFlatCost));
      setTaxRatePercent(String(settings.taxRatePercent));
    });
  }, []);

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-muted">
        <Calculator className="h-4 w-4" />
        Rate Settings
      </h3>

      <form action={financesAction} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="stripeFeePercent"
              className="mb-1 block text-sm font-medium text-muted"
            >
              Stripe Fee (%)
            </label>
            <p className="mb-1.5 text-xs text-muted">
              Percentage Stripe takes on each successful transaction
              (e.g. 2.9%). Only charged when payment succeeds — failed
              or declined payments have no fee. not refunded on refunds.
            </p>
            <input
              id="stripeFeePercent"
              name="stripeFeePercent"
              type="number"
              step="0.1"
              min="0"
              max="100"
              required
              value={stripeFeePercent}
              onChange={(e) => setStripeFeePercent(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label
              htmlFor="stripeFeeFixed"
              className="mb-1 block text-sm font-medium text-muted"
            >
              Stripe Fixed Fee (cents)
            </label>
            <p className="mb-1.5 text-xs text-muted">
              Flat amount in cents Stripe charges per successful transaction
              on top of the percentage (e.g. 30 = $0.30). Same rules apply
              — only on successful payments, not refunded on refunds.
            </p>
            <input
              id="stripeFeeFixed"
              name="stripeFeeFixed"
              type="number"
              step="1"
              min="0"
              required
              value={stripeFeeFixed}
              onChange={(e) => setStripeFeeFixed(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label
              htmlFor="shippingFlatCost"
              className="mb-1 block text-sm font-medium text-muted"
            >
              Shipping Cost (cents/order)
            </label>
            <input
              id="shippingFlatCost"
              name="shippingFlatCost"
              type="number"
              step="1"
              min="0"
              required
              value={shippingFlatCost}
              onChange={(e) => setShippingFlatCost(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label
              htmlFor="taxRatePercent"
              className="mb-1 block text-sm font-medium text-muted"
            >
              Est. Tax Rate (%)
            </label>
            <input
              id="taxRatePercent"
              name="taxRatePercent"
              type="number"
              step="0.1"
              min="0"
              max="100"
              required
              value={taxRatePercent}
              onChange={(e) => setTaxRatePercent(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {financesState && "error" in financesState && (
          <p className="text-sm text-red-400">{financesState.error}</p>
        )}
        {financesState && "success" in financesState && (
          <p className="text-sm text-green-400">{financesState.success}</p>
        )}

        <button
          type="submit"
          disabled={financesPending}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
        >
          {financesPending ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
