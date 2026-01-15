import Breadcrumb from "@/components/Breadcrumb";
export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Breadcrumb />
      {children}
    </div>
  );
}
