import type { Metadata } from "next";
import { NotFoundUI } from "@/src/components/ui/NotFoundUI";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Seven Star Security Services",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function PageNotFound() {
  return <NotFoundUI />;
}
