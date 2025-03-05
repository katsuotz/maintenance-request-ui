import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/styleUtils";
import { cva } from "class-variance-authority";
import { BadgeVariants } from "@/utils/const";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BadgeVariants;
  rounded?: boolean;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  rounded,
  className,
  children,
  to,
  ...props
}) => {
  const buttonVariants = cva("text-white px-4 py-2.5 cursor-pointer text-lg", {
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
  });

  const classes = cn(buttonVariants({ variant, rounded }), className);

  if (to) {
    return (
      <a href={to} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
