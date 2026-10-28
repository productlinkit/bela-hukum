import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BELA – Teman Hukum Kamu",
  description: "Layanan hukum digital: Tanya BELA, review dokumen, draft surat, dan konsultasi advokat.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={jakarta.className}>
        <a href="#main" className="skip">
          Lewati ke konten utama
        </a>
        <div className="app" id="app">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
