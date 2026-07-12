import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backend Track | OAK IT Solutions Bootcamp",
  description: "Learn Node.js, Express.js, MongoDB, authentication, and API security in our intensive 2.5-week backend development program.",
};

const BackendStack: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-gray-50 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Backend Track Overview</h1>
        <p className="text-lg mb-6">
          Learn <strong>Node.js, Express.js, MongoDB, authentication, and API security</strong> in an intensive <strong>2.5-week program</strong>. Build powerful full-stack applications.
        </p>

        <h2 className="text-3xl font-semibold mt-8 mb-4">Backend Curriculum</h2>
        <ul className="text-lg list-disc list-inside mb-8 space-y-4 text-left mx-auto max-w-2xl">
          <li>📌 <strong>Week 1:</strong> Node.js basics, Express.js routing, MongoDB CRUD + REST API</li>
          <li>📌 <strong>Week 2:</strong> Authentication, JWT security, API development + Blog API</li>
          <li>📌 <strong>Week 3:</strong> Advanced queries, backend optimization, optional GraphQL basics</li>
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

export default BackendStack;
