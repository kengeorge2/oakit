"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FullStackLearnMore: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-gray-50 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold mb-6">Full Stack Web Development Bootcamp</h1>
        <p className="text-lg mb-6">
          Learn **frontend and backend development** in a structured **1.5-month instructor-led program** and graduate with **4 capstone projects and a portfolio**.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">Course Duration & Cost</h2>
        <p className="text-lg mb-6">📅 **1.5 Months** (Instructor-Led) | 💵 **200 USD / 750K UGX**</p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">Full Program Timeline</h2>
        <ul className="text-lg list-disc list-inside mb-8 space-y-4 text-left mx-auto max-w-2xl">
          <li>📌 **Week 1:** HTML, CSS, JavaScript basics + Portfolio Landing Page</li>
          <li>📌 **Week 2:** React + Task Manager App</li>
          <li>📌 **Week 3:** Next.js + Backend with Node.js & MongoDB</li>
          <li>📌 **Week 4-6:** Advanced backend, API security, authentication + Final capstone projects</li>
        </ul>

        <h2 className="text-3xl font-semibold mt-8 mb-4">Why Join?</h2>
        <ul className="text-lg list-disc list-inside mb-8 space-y-4 text-left mx-auto max-w-2xl">
          <li>🚀 **Industry-Standard Curriculum** – Learn the MERN Stack + Next.js</li>
          <li>🧑‍🏫 **Expert-Led Learning** – Instructors guide every step</li>
          <li>💼 **Portfolio Projects** – Graduate with 4 major projects</li>
          <li>📜 **Certificate of Completion** – Boost your career prospects</li>
          <li>💻 **Job-Ready Training** – Prepare for employment or freelancing</li>
        </ul>

        <div className="mt-12 flex justify-center gap-6">
          <Button size="lg" variant="default">
            <Link href="https://forms.zohopublic.com/adminoakitsolutio1/form/FULLSTACKBOOTCAMPCOURSEREGISTRATION">
              Register Now
            </Link>
          </Button>
          <Button size="lg" variant="secondary">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FullStackLearnMore;