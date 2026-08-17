import { Metadata } from "next";
import { AdminLoginForm } from "@/src/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Terminal - Identity Verification | Seven Star Security",
  description: "Restricted Access Command & Management System for Seven Star Security.",
  robots: { index: false, follow: false },
};

export default function NetbusLoginPage() {
  return <AdminLoginForm />;
}
