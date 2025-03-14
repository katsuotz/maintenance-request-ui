import { SelectHTMLAttributes } from "react";
import { cn } from "@/utils/styleUtils";
import { FiChevronDown } from "react-icons/fi";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

const FormSelect: React.FC<SelectProps> = ({
  error,
  className,
  children,
  ...props
}) => {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          "w-full h-12 rounded-xl border border-white/50 px-4 pr-10 py-3",
          "bg-gradient-to-b from-white/90 to-white/70 appearance-none",
          "shadow-[0_8px_32px_0_rgba(110,113,145,.12)] backdrop-blur-md",
          "text-sm",
          "focus:outline-none",
          "disabled:opacity-70 disabled:cursor-not-allowed",
          error && "border-danger",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary pointer-events-none" />
    </div>
  );
};

export default FormSelect;
