-- CreateTable
CREATE TABLE "admin_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "stripeFeePercent" DOUBLE PRECISION NOT NULL DEFAULT 2.9,
    "stripeFeeFixed" INTEGER NOT NULL DEFAULT 30,
    "shippingFlatCost" INTEGER NOT NULL DEFAULT 550,
    "taxRatePercent" DOUBLE PRECISION NOT NULL DEFAULT 25.0,

    CONSTRAINT "admin_settings_pkey" PRIMARY KEY ("id")
);
