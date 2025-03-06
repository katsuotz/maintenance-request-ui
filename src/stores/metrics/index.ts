import { makeAutoObservable, runInAction } from "mobx";
import maintenanceRequestStore from "@/stores/maintenance-request";

interface MetricsData {
  openRequests: number;
  urgentRequests: number;
  avgDaysToResolve: number;
}

class MetricsStore {
  data: MetricsData = {
    openRequests: 0,
    urgentRequests: 0,
    avgDaysToResolve: 0,
  };

  error: string | null = null;
  loading: boolean = true;
  eventSource: EventSource | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  startSSE() {
    if (this.eventSource) return;

    this.loading = true;
    this.eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/metrics`,
    );

    this.eventSource.onmessage = (event) => {
      try {
        this.error = null;
        const newData = JSON.parse(event.data);

        runInAction(() => {
          this.data = newData;
          maintenanceRequestStore.fetchAllData(true);
          this.loading = false;
        });
      } catch (error) {
        console.error(error);
        runInAction(() => {
          this.error = "Failed to parse SSE data";
          this.loading = false;
        });
      }
    };

    this.eventSource.onerror = () => {
      runInAction(() => {
        this.error = "SSE connection error";
        this.loading = false;
      });
      this.eventSource?.close();
      this.eventSource = null;
    };
  }

  stopSSE() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

const metricsStore = new MetricsStore();
export default metricsStore;
