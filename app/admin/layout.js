import Sidebar from "@/components/admin/sidebar";
import Link from "next/link";

export const metadata = {
  title: "Admin dashboard",
  description: "Next.js for the user interface and Mongodb Atlas for database",
};

export default function AdminLayout({ children }) {
  return (
    <div className="grid grid-cols-12 w-11/12 mx-auto -mt-8">
      <div className="grid-cols-2 border border-red-500">
        <Sidebar />
      </div>
      <main className="grid-cols-10 w-full border border-green-500">
        {children}
      </main>
    </div>
  );
}
