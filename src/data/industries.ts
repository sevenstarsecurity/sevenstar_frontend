export interface Industry {
  id: string;
  title: string;
  description: string;
  iconType: "industrial" | "commercial" | "residential";
  badgeBg: string;
  badgeTextColor: string;
}

export const industries: Industry[] = [
  {
    id: "industrial",
    title: "Industrial Security",
    description: "Manufacturing plants, warehouses, and logistics hubs requiring 24/7 access control and perimeter security.",
    iconType: "industrial",
    badgeBg: "bg-[#0b4226]",
    badgeTextColor: "text-white",
  },
  {
    id: "commercial",
    title: "Commercial Security",
    description: "Corporate headquarters, financial institutions, and high-traffic commercial complexes.",
    iconType: "commercial",
    badgeBg: "bg-[#5c4015]",
    badgeTextColor: "text-white",
  },
  {
    id: "residential",
    title: "Residential Assets",
    description: "Gated communities, private residences, diplomatic housing, and apartment complexes.",
    iconType: "residential",
    badgeBg: "bg-[#a61c1c]",
    badgeTextColor: "text-white",
  },
];
