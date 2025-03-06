"use client";

import Card from "@/components/base/card";
import Button from "@/components/base/button";
import { FiPlus } from "react-icons/fi";
import MaintenanceRequestList from "@/components/maintenance-request/maintenance-request-list";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col items-center mt-24 gap-8 max-w-[636px] relative pb-20">
      <h1 className="text-2xl font-bold">Maintenance Request</h1>
      <div className="flex gap-8">
        <Card className="col-span-4 w-[120px] flex flex-col justify-center items-center text-center px-3 py-4">
          <span className="text-[#36A388] text-5xl">2</span>
          <p className="text-xs mt-0.5">Open Requests</p>
        </Card>
        <Card className="col-span-4 w-[120px] flex flex-col justify-center items-center text-center px-3 py-4">
          <span className="text-[#36A388] text-5xl">2</span>
          <p className="text-xs mt-0.5">Urgent Requests</p>
        </Card>
        <Card className="col-span-4 w-[120px] flex flex-col justify-center items-center text-center px-3 py-4">
          <span className="text-[#36A388] text-5xl">2</span>
          <p className="text-xs mt-0.5">Average time (days) to resolve</p>
        </Card>
      </div>

      <MaintenanceRequestList />

      <Button
        rounded
        className="size-13 p-0 flex justify-center items-center absolute right-0 bottom-0"
        to="/request/create"
      >
        <FiPlus className="size-4.5" />
      </Button>
    </div>
  );
}
