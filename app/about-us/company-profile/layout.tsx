import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Profile | OAK IT Solutions and Supplies",
  description: "Official company profile of OAK IT Solutions and Supplies Ltd — IT consulting, cybersecurity, infrastructure, software development, managed services, automation & AI, and training. Kampala, Uganda. Est. 2015.",
  openGraph: {
    title: "Company Profile | OAK IT Solutions and Supplies",
    description: "Official company profile — IT consulting, cybersecurity, infrastructure, software development, managed services, automation & AI, and training.",
    images: [
      {
        url: "https://oakitsolutionsandsupplies.com/images/Logo.png",
        width: 600,
        height: 300,
        alt: "OAK IT Solutions Company Profile",
      },
    ],
  },
};

export default function CompanyProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
