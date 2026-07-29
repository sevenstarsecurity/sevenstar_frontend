import { Metadata } from "next";
import { AdminLoginForm } from "@/src/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Shield CMS Admin Terminal | Seven Star Security Services",
  description: "Restricted Access Command & Management System for Seven Star Security.",
};

export default function AdminPage() {
  return <AdminLoginForm />;
}
