import { observer } from "mobx-react-lite";
import MaintenanceRequestCard from "@/components/maintenance-request/maintenance-request-card";
import { useEffect } from "react";
import Card from "@/components/base/card";
import maintenanceRequestStore from "@/stores/maintenance-request";

const MaintenanceRequestList = observer(() => {
  useEffect(() => {
    maintenanceRequestStore.fetchAllData();
  }, []);

  if (maintenanceRequestStore.loading)
    return (
      <div className="w-full flex flex-col gap-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="w-full">
            <div className="space-y-2">
              <div className="animate-pulse rounded-md bg-black/10 h-4 w-[250px]"></div>
              <div className="animate-pulse rounded-md bg-black/10 h-4 w-[200px]"></div>
            </div>
          </Card>
        ))}
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-4">
      {maintenanceRequestStore.listData.length > 0 ? (
        maintenanceRequestStore.listData.map((request) => (
          <MaintenanceRequestCard key={request.id} request={request} />
        ))
      ) : (
        <p className="text-center">No maintenance requests found.</p>
      )}
    </div>
  );
});

export default MaintenanceRequestList;
