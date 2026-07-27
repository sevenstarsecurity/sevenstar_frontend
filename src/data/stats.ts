export interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  iconName: "rotate-ccw" | "scale" | "shield-check" | "building-2";
}

export const statsData: StatItem[] = [
  {
    id: "years-service",
    target: 12,
    suffix: "+",
    label: "YEARS SERVICE",
    iconName: "rotate-ccw",
  },
  {
    id: "active-force",
    target: 950,
    suffix: "+",
    label: "ACTIVE FORCE",
    iconName: "scale",
  },
  {
    id: "global-review",
    target: 435,
    suffix: "+",
    label: "GLOBAL REVIEW",
    iconName: "shield-check",
  },
  {
    id: "command-centers",
    target: 5,
    suffix: "",
    label: "COMMAND CENTERS",
    iconName: "building-2",
  },
];
