import {HTMLAttributes} from "react";

type GroupProps = HTMLAttributes<HTMLElement>

const FormGroup: React.FC<GroupProps> = ({children, ...props}) => {
  return (
    <div className="w-full flex flex-col gap-2" {...props}>
      {children}
    </div>
  );
};

export default FormGroup;
