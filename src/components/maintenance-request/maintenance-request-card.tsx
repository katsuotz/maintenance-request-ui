import React from "react";
import { cn } from "@/utils/styleUtils";
import Card from "@/components/base/card";
import Badge from "@/components/base/badge";
import dayjs from "dayjs";
import maintenanceRequestStore, {
  MaintenanceRequestInterface,
} from "@/stores/maintenance-request";
import { observer } from "mobx-react-lite";
import Link from "next/link";

type MaintenanceRequestCardProps = {
  request: MaintenanceRequestInterface;
  className?: string;
};

const MaintenanceRequestCard = observer<MaintenanceRequestCardProps>(
  ({ request, className }) => {
    return (
      <Card className={cn("text-sm flex flex-col gap-2", className)}>
        <div className="flex items-center justify-between">
          <Link href={`/request/${request.id}`} className="flex-grow">
            <p>{request.title}</p>
          </Link>
          <span className="text-xs text-secondary">
            {dayjs(request.createdAt).format("DD MMM YYYY")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          {request.urgency === "non_urgent" && (
            <div className="text-primary font-light inline-flex items-center gap-1">
              <img
                className="size-4"
                alt="non urgent icon"
                src="https://em-content.zobj.net/source/apple/391/slightly-smiling-face_1f642.png"
              />
              Non Urgent
            </div>
          )}
          {request.urgency === "less_urgent" && (
            <div className="text-info font-light inline-flex items-center gap-1">
              <img
                className="size-4"
                alt="less urgent icon"
                src="https://em-content.zobj.net/source/apple/391/hammer_1f528.png"
              />
              Less Urgent
            </div>
          )}
          {request.urgency === "urgent" && (
            <div className="text-warning font-light inline-flex items-center gap-1">
              <img
                className="size-4"
                alt="urgent icon"
                src="https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png"
              />
              Urgent
            </div>
          )}
          {request.urgency === "emergency" && (
            <div className="text-danger font-light inline-flex items-center gap-1">
              <img
                className="size-4"
                alt="emergency icon"
                src="https://em-content.zobj.net/source/apple/391/fire_1f525.png"
              />
              Emergency
            </div>
          )}

          <Badge
            variant={request.status === "open" ? "primary" : "secondary"}
            rounded
            className={cn(request.status === "open" && "cursor-pointer")}
            onClick={() => {
              if (request.status === "open") {
                maintenanceRequestStore.markAsResolved(request);
              }
            }}
          >
            {request.status === "open" ? "Mark as Resolved" : "Resolved"}
          </Badge>
        </div>
      </Card>
    );
  },
);

export default MaintenanceRequestCard;
