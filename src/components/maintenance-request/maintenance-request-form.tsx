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
import maintenanceRequestStore from "@/stores/maintenance-request";

const NewRequest: React.FC = observer(() => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    maintenanceRequestStore.submitForm();
  };

  return (
    <form
      className="flex flex-col gap-6 w-full items-center"
      onSubmit={handleSubmit}
    >
      <FormGroup error={maintenanceRequestStore.errors.urgency}>
        <FormLabel label="Urgency *" />
        <FormSelect
          name="urgency"
          value={maintenanceRequestStore.formData.urgency}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            maintenanceRequestStore.formData.urgency = e.target.value;
          }}
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
          value={maintenanceRequestStore.formData.status}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            maintenanceRequestStore.formData.status = e.target.value;
          }}
        >
          {Object.entries(Status).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </FormSelect>
      </FormGroup>

      <FormGroup error={maintenanceRequestStore.errors.title}>
        <FormLabel label="Title *" />
        <FormInput
          name="title"
          value={maintenanceRequestStore.formData.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            maintenanceRequestStore.formData.title = e.target.value;
          }}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel label="Description" />
        <FormTextarea
          name="description"
          value={maintenanceRequestStore.formData.description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            maintenanceRequestStore.formData.description = e.target.value;
          }}
        />
      </FormGroup>

      <Button type="submit" className="w-[268px] mt-4">
        Save
      </Button>
    </form>
  );
});

export default NewRequest;
