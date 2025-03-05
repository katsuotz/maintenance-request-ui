import Card from "@/components/base/card";
import MaintenanceRequestCard from "@/components/maintenance-request/maintenance-request-card";
import Button from "@/components/base/button";
import { FiPlus } from "react-icons/fi";

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

      <div className="w-full flex flex-col gap-4">
        <MaintenanceRequestCard
          title={"Front Door Lock broken"}
          date={"11 Dec 2024"}
          urgent={"non_urgent"}
          status={"open"}
        />
        <MaintenanceRequestCard
          title={"Front Door Lock broken"}
          date={"11 Dec 2024"}
          urgent={"less_urgent"}
          status={"resolved"}
        />
        <MaintenanceRequestCard
          title={"Front Door Lock broken"}
          date={"11 Dec 2024"}
          urgent={"urgent"}
          status={"resolved"}
        />
        <MaintenanceRequestCard
          title={"Front Door Lock broken"}
          date={"11 Dec 2024"}
          urgent={"emergency"}
          status={"resolved"}
        />
      </div>

      <Button
        rounded
        className="size-13 p-0 flex justify-center items-center absolute right-0 bottom-0"
        to="/new-request"
      >
        <FiPlus className="size-4.5" />
      </Button>
    </div>
  );
}
