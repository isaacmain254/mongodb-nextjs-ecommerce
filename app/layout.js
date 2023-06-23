import Navbar from "@/components/navbar";
import "./globals.css";
import { Inter, Poppins, Roboto_Serif } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({
  weight: ["300", "400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_serif = Roboto_Serif({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-serif",
});
const poppins = Poppins({
  weight: ["500", "600"],
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: "Nextjs and Mongodb Ecommerce",
  description: "Next.js for the user interface and Mongodb Atlas for database",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto_serif.variable} ${poppins.variable}`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
