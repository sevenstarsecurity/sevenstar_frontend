import { Metadata } from "next";
import { AdminTeam } from "@/src/components/admin/AdminTeam";

export const metadata: Metadata = {
  title: "Team Members Configuration | Seven Star Security Admin Terminal",
  description: "Manage security personnel, administrative staff, and field agents.",
};

export default function AdminTeamPage() {
  return <AdminTeam />;
}
