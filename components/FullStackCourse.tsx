import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const FullStackCourse: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  const frontendSchedule = (
    <div className="p-6 bg-gray-800 rounded-lg text-white">
      <h2 className="text-2xl font-bold">Frontend Track Schedule</h2>
      <ul className="mt-4 space-y-2">
        <li><strong>Week 1:</strong> HTML, CSS basics, Responsive layouts, Capstone: Portfolio Landing Page.</li>
        <li><strong>Week 2:</strong> React basics, Router, Hooks, API integration, Capstone: Task Manager App.</li>
        <li><strong>Week 3:</strong> Next.js: Routing, APIs, and integration with React.</li>
      </ul>
      <div className="mt-6 text-center">
        <Button size="lg" variant="default">
          <Link href="https://forms.zohopublic.com/adminoakitsolutio1/form/FULLSTACKBOOTCAMPCOURSEREGISTRATION/formperma/yJZvCbkmD9gqGFOZGpI1S16cT02VhHJPLpsvSoHoCBA">
            Register Now for Frontend Track
          </Link>
        </Button>
      </div>
      <Button size="lg" variant="secondary" className="mt-4" onClick={() => setActiveTrack(null)}>
        Close
      </Button>
    </div>
  );

  const backendSchedule = (
    <div className="p-6 bg-gray-800 rounded-lg text-white">
      <h2 className="text-2xl font-bold">Backend Track Schedule</h2>
      <ul className="mt-4 space-y-2">
        <li><strong>Week 1:</strong> Node.js basics, Express.js routing, MongoDB CRUD, Capstone: REST API.</li>
        <li><strong>Week 2:</strong> Authentication, JWT, Secure APIs, Capstone: Blog API.</li>
        <li><strong>Week 3:</strong> Advanced querying, Backend integration, optional GraphQL basics.</li>
      </ul>
      <div className="mt-6 text-center">
        <Button size="lg" variant="default">
          <Link href="https://forms.zohopublic.com/adminoakitsolutio1/form/FULLSTACKBOOTCAMPCOURSEREGISTRATION/formperma/yJZvCbkmD9gqGFOZGpI1S16cT02VhHJPLpsvSoHoCBA">
            Register Now for Backend Track
          </Link>
        </Button>
      </div>
      <Button size="lg" variant="secondary" className="mt-4" onClick={() => setActiveTrack(null)}>
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
            <p className="mt-6 text-lg leading-8">Become a full-stack web developer in just 5 weeks.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="default">
                <Link href="https://forms.zohopublic.com/adminoakitsolutio1/form/FULLSTACKBOOTCAMPCOURSEREGISTRATION/formperma/yJZvCbkmD9gqGFOZGpI1S16cT02VhHJPLpsvSoHoCBA">
                  Apply and Book Your Seat Now
                </Link>
              </Button>
              <Link className="text-lg font-semibold leading-6 hover:text-gray-300" href="https://forms.zohopublic.com/adminoakitsolutio1/form/FULLSTACKBOOTCAMPCOURSEREGISTRATION/formperma/yJZvCbkmD9gqGFOZGpI1S16cT02VhHJPLpsvSoHoCBA">
                Learn More
              </Link>
            </div>
          </div>
        </section>
        <section className="container mx-auto py-20 px-4 md:px-6 lg:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="rounded-xl bg-white/10 p-8 shadow-lg backdrop-blur-sm">
              <h2 className="text-3xl font-bold tracking-tight">Front End Track</h2>
              <p className="mt-4 text-lg leading-8">
                Master the essential skills of front-end web development, including HTML, CSS, JavaScript, and popular frameworks like React.
              </p>
              <div className="mt-8">
                <Button size="lg" variant="secondary" onClick={() => setActiveTrack('frontend')}>
                  Learn More
                </Button>
              </div>
            </div>
            <div className="rounded-xl bg-white/10 p-8 shadow-lg backdrop-blur-sm">
              <h2 className="text-3xl font-bold tracking-tight">Back End Track</h2>
              <p className="mt-4 text-lg leading-8">
                Dive into the world of back-end development, learning technologies like Node.js, Express.js, and databases like MongoDB.
              </p>
              <div className="mt-8">
                <Button size="lg" variant="secondary" onClick={() => setActiveTrack('backend')}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        {activeTrack === 'frontend' && <div className="container mx-auto py-12">{frontendSchedule}</div>}
        {activeTrack === 'backend' && <div className="container mx-auto py-12">{backendSchedule}</div>}
      </div>
    </section>
  );
};

export default FullStackCourse;
