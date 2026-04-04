import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mark John Estorba — Full Stack Developer",
  description:
    "Portfolio of Mark John M. Estorba, a Full Stack Developer specializing in building dynamic web applications with React, Next.js, Laravel, and more.",
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
