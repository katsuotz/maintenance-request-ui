"use client";

import { observer } from "mobx-react-lite";
import Button from "@/components/base/button";
import FormLabel from "@/components/base/form/form-label";
import FormInput from "@/components/base/form/form-input";
import FormGroup from "@/components/base/form/form-group";
import FormTextarea from "@/components/base/form/form-textarea";
import { ChangeEvent, FormEvent } from "react";
import FormSelect from "@/components/base/form/form-select";
import { Status, UrgencyLevel } from "@/utils/const";
import maintenanceRequest, {
  maintenanceRequestKey,
} from "@/stores/maintenance-request";

const NewRequest: React.FC = observer(() => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    maintenanceRequest.setFormData(
      e.target.name as maintenanceRequestKey,
      e.target.value,
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    maintenanceRequest.submitForm();
  };

  return (
    <form
      className="flex flex-col gap-6 w-full items-center"
      onSubmit={handleSubmit}
    >
      <FormGroup error={maintenanceRequest.errors.urgency}>
        <FormLabel label="Urgency *" />
        <FormSelect
          name="urgency"
          value={maintenanceRequest.formData.urgency}
          onChange={handleChange}
        >
          <option value="">Choose Urgency</option>
          {Object.entries(UrgencyLevel).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </FormSelect>
      </FormGroup>

      <FormGroup>
        <FormLabel label="Status" />
        <FormSelect
          name="status"
          value={maintenanceRequest.formData.status}
          onChange={handleChange}
        >
          {Object.entries(Status).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </FormSelect>
      </FormGroup>

      <FormGroup error={maintenanceRequest.errors.title}>
        <FormLabel label="Title *" />
        <FormInput
          name="title"
          value={maintenanceRequest.formData.title}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel label="Description" />
        <FormTextarea
          name="description"
          value={maintenanceRequest.formData.description}
          onChange={handleChange}
        />
      </FormGroup>

      <Button type="submit" className="w-[268px] mt-4">
        Save
      </Button>
    </form>
  );
});

export default NewRequest;
