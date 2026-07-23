import React from 'react';
import Reveal from '@/components/Reveal';

const testimonials = [
  {
    initial: 'TM',
    name: 'Tonny M',
    role: 'Sr. IT Manager, Bar Aviation',
    text: 'The IT solutions provided by this company have been instrumental in driving our business growth. Highly recommended!',
  },
  {
    initial: 'PT',
    name: 'Patrick T',
    role: 'ED, Uganda Debt Network',
    text: "The OAK IT team's expertise and responsiveness have been invaluable in solving our complex IT challenges. Highly satisfied with their services.",
  },
  {
    initial: 'JO',
    name: 'Jeofrey O',
    role: 'CEO, Hillcrest Brokers',
    text: 'The IT solutions provided by this company have been a game-changer for our business. Highly recommended to any organization looking to improve their IT infrastructure.',
  },
];

const Testimonial = () => {
  return (
    <section className="w-full py-8 md:py-16 lg:py-24 section-dark grid-overlay" id="testimonials">
      <div className="container px-4 text-center md:px-6">
        <Reveal>
          <div className="space-y-3 mb-12">
            <span className="section-label">03 — Testimonials</span>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              What Our Clients Say
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <Reveal key={idx} delay={idx as 0 | 1 | 2}>
              <div className="card-glass rounded-xl p-6 text-left h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/[0.1] flex items-center justify-center text-sm font-bold text-purple-300">
                      {t.initial}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{t.name}</h4>
                      <p className="text-gray-400 text-sm">{t.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-300 leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
