import React from 'react';

const Testimonial = () => {
  return (
    <section className="w-full py-8 md:py-16 lg:py-24 bg-gray-100 dark:bg-gray-800" id="testimonials">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10 py-24">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Clients Say</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span>C1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Tonny M</h4>
                    <p className="text-gray-500 dark:text-gray-400">Sr. IT Manager Bar Aviation</p>
                  </div>
                </div>
                <blockquote className="text-gray-500 dark:text-gray-400">
                  The IT solutions provided by this company have been instrumental in driving our business growth.
                  Highly recommended!
                </blockquote>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span>C2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Patrick T</h4>
                    <p className="text-gray-500 dark:text-gray-400">ED Uganda Debt Network</p>
                  </div>
                </div>
                <blockquote className="text-gray-500 dark:text-gray-400">
                  The OAK IT team&apos;s expertise and responsiveness have been invaluable in solving our complex IT challenges.
                  Highly satisfied with their services.
                </blockquote>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-950">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span>C3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Jeofrey O</h4>
                    <p className="text-gray-500 dark:text-gray-400">CEO - Hillcrest Brokers</p>
                  </div>
                </div>
                <blockquote className="text-gray-500 dark:text-gray-400">
                  The IT solutions provided by this company have been a game-changer for our business. Highly
                  recommended to any organization looking to improve their IT infrastructure.
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
