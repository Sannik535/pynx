import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/app/context/CartContext";
import { ThemeProvider } from "@/components/ui/Theme-provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PYNX — Premium Tech & Electronics",
  description:
    "PYNX is a premium tech and electronics store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Navbar />

          <CartProvider>
            {children}
          </CartProvider>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}