import { Metadata } from "next";
import { AdminSubmissions } from "@/src/components/admin/AdminSubmissions";

export const metadata: Metadata = {
  title: "Submissions | Shield CMS Admin Terminal",
  description: "Manage contact form submissions and inquiries.",
};

export default function AdminSubmissionsPage() {
  return <AdminSubmissions />;
}