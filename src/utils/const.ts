export type BadgeVariants = "primary" | "secondary";

export const UrgencyLevel = {
  non_urgent: "Non-Urgent",
  less_urgent: "Less Urgent",
  urgent: "Urgent",
  emergency: "Emergency",
} as const;

export type UrgencyLevelValue = keyof typeof UrgencyLevel;

export const Status = {
  open: "Open",
  resolved: "Resolved",
} as const;

export type StatusValue = keyof typeof Status;
