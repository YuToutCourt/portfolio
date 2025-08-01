import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from './contexts/LanguageContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YùToutCourt - Portfolio",
  description: "Portfolio de YùToutCourt - Jeune étudiant, spécialisé en cybersécurité, DevSecOps, Pentesting et Red Team. Découvrez mon parcours et mes compétences.",
  keywords: ["cybersécurité", "DevSecOps", "pentesting", "red team", "sécurité informatique", "bug bounty"],
  authors: [{ name: "YùToutCourt" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "YùToutCourt - Portfolio",
    description: "Jeune étudiant, spécialisé en cybersécurité, DevSecOps, Pentesting et Red Team",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "YùToutCourt - Portfolio",
    description: "Jeune étudiant, spécialisé cybersécurité, DevSecOps, Pentesting et Red Team",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
