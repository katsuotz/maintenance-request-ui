import { SelectHTMLAttributes } from "react";
import { cn } from "@/utils/styleUtils";
import { FiChevronDown } from "react-icons/fi";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const FormSelect: React.FC<SelectProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          "w-full h-12 rounded-xl border border-white/50 px-4 pr-10 py-3", // Add pr-10 for spacing
          "bg-gradient-to-b from-white/90 to-white/70 appearance-none", // Remove default arrow
          "shadow-[0_8px_32px_0_rgba(110,113,145,.12)] backdrop-blur-md",
          "text-sm",
          "focus:outline-none",
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
