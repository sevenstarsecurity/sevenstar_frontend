import { Metadata } from "next";
import { AdminSettings } from "@/src/components/admin/AdminSettings";

export const metadata: Metadata = {
  title: "Admin Site Settings | Seven Star Security Admin Terminal",
  description: "Configure global identity, contact protocols, and search visibility for Seven Star Security.",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return <AdminSettings />;
}
