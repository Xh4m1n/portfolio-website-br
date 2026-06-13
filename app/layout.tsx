import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brais R. — AI Engineer & Divulgador IA",
  description:
    "Vibe Coder y divulgador de IA en español. Construyo software describiendo lo que quiero a agentes de IA, y enseño a hacerlo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground font-mono">
        {children}
      </body>
    </html>
  );
}
