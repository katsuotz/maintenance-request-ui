import React from "react";
import { cn } from "@/utils/styleUtils";
import Card from "@/components/base/card";
import Badge from "@/components/base/badge";
import { StatusValue, UrgencyLevelValue } from "@/utils/const";

type MaintenanceRequestCardProps = {
  title: string;
  date: string;
  urgent: UrgencyLevelValue;
  status: StatusValue;
  className?: string;
};

const MaintenanceRequestCard: React.FC<MaintenanceRequestCardProps> = ({
  title,
  date,
  urgent,
  status,
  className,
}) => {
  return (
    <Card className={cn("text-sm flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <p>{title}</p>
        <span className="text-xs text-secondary">{date}</span>
      </div>
      <div className="flex items-center justify-between">
        {urgent === "non_urgent" && (
          <p className="text-primary font-light inline-flex items-center gap-1">
            <img
              className="size-4"
              alt="non urgent icon"
              src="https://em-content.zobj.net/source/apple/391/slightly-smiling-face_1f642.png"
            />
            Non Urgent
          </p>
        )}
        {urgent === "less_urgent" && (
          <p className="text-info font-light inline-flex items-center gap-1">
            <img
              className="size-4"
              alt="less urgent icon"
              src="https://em-content.zobj.net/source/apple/391/hammer_1f528.png"
            />
            Less Urgent
          </p>
        )}
        {urgent === "urgent" && (
          <p className="text-warning font-light inline-flex items-center gap-1">
            <img
              className="size-4"
              alt="urgent icon"
              src="https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png"
            />
            Urgent
          </p>
        )}
        {urgent === "emergency" && (
          <p className="text-danger font-light inline-flex items-center gap-1">
            <img
              className="size-4"
              alt="emergency icon"
              src="https://em-content.zobj.net/source/apple/391/fire_1f525.png"
            />
            Emergency
          </p>
        )}

        <Badge variant={status === "open" ? "primary" : "secondary"} rounded>
          {status === "open" ? "Mark as Resolved" : "Resolved"}
        </Badge>
      </div>
    </Card>
  );
};

export default MaintenanceRequestCard;
