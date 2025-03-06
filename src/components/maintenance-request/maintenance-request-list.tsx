import { observer } from "mobx-react-lite";
import MaintenanceRequestCard from "@/components/maintenance-request/maintenance-request-card";
import {useEffect} from "react";
import maintenanceRequestStore from "@/stores/maintenanceRequestStore";

const Home = observer(() => {
  useEffect(() => {
    maintenanceRequestStore.fetchAllData();
  }, []);

  if (maintenanceRequestStore.loading) return <p>Loading...</p>;
  if (maintenanceRequestStore.error) return <p>Error: {maintenanceRequestStore.error}</p>;

  return (
    <div className="w-full flex flex-col gap-4">
      {maintenanceRequestStore.listData.length > 0 ? (
        maintenanceRequestStore.listData.map((request) => (
          <MaintenanceRequestCard
            key={request.id}
            request={request}
          />
        ))
      ) : (
        <p className="text-center">No maintenance requests found.</p>
      )}
    </div>
  );
});

export default Home;
