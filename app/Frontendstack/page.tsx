"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FrontendStack: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800 text-gray-50 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Frontend Track Overview</h1>
        <p className="text-lg mb-6">
          Master **HTML, CSS, JavaScript, React, and Next.js** in an intensive **2.5-week program**. Build interactive user interfaces and dynamic web applications.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">Frontend Curriculum</h2>
        <ul className="text-lg list-disc list-inside mb-8 space-y-4 text-left mx-auto max-w-2xl">
          <li>📌 **Week 1:** HTML, CSS, JavaScript fundamentals + Portfolio Landing Page</li>
          <li>📌 **Week 2:** React development, API integration + Task Manager App</li>
          <li>📌 **Week 3:** Next.js mastery, dynamic routing, API fetching</li>
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

export default FrontendStack;