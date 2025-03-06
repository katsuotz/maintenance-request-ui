import {InputHTMLAttributes} from "react";
import {cn} from "@/utils/styleUtils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const FormInput: React.FC<InputProps> = ({error, className, ...props}) => {
  return (
    <input
      className={cn(
        "w-full h-12 rounded-xl border border-white/50 px-4 py-3",
        "bg-gradient-to-b from-white/90 to-white/70",
        "shadow-[0_8px_32px_0_rgba(110,113,145,.12)] backdrop-blur-md",
        "text-sm",
        "focus:outline-none",
        error && 'border-danger',
        className,
      )}
      {...props}
    />
  );
};

export default FormInput;
