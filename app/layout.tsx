import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Capstone Studio — Project Creation Service",
  description:
    "Anonymous capstone project creation service for clean, functional web systems, dashboards, databases, and documentation-ready project builds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
