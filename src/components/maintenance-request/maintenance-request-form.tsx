"use client";

import { observer } from "mobx-react-lite";
import Button from "@/components/base/button";
import FormLabel from "@/components/base/form/form-label";
import FormInput from "@/components/base/form/form-input";
import FormGroup from "@/components/base/form/form-group";
import FormTextarea from "@/components/base/form/form-textarea";
import { ChangeEvent, FormEvent, useEffect } from "react";
import FormSelect from "@/components/base/form/form-select";
import { Status, UrgencyLevel } from "@/utils/const";
import maintenanceRequestStore from "@/stores/maintenance-request";
import { runInAction } from "mobx";

const NewRequest: React.FC = observer(() => {
  useEffect(() => {
    runInAction(() => {
      maintenanceRequestStore.errorAction = null;
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    maintenanceRequestStore.submitForm();
  };

  return (
    <form
      className="flex flex-col gap-6 w-full items-center mt-4"
      onSubmit={handleSubmit}
    >
      <FormGroup error={maintenanceRequestStore.errors.urgency}>
        <FormLabel label="Urgency *" />
        <FormSelect
          name="urgency"
          value={maintenanceRequestStore.formData.urgency}
          error={maintenanceRequestStore.errors.urgency}
          disabled={maintenanceRequestStore.isInputDisabled}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            maintenanceRequestStore.setFormData("urgency", e.target.value);
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
          disabled={maintenanceRequestStore.isInputDisabled}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            maintenanceRequestStore.setFormData("status", e.target.value);
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
          error={maintenanceRequestStore.errors.title}
          disabled={maintenanceRequestStore.isInputDisabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            maintenanceRequestStore.setFormData("title", e.target.value);
          }}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel label="Description" />
        <FormTextarea
          name="description"
          value={maintenanceRequestStore.formData.description}
          disabled={maintenanceRequestStore.isInputDisabled}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            maintenanceRequestStore.setFormData("description", e.target.value);
          }}
        />
      </FormGroup>

      {maintenanceRequestStore.errorAction && (
        <p className="text-danger">{maintenanceRequestStore.errorAction}</p>
      )}

      <Button
        type="submit"
        className="w-[268px] mt-4"
        disabled={maintenanceRequestStore.isSubmitDisabled}
        loading={maintenanceRequestStore.loadingAction}
      >
        Save
      </Button>
    </form>
  );
});

export default NewRequest;
