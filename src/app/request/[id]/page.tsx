import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import MaintenanceRequestForm from "@/components/maintenance-request/maintenance-request-form";

export default function RequestUpdate() {
  return (
    <div className="container mx-auto flex flex-col items-center mt-24 gap-8 max-w-[636px] relative pb-20">
      <div className="flex items-center gap-4">
        <Link href="/">
          <FiArrowLeft className="size-5" />
        </Link>
        <h1 className="text-2xl font-bold">Maintenance Request</h1>
      </div>

      <MaintenanceRequestForm />
    </div>
  );
}
