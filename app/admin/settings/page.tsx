import { Metadata } from "next";
import { AdminSettings } from "@/src/components/admin/AdminSettings";

export const metadata: Metadata = {
  title: "Admin Site Settings | Seven Star Security Admin Terminal",
  description: "Configure global identity, contact protocols, and search visibility for Seven Star Security.",
};

export default function AdminSettingsPage() {
  return <AdminSettings />;
}
