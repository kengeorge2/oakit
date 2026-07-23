import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

const FullStackCourse: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 section-dark-bootcamp grid-overlay" id="full-stack-course">
      <div className="container mx-auto px-4 md:px-6 lg:py-16">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <span className="section-label">07 — Bootcamp</span>
            <h3 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Admissions Open | Limited Seats Available
            </h3>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Full Stack Web Development and Engineering Program
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">Become a full-stack web developer in just 1.5 months.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="secondary" className="btn-glow">
                <Link href="/fullstack-learn-more">Learn More</Link>
              </Button>
              <Button size="lg" variant="default" className="bg-gradient-to-r from-purple-500 to-blue-500 btn-glow">
                <Link href="https://forms.zohopublic.com/adminoakitsolutio1/form/FULLSTACKBOOTCAMPCOURSEREGISTRATION/formperma/yJZvCbkmD9gqGFOZGpI1S16cT02VhHJPLpsvSoHoCBA">
                  Register Now
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-20">
          <Reveal delay={1}>
            <div className="card-glass rounded-xl p-8 h-full">
              <h2 className="text-3xl font-bold tracking-tight text-white">Front End Track</h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Master the essential skills of front-end web development, including HTML, CSS, JavaScript, and popular frameworks like React.
              </p>
              <div className="mt-8">
                <Button size="lg" variant="secondary" className="btn-glow">
                  <Link href="/frontend-stack">Learn More</Link>
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="card-glass rounded-xl p-8 h-full">
              <h2 className="text-3xl font-bold tracking-tight text-white">Back End Track</h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Dive into the world of back-end development, learning technologies like Node.js, Express.js, and databases like MongoDB.
              </p>
              <div className="mt-8">
                <Button size="lg" variant="secondary" className="btn-glow">
                  <Link href="/backend-stack">Learn More</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default FullStackCourse;
