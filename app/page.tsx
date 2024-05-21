import React from "react";
import "./globals.css";
import Hero  from "@/components/Hero";
import ContactUs from "@/components/ContactUs";
import Blog from "@/components/Blog";
import ServicesPricing from "@/components/ServicesPricing";
import ServicesList from "@/components/ServicesList";
import Testimonial from "@/components/Testimonial";
import Mission from "@/components/Mission";
import FullStackCourse from "@/components/FullStackCourse";



export default function Home() {
    return (

<main className="flex flex-col items-center space-y-4 text-center">
  
  <Hero />
  <ServicesPricing />
  <ServicesList />
  <Testimonial />
  <Blog />
  <Mission />
  <FullStackCourse />
  <ContactUs />
  
  
 </main>   
  )
}

// BriefcaseIcon.tsx

interface BriefcaseIconProps {
  width?: string; // Optional width prop
  height?: string; // Optional height prop
  color?: string; // Optional color prop
}

function BriefcaseIcon(props: BriefcaseIconProps) {
  const { width = "24", height = "24", color = "currentColor" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

// CloudIcon.tsx

interface CloudIconProps {
  color?: string; // Optional color prop
}

function CloudIcon(props: CloudIconProps) {
  const { color = "currentColor" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

// CodeIcon.tsx

interface CodeIconProps {
  // You can define additional props here if needed
}

function CodeIcon(props: CodeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props} // Spread operator after fixed attributes
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

// GraduationCapIcon.tsx

interface GraduationCapIconProps {
  // You can define additional props here if needed
}

// GraduationCapIcon.tsx

interface GraduationCapIconProps {
  // You can define additional props here if needed
}

function GraduationCapIcon(props: GraduationCapIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props} // Spread operator after fixed attributes
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

// MountainIcon.tsx

interface MountainIconProps {
  // You can define additional props here if needed
}

function MountainIcon(props: MountainIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props} // Spread operator after fixed attributes
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

// ServerIcon.tsx

interface ServerIconProps {
  // You can define additional props here if needed
}

function ServerIcon(props: ServerIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props} // Spread operator after fixed attributes
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}


// ShieldIcon.tsx

interface ShieldIconProps {
  color?: string; // Optional color prop
}

function ShieldIcon(props: ShieldIconProps) {
  const { color = "currentColor" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}







