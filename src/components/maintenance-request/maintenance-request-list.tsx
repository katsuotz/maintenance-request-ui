import { observer } from "mobx-react-lite";
import MaintenanceRequestCard from "@/components/maintenance-request/maintenance-request-card";
import { useEffect } from "react";
import maintenanceRequest from "@/stores/maintenance-request";

const Home = observer(() => {
  useEffect(() => {
    maintenanceRequest.fetchAllData();
  }, []);

  if (maintenanceRequest.loading) return <p>Loading...</p>;
  if (maintenanceRequest.error) return <p>Error: {maintenanceRequest.error}</p>;

  return (
    <div className="w-full flex flex-col gap-4">
      {maintenanceRequest.listData.length > 0 ? (
        maintenanceRequest.listData.map((request) => (
          <MaintenanceRequestCard key={request.id} request={request} />
        ))
      ) : (
        <p className="text-center">No maintenance requests found.</p>
      )}
    </div>
  );
});

export default Home;
