import Button from "@/components/base/button";
import {FiArrowLeft} from "react-icons/fi";
import Link from "next/link";
import FormLabel from "@/components/base/form/form-label";
import FormInput from "@/components/base/form/form-input";
import FormGroup from "@/components/base/form/form-group";
import FormTextarea from "@/components/base/form/form-textarea";

export default function NewRequest() {
  return (
    <div className="container mx-auto flex flex-col items-center mt-24 gap-8 max-w-[636px] relative pb-20">
      <div className="flex items-center gap-4">
        <Link href="/">
          <FiArrowLeft className="size-5"/>
        </Link>
        <h1 className="text-2xl font-bold">Maintenance Request</h1>
      </div>
      <form className="flex flex-col gap-6 w-full items-center">

        <FormGroup>
          <FormLabel label="Title *"/>
          <FormInput/>
        </FormGroup>

        <FormGroup>
          <FormLabel label="Description"/>
          <FormTextarea/>
        </FormGroup>

        <Button
          className="w-[268px] mt-4"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
