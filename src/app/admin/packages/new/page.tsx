import PackageForm from "../PackageForm";

export default function NewPackagePage() {
  return (
    <div className="p-8 md:p-12">
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#A67C00] mb-2">New Listing</p>
        <h1 className="text-3xl font-serif font-black text-white">Create Package</h1>
        <p className="text-sm text-white/30 mt-1">Fill in the details below to add a new tour package.</p>
      </div>
      <PackageForm mode="create" />
    </div>
  );
}
