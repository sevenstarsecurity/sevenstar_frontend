import { Metadata } from "next";
import { AdminBranches } from "@/src/components/admin/AdminBranches";

export const metadata: Metadata = {
  title: "Administrative Branches | Seven Star Security Admin Terminal",
  description: "Manage organizational structure and tactical training facility coordinates.",
};

export default function AdminBranchesPage() {
  return <AdminBranches />;
}
