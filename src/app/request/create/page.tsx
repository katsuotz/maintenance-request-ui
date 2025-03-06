import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import MaintenanceRequestForm from "@/components/maintenance-request/maintenance-request-form";

export default function MaintenanceRequestCreate() {
  return (
    <div className="container">
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
