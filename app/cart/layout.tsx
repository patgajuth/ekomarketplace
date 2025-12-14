import Breadcrumb from "@/components/Breadcrumb";
export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Breadcrumb />
      {children}
    </div>
  );
}
