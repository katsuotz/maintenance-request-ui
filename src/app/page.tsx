"use client";

import Button from "@/components/base/button";
import { FiPlus } from "react-icons/fi";
import MaintenanceRequestList from "@/components/maintenance-request/maintenance-request-list";
import MetricsData from "@/components/metrics/metrics-data";

export default function Home() {
  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Maintenance Request</h1>
      <MetricsData />
      <MaintenanceRequestList />
      <Button
        rounded
        className="size-13 p-0 flex justify-center items-center sticky bottom-8 ml-auto"
        to="/request/create"
      >
        <FiPlus className="size-4.5" />
      </Button>
    </div>
  );
}
