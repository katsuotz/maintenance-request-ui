import { HTMLAttributes } from "react";

interface GroupProps extends HTMLAttributes<HTMLElement> {
  error?: string;
}

const FormGroup: React.FC<GroupProps> = ({ error, children, ...props }) => {
  return (
    <div className="w-full flex flex-col gap-2" {...props}>
      {children}
      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  );
};

export default FormGroup;
