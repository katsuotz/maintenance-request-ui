import React from "react";
import { cn } from "@/utils/styleUtils";
import Card from "@/components/base/card";
import Badge from "@/components/base/badge";
import dayjs from "dayjs";
import Link from "next/link";
import { MaintenanceRequestInterface } from "@/stores/maintenance-request";

type MaintenanceRequestCardProps = {
  request: MaintenanceRequestInterface;
  className?: string;
};

const MaintenanceRequestCard: React.FC<MaintenanceRequestCardProps> = ({
  request,
  className,
}) => {
  return (
    <Link href={`/request/${request.id}`}>
      <Card className={cn("text-sm flex flex-col gap-2", className)}>
        <div className="flex items-center justify-between">
          <p>{request.title}</p>
          <span className="text-xs text-secondary">
            {dayjs(request.createdAt).format("DD MMM YYYY")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          {request.urgency === "non_urgent" && (
            <p className="text-primary font-light inline-flex items-center gap-1">
              <img
                className="size-4"
                alt="non urgent icon"
                src="https://em-content.zobj.net/source/apple/391/slightly-smiling-face_1f642.png"
              />
              Non Urgent
            </p>
          )}
          {request.urgency === "less_urgent" && (
            <p className="text-info font-light inline-flex items-center gap-1">
              <img
                className="size-4"
                alt="less urgent icon"
                src="https://em-content.zobj.net/source/apple/391/hammer_1f528.png"
              />
              Less Urgent
            </p>
          )}
          {request.urgency === "urgent" && (
            <p className="text-warning font-light inline-flex items-center gap-1">
              <img
                className="size-4"
                alt="urgent icon"
                src="https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png"
              />
              Urgent
            </p>
          )}
          {request.urgency === "emergency" && (
            <p className="text-danger font-light inline-flex items-center gap-1">
              <img
                className="size-4"
                alt="emergency icon"
                src="https://em-content.zobj.net/source/apple/391/fire_1f525.png"
              />
              Emergency
            </p>
          )}

          <Badge
            variant={request.status === "open" ? "primary" : "secondary"}
            rounded
          >
            {request.status === "open" ? "Mark as Resolved" : "Resolved"}
          </Badge>
        </div>
      </Card>
    </Link>
  );
};

export default MaintenanceRequestCard;
