import {makeAutoObservable, runInAction} from "mobx";
import {z} from "zod";
import {gql} from "@apollo/client";
import client from "@/utils/apollo-client";

export interface MaintenanceRequestInterface {
  id?: string;
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

export type maintenanceRequestKey = keyof MaintenanceRequestInterface;

const GET_MAINTENANCE_REQUESTS = gql`
    query {
        maintenanceRequests {
            id
            title
            description
            status
            urgency
            resolvedAt
            createdAt
            updatedAt
        }
    }
`;

class RequestStore {
  listData: MaintenanceRequestInterface[] = [];
  formData: MaintenanceRequestInterface = {
    title: "",
    status: "open",
    urgency: "",
    description: "",
  };
  errors: FormErrors = {};
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAllData() {
    try {
      this.loading = true
      const {data} = await client.query({
        query: GET_MAINTENANCE_REQUESTS,
      });

      runInAction(() => {
        this.listData = data.maintenanceRequests;
        this.loading = false
      })
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "An error occurred";
        this.loading = false
      })
    }
  }

  setFormData(field: maintenanceRequestKey, value: string) {
    this.formData[field] = value;
  }

  validateForm(): boolean {
    const schema = z.object({
      title: z.string().min(1, "Title is required"),
    });

    const validation = schema.safeParse(this.formData);
    if (!validation.success) {
      const formattedErrors = validation.error.format();
      this.errors = {
        title: formattedErrors.title?._errors[0] || "",
      };
      return false;
    }

    this.errors = {};
    return true;
  }

  submitForm(): void {
    if (!this.validateForm()) return;
    console.log("Form submitted successfully", this.formData);
  }
}

const requestStore = new RequestStore();
export default requestStore;
