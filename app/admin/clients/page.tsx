import { Metadata } from "next";
import { AdminClients } from "@/src/components/admin/AdminClients";

export const metadata: Metadata = {
  title: "Client Management | Seven Star Security Admin Terminal",
  description: "Manage client logos, homepage display order, and active status.",
  robots: { index: false, follow: false },
};

export default function AdminClientsPage() {
  return <AdminClients />;
}
