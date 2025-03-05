import {LabelHTMLAttributes} from "react";
import {cn} from "@/utils/styleUtils";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string
}

const FormLabel: React.FC<LabelProps> = ({label, className, ...props}) => {
  return (
    <label
      className={cn(
        'text-secondary text-sm',
        className,
      )}
      {...props}
    >
      {label}
    </label>
  );
};

export default FormLabel;
