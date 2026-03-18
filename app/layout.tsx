'use client';

import "./globals.css";
import { AppGenProvider } from "@/components/appgen-provider";
import { SettingsInitializer } from "@/components/SettingsInitializer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Media Today</title>
        <meta name="description" content="Performance Marketing & Tech Development" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700&f[]=satoshi@400,500,700&display=swap" />
        <script src="https://unpkg.com/@phosphor-icons/web"></script>
      </head>
      <body className="antialiased">
        <SettingsInitializer />
        <AppGenProvider>{children}</AppGenProvider>
      </body>
    </html>
  );
}
