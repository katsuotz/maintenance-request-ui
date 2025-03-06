import { makeAutoObservable, reaction, runInAction } from "mobx";
import { z } from "zod";
import client from "@/utils/apollo-client";
import {
  CREATE_MAINTENANCE_REQUEST,
  GET_MAINTENANCE_REQUEST_BY_ID,
  GET_MAINTENANCE_REQUESTS,
  UPDATE_MAINTENANCE_REQUEST,
} from "@/stores/maintenance-request/query";

export interface MaintenanceRequestInterface {
  id?: number | null;
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

type MaintenanceRequestForm = Pick<
  MaintenanceRequestInterface,
  "title" | "description" | "status" | "urgency"
>;
type MaintenanceRequestKey = keyof MaintenanceRequestForm;

class MaintenanceRequestStore {
  listData: MaintenanceRequestInterface[] = [];
  formData: MaintenanceRequestForm & { id: number | null } = {
    id: null,
    title: "",
    status: "open",
    urgency: "",
    description: "",
  };
  isFormFilled: boolean = false;
  errors: FormErrors = {};
  loading: boolean = true;
  loadingAction: boolean = false;
  error: string | null = null;
  schema = z.object({
    title: z.string().min(1, "Title is required"),
    urgency: z.string().min(1, "Urgency is required"),
  });
  isResolved: boolean = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.formData.title,
      (value) => {
        this.validateField("title", value);
      },
    );
    reaction(
      () => this.formData.urgency,
      (value) => {
        this.validateField("urgency", value);
      },
    );
    reaction(
      () => [this.formData.title, this.formData.urgency],
      ([title, urgency]) => {
        this.isFormFilled = !!(title && urgency);
      },
    );
  }

  get isInputDisabled() {
    return this.isResolved || this.loadingAction;
  }

  get isSubmitDisabled() {
    return !this.isFormFilled || this.isResolved || this.loadingAction;
  }

  async fetchAllData(forceRefetch = false) {
    try {
      this.loading = true;

      const { data } = await client.query({
        query: GET_MAINTENANCE_REQUESTS,
        fetchPolicy: forceRefetch ? "network-only" : "cache-first",
      });

      runInAction(() => {
        this.listData = data.maintenanceRequests;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "An error occurred";
        this.loading = false;
      });
    }
  }

  async fetchDataById(id: number) {
    try {
      this.loading = true;
      const { data } = await client.query({
        query: GET_MAINTENANCE_REQUEST_BY_ID,
        variables: {
          id,
        },
      });

      const { title, description, urgency, status } =
        data.maintenanceRequest as MaintenanceRequestInterface;

      this.formData = {
        id,
        title,
        description,
        urgency,
        status,
      };
      this.isResolved = status === "resolved";
      this.loading = false;
    } catch (err) {
      this.error = err instanceof Error ? err.message : "An error occurred";
      this.loading = false;
    }
  }

  setFormData(field: MaintenanceRequestKey, value: string) {
    this.formData[field] = value;
  }

  validateField(field: MaintenanceRequestKey, value: string) {
    const schema = this.schema;
    const validation =
      schema.shape[field as keyof typeof schema.shape].safeParse(value);
    this.errors[field as keyof typeof schema.shape] = validation.success
      ? undefined
      : validation.error.errors[0].message;
  }

  validateForm(): boolean {
    const schema = this.schema;
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

  async createRequest() {
    return await client.mutate({
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
  }

  async updateRequest() {
    return await client.mutate({
      mutation: UPDATE_MAINTENANCE_REQUEST,
      variables: {
        id: this.formData.id,
        data: {
          title: this.formData.title,
          description: this.formData.description,
          status: this.formData.status,
          urgency: this.formData.urgency,
        },
      },
    });
  }

  async submitForm() {
    if (!this.validateForm()) return;

    try {
      this.loadingAction = true;

      if (this.formData.id) {
        await this.updateRequest();
      } else {
        await this.createRequest();
      }

      this.loadingAction = false;
      window.location.href = "/";
    } catch (err) {
      this.error = err instanceof Error ? err.message : "An error occurred";
      this.loadingAction = false;
    }
  }

  async markAsResolved(request: MaintenanceRequestInterface) {
    try {
      this.loadingAction = true;
      await client.mutate({
        mutation: UPDATE_MAINTENANCE_REQUEST,
        variables: {
          id: request.id,
          data: {
            status: "resolved",
          },
        },
      });

      this.loadingAction = false;
      request.status = "resolved";
    } catch (err) {
      this.error = err instanceof Error ? err.message : "An error occurred";
      this.loadingAction = false;
    }
  }
}

const maintenanceRequestStore = new MaintenanceRequestStore();
export default maintenanceRequestStore;
