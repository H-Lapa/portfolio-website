import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationMenuWithActiveItem from "@/components/navigation-menu-05"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Home • H-Lapa",
    template: "%s • H-Lapa",
  },
  description: "Platform Engineer Portfolio",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: [
      {
        url: "/profile-picture.jpg",
        type: "image/jpeg",
      },
    ],
    apple: [
      {
        url: "/profile-picture.jpg",
        type: "image/jpeg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ScrollToTop />
          <NavigationMenuWithActiveItem/>
          <main className="pt-28 sm:pt-32">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
