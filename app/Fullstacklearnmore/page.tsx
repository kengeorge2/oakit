import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Stack Web Development Bootcamp | OAK IT Solutions",
  description: "Learn frontend and backend development in a 1.5-month instructor-led program. Graduate with 4 capstone projects and a portfolio.",
};

const FullStackLearnMore: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-gray-50 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold mb-6">Full Stack Web Development Bootcamp</h1>
        <p className="text-lg mb-6">
          Learn <strong>frontend and backend development</strong> in a structured <strong>1.5-month instructor-led program</strong> and graduate with <strong>4 capstone projects and a portfolio</strong>.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">Course Duration & Cost</h2>
        <p className="text-lg mb-6">📅 <strong>1.5 Months</strong> (Instructor-Led) | 💵 <strong>200 USD / 750K UGX</strong></p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">Full Program Timeline</h2>
        <ul className="text-lg list-disc list-inside mb-8 space-y-4 text-left mx-auto max-w-2xl">
          <li>📌 <strong>Week 1:</strong> HTML, CSS, JavaScript basics + Portfolio Landing Page</li>
          <li>📌 <strong>Week 2:</strong> React + Task Manager App</li>
          <li>📌 <strong>Week 3:</strong> Next.js + Backend with Node.js & MongoDB</li>
          <li>📌 <strong>Week 4-6:</strong> Advanced backend, API security, authentication + Final capstone projects</li>
        </ul>

        <h2 className="text-3xl font-semibold mt-8 mb-4">Why Join?</h2>
        <ul className="text-lg list-disc list-inside mb-8 space-y-4 text-left mx-auto max-w-2xl">
          <li>🚀 <strong>Industry-Standard Curriculum</strong> – Learn the MERN Stack + Next.js</li>
          <li>🧑‍🏫 <strong>Expert-Led Learning</strong> – Instructors guide every step</li>
          <li>💼 <strong>Portfolio Projects</strong> – Graduate with 4 major projects</li>
          <li>📜 <strong>Certificate of Completion</strong> – Boost your career prospects</li>
          <li>💻 <strong>Job-Ready Training</strong> – Prepare for employment or freelancing</li>
        </ul>

        <div className="mt-12 flex justify-center gap-6">
          <Button size="lg" variant="default">
            <Link href="https://forms.zohopublic.com/adminoakitsolutio1/form/FULLSTACKBOOTCAMPCOURSEREGISTRATION/formperma/yJZvCbkmD9gqGFOZGpI1S16cT02VhHJPLpsvSoHoCBA">
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
