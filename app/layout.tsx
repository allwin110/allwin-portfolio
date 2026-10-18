import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Allwin Alex | Enterprise Product Designer & UX Lead",
  description: "Official portfolio of Allwin Alex, a Senior Product Designer with 9+ years of experience designing enterprise SaaS platforms, operational systems, and infrastructure-focused workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

