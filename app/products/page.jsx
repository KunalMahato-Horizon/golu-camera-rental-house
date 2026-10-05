import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "Browse Camera & Production Equipment | Golu Camera Rental",
  description:
    "Browse our full catalog of professional cameras, lenses, lighting, audio gear, and accessories available for rent in Chas.",
  openGraph: {
    title: "Browse Camera & Production Equipment",
    description:
      "Professional cameras, lenses, drones, and lighting available for rent in Chas.",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsClient />
    </Suspense>
  );
}