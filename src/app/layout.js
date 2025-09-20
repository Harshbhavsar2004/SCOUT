import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the project
export const metadata = {
  title: "SCOUT - Online Examination & Assessment System",
  description:
    "A secure and transparent Online Examination and Assessment System integrating CO-PO mapping with Blockchain for tamper-proof records and result integrity.",
  keywords: [
    "Online Examination",
    "Assessment System",
    "CO-PO Mapping",
    "Blockchain",
    "Secure Exams",
    "Transparent Evaluation",
  ],
  authors: [{ name: "Your Name or Organization" }],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" type="image/png" href="/LOGOBG.png" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
