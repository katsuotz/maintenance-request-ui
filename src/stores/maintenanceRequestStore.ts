import { makeAutoObservable } from "mobx";
import { z } from "zod";

interface FormData {
  title: string;
  description: string;
  status: string;
  urgency: string;
}

interface FormErrors {
  title?: string;
  urgency?: string;
}

export type maintenanceRequestKey = keyof FormData;

class RequestStore {
  formData: FormData = {
    title: "",
    status: "open",
    urgency: "",
    description: "",
  };
  errors: FormErrors = {};

  constructor() {
    makeAutoObservable(this);
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
