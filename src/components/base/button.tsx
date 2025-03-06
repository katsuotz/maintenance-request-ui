import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/styleUtils";
import { cva } from "class-variance-authority";
import { BadgeVariants } from "@/utils/const";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BadgeVariants;
  rounded?: boolean;
  to?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  rounded,
  className,
  children,
  to,
  loading,
  ...props
}) => {
  const buttonVariants = cva(
    "inline-flex items-center justify-center relative text-white px-4 py-2.5 cursor-pointer text-lg disabled:opacity-40 disabled:cursor-not-allowed shadow-[0px_4px_6px_rgba(0,0,0,0.1)]",
    {
      variants: {
        variant: {
          primary: "bg-primary",
          secondary: "bg-secondary",
        },
        rounded: {
          true: "rounded-full",
          false: "rounded",
        },
      },
      defaultVariants: {
        variant: "primary",
        rounded: false,
      },
    },
  );

  const classes = cn(buttonVariants({ variant, rounded }), className);

  const Loader = () => {
    return (
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <AiOutlineLoading3Quarters className="text-white size-6 animate-spin" />
      </div>
    );
  };

  if (to) {
    return (
      <a href={to} className={classes}>
        {loading && <Loader />}
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {loading && <Loader />}
      {children}
    </button>
  );
};

export default Button;
