import React, { ReactNode } from "react";
import { cn } from "@/utils/styleUtils";

type CardProps = {
  children?: ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "bg-white shadow-[0_6px_14px_0_rgba(0,0,0,0.06)] rounded-[10px] p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
