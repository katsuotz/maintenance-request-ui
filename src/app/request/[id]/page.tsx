"use client";

import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import MaintenanceRequestForm from "@/components/maintenance-request/maintenance-request-form";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import maintenanceRequestStore from "@/stores/maintenance-request";
import { observer } from "mobx-react-lite";

const MaintenanceRequestUpdate: React.FC = observer(() => {
  const params = useParams();
  const id = parseInt(params.id as string);

  useEffect(() => {
    maintenanceRequestStore.fetchDataById(id);
  }, [id]);

  return (
    <div className="container">
      <div className="flex items-center gap-4">
        <Link href="/">
          <FiArrowLeft className="size-5" />
        </Link>
        <h1 className="text-2xl font-bold">Maintenance Request</h1>
      </div>

      {maintenanceRequestStore.loading ? (
        <div className="space-y-2.5 w-full">
          <div className="animate-pulse rounded-md bg-black/10 h-10"></div>
          <div className="animate-pulse rounded-md bg-black/10 h-10"></div>
          <div className="animate-pulse rounded-md bg-black/10 h-10"></div>
        </div>
      ) : (
        <>
          {maintenanceRequestStore.error ? (
            <p className="text-center">No maintenance request found.</p>
          ) : (
            <MaintenanceRequestForm />
          )}
        </>
      )}
    </div>
  );
});

export default MaintenanceRequestUpdate;
