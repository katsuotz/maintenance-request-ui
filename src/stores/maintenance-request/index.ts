import { makeAutoObservable } from "mobx";
import { z } from "zod";
import client from "@/utils/apollo-client";
import {
  CREATE_MAINTENANCE_REQUEST,
  GET_MAINTENANCE_REQUESTS,
  UPDATE_MAINTENANCE_REQUEST,
} from "@/stores/maintenance-request/query";

export interface MaintenanceRequestInterface {
  id?: number;
  title: string;
  description: string;
  status: string;
  urgency: string;
  createdAt?: string;
}

interface FormErrors {
  title?: string;
  urgency?: string;
}

class MaintenanceRequestStore {
  listData: MaintenanceRequestInterface[] = [];
  formData: MaintenanceRequestInterface = {
    title: "",
    status: "open",
    urgency: "",
    description: "",
  };
  errors: FormErrors = {};
  loading: boolean = true;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAllData() {
    try {
      this.loading = true;
      const { data } = await client.query({
        query: GET_MAINTENANCE_REQUESTS,
      });

      this.listData = data.maintenanceRequests;
      this.loading = false;
    } catch (err) {
      this.error = err instanceof Error ? err.message : "An error occurred";
      this.loading = false;
    }
  }

  validateForm(): boolean {
    const schema = z.object({
      title: z.string().min(1, "Title is required"),
      urgency: z.string().min(1, "Urgency is required"),
    });

    const validation = schema.safeParse(this.formData);
    if (!validation.success) {
      const formattedErrors = validation.error.format();
      this.errors = {
        title: formattedErrors.title?._errors[0] || "",
        urgency: formattedErrors.urgency?._errors[0] || "",
      };
      return false;
    }

    this.errors = {};
    return true;
  }

  async submitForm() {
    if (!this.validateForm()) return;

    try {
      this.loading = true;
      await client.mutate({
        mutation: CREATE_MAINTENANCE_REQUEST,
        variables: {
          data: {
            title: this.formData.title,
            description: this.formData.description,
            status: this.formData.status,
            urgency: this.formData.urgency,
          },
        },
      });

      this.loading = false;
      window.location.href = "/";
    } catch (err) {
      this.error = err instanceof Error ? err.message : "An error occurred";
      this.loading = false;
    }
  }

  async markAsResolved(request: MaintenanceRequestInterface) {
    try {
      await client.mutate({
        mutation: UPDATE_MAINTENANCE_REQUEST,
        variables: {
          id: request.id,
          data: {
            status: "resolved",
          },
        },
      });

      request.status = "resolved";
    } catch (err) {
      this.error = err instanceof Error ? err.message : "An error occurred";
    }
  }
}

const maintenanceRequestStore = new MaintenanceRequestStore();
export default maintenanceRequestStore;
