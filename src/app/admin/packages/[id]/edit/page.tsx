import { getPackageById } from "@/lib/packages";
import { notFound } from "next/navigation";
import PackageForm from "../../PackageForm";

export default async function EditPackagePage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pkg = getPackageById(id);
  if (!pkg) notFound();

  return (
    <div className="p-8 md:p-12">
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#02210a] mb-2">Editing</p>
        <h1 className="text-3xl font-serif font-black text-white">{pkg.title}</h1>
        <p className="text-sm text-white/30 mt-1">Make changes and save to update the public listing.</p>
      </div>
      <PackageForm mode="edit" initial={pkg} packageId={pkg.id} />
    </div>
  );
}
