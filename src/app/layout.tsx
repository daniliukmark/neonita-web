import { CartProvider } from "./_context/cartContext";
import { TRPCReactProvider } from "./_trpc/Provider";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Neonita",
  description: "Neonita - Neon Sign producer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <CartProvider>
        <TRPCReactProvider>
          <body className={inter.className}>{children}</body>
        </TRPCReactProvider>
      </CartProvider>
    </html>
  );
}
