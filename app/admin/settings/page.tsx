import { Metadata } from "next";
import { AdminSettings } from "@/src/components/admin/AdminSettings";

export const metadata: Metadata = {
  title: "Admin Site Settings | Shield CMS Admin Terminal",
  description: "Configure global identity, contact protocols, and search visibility for ShieldCMS.",
};

export default function AdminSettingsPage() {
  return <AdminSettings />;
}
