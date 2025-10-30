import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/ui/Footer";
import Navbar from "@/ui/Navbar";
import { AuthProvider } from "@/context/AuthContext"; // ✅ import your provider
import { Poppins } from "next/font/google";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // multiple weights
});


export const metadata: Metadata = {
  title: "Medicure.Ai",
  description: "Acess the modern hospital management system",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <AuthProvider>
            <Navbar />
          <main className={`w-full min-h-screen bg-black`}>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
