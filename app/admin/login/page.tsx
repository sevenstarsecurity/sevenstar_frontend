import { Metadata } from "next";
import { AdminLoginForm } from "@/src/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Terminal - Identity Verification | Seven Star Security",
  description: "Restricted Access Command & Management System for Seven Star Security.",
};

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
