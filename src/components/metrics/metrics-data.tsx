import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import metricsStore from "@/stores/metrics";
import { MetricsCard } from "@/components/metrics/metrics-card";

const MetricsData = observer(() => {
  useEffect(() => {
    metricsStore.startSSE();

    return () => {
      metricsStore.stopSSE();
    };
  }, []);

  return (
    <div className="flex lg:gap-8 gap-3">
      <MetricsCard
        value={metricsStore.data.openRequests}
        label="Open Requests"
        loading={metricsStore.loading}
      />
      <MetricsCard
        value={metricsStore.data.urgentRequests}
        label="Urgent Requests"
        loading={metricsStore.loading}
      />
      <MetricsCard
        value={metricsStore.data.avgDaysToResolve}
        label="Average time (days) to resolve"
        loading={metricsStore.loading}
      />
    </div>
  );
});

export default MetricsData;
