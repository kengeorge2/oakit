"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const FullStackCourse: React.FC = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const fullCourseDetails = (
    <div className="p-6 bg-gray-800 rounded-lg text-white">
      <h2 className="text-2xl font-bold">Full Stack Web Development Program</h2>
      <p className="mt-4">
        Become a full-stack web developer in just 1.5 months through an instructor-led program.  
        Master both frontend (HTML, CSS, JavaScript, React, Next.js) and backend (Node.js, Express.js, MongoDB) development.  
        Build 4 capstone projects and a portfolio website to showcase your skills.  
      </p>
      <p className="mt-4 font-semibold">💵 Course Fee: 200 USD / 750,000 UGX</p>
      <div className="mt-6 text-center">
        <Button size="lg" variant="default">
          <Link href="https://forms.zohopublic.com/adminoakitsolutio1/form/FULLSTACKBOOTCAMPCOURSEREGISTRATION/formperma/yJZvCbkmD9gqGFOZGpI1S16cT02VhHJPLpsvSoHoCBA">
            Register Now
          </Link>
        </Button>
      </div>
      <Button size="lg" variant="secondary" className="mt-4" onClick={() => setActivePopup(null)}>
        Close
      </Button>
    </div>
  );

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-900 text-gray-50 dark:bg-gray-950 dark:text-gray-50" id="full-stack-course">
      <div className="bg-gray-950 text-white">
        <section className="container mx-auto py-20 px-4 md:px-6 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              <h4 className="text-3xl font-bold tracking-tighter sm:text-5xl text-lime-500 bg-clip-text">NEW </h4>DON&apos;T MISS OUT - Starting this Fall. | 1st JUNE 2025. Admissions Now Open | Limited Seats Only.
            </h3>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Full Stack Web Development and Engineering Program
            </h1>
            <p className="mt-6 text-lg leading-8">Become a full-stack web developer in just 1.5 months.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="secondary" onClick={() => setActivePopup('fullCourse')}>
                Learn More
              </Button>
              <Button size="lg" variant="default">
                <Link href="https://forms.zohopublic.com/adminoakitsolutio1/form/FULLSTACKBOOTCAMPCOURSEREGISTRATION/formperma/yJZvCbkmD9gqGFOZGpI1S16cT02VhHJPLpsvSoHoCBA">
                  Register Now
                </Link>
              </Button>
            </div>
          </div>
        </section>
        {activePopup === 'fullCourse' && <div className="container mx-auto py-12">{fullCourseDetails}</div>}
      </div>
    </section>
  );
};

export default FullStackCourse;
