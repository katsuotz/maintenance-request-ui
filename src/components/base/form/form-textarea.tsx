import {TextareaHTMLAttributes} from "react";
import {cn} from "@/utils/styleUtils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const FormTextarea: React.FC<TextareaProps> = ({className, ...props}) => {
  return (
    <textarea
      className={cn(
        'w-full h-[188px] rounded-xl border border-white/50 px-4 py-3 resize-none',
        'bg-gradient-to-b from-white/90 to-white/70',
        'shadow-[0_8px_32px_0_rgba(110,113,145,.12)] backdrop-blur-md',
        'text-sm',
        'focus:outline-none',
        className,
      )}
      {...props}
    />
  );
};

export default FormTextarea;
