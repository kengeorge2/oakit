import React from 'react';
import Reveal from '@/components/Reveal';

const Mission = () => {
  return (
    <section className="w-full py-8 md:py-16 lg:py-24 section-dark grid-overlay" id="mission">
      <div className="container px-4 md:px-6 mt-12">
        <div className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-white/[0.06] backdrop-blur-sm">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/8 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-blue-500/6 blur-[80px] pointer-events-none" />

          <div className="container px-4 md:px-6 flex flex-col items-center space-y-6 relative z-10">
            <Reveal>
              <span className="section-label">05 — Our Mission</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center text-white">
                Empowering Businesses Through Technology
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center">
                At OAK IT Solutions, our mission is to empower businesses of all sizes with cutting-edge IT services and
                solutions. We deliver exceptional value, foster long-term partnerships, and drive
                innovation to help our clients succeed in the digital age.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
