export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** Primary public navigation */
export const primaryNav: NavItem[] = [
  { label: "Introduction", href: "/" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Pilot Projects", href: "/pilots" },
  { label: "About Us", href: "/about" },
  { label: "Members", href: "/members" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

/** Controlled-access member portal areas */
export const portalNav: NavItem[] = [
  {
    label: "Teaching Materials",
    href: "/portal/materials",
    description: "Browse the shared repository of lesson plans.",
  },
  {
    label: "Upload Materials",
    href: "/portal/upload",
    description: "Contribute lesson ideas you have created.",
  },
  {
    label: "Reporting",
    href: "/portal/reporting",
    description: "Submit pilot activity reports and feedback.",
  },
  {
    label: "Documentation",
    href: "/portal/documentation",
    description: "Internal minutes, recordings and circulated documents.",
  },
];
