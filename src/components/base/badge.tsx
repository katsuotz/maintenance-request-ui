import React, { ReactNode } from "react";
import { cn } from "@/utils/styleUtils";
import { cva } from "class-variance-authority";
import { BadgeVariants } from "@/utils/const";

type CardProps = {
  variant?: BadgeVariants;
  rounded?: boolean;
  children?: ReactNode;
  className?: string;
};

const badgeVariants = cva("text-white text-xs px-2 py-1", {
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

const Badge: React.FC<CardProps> = ({
  variant,
  rounded = false,
  children,
  className,
}) => {
  return (
    <div className={cn(badgeVariants({ variant, rounded }), className)}>
      {children}
    </div>
  );
};

export default Badge;
