import Sidebar from "@/components/admin/sidebar";
import Link from "next/link";

export const metadata = {
  title: "Admin dashboard",
  description: "Admin dashboard for Men Sneakers and shoes e-commerce",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex gap-3 w-11/12 mx-auto -mt-8">
      <div className="w-44 p-2 bg-gray-300 rounded-md">
        <Sidebar />
      </div>
      <main className="flex-1 w-full p-2 rounded-md bg-white">{children}</main>
    </div>
  );
}
