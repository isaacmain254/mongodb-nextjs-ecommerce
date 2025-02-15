import Navbar from "@/components/navbar";
import "./globals.css";
import { Inter, Poppins, Roboto_Serif } from "next/font/google";
import Footer from "@/components/Footer";
import Providers from "@/utils/Providers";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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
  title: "Men Sneakers and shoes",
  description: "Premium collection of men’s shoes",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto_serif.variable} ${poppins.variable}`}
      >
        <Providers>
          <Navbar  />
          <main className="p-2 lg:p-0 mt-28">{children}</main>
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
