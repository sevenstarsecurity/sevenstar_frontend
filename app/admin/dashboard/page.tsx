import { Metadata } from "next";
import { AdminDashboard } from "@/src/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Shield CMS Admin Terminal - Overview Dashboard | Seven Star Security",
  description: "Restricted Access Command & Management System for Seven Star Security.",
};

export default function DashboardPage() {
  return <AdminDashboard />;
}
