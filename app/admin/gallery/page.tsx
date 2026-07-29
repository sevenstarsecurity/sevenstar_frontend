import { Metadata } from "next";
import { AdminGallery } from "@/src/components/admin/AdminGallery";

export const metadata: Metadata = {
  title: "Visual Asset Library | Shield CMS Admin Terminal",
  description: "Manage visual assets, tactical gallery media, and promotional photography.",
};

export default function AdminGalleryPage() {
  return <AdminGallery />;
}
