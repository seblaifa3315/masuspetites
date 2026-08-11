import type { Metadata } from "next";
import { Inter, Metal_Mania } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const metalMania = Metal_Mania({
  variable: "--font-metal-mania",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Masus Petites — Tattoo Art Prints",
  description: "Original tattoo art prints — designed by hand, made for your walls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${metalMania.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
