import React from 'react';

const Mission = () => {
  return (
    <section className="w-full py-8 md:py-16 lg:py-24 bg-gray-100 dark:bg-gray-800" id="mission">
      <div className="container px-4 md:px-6 mt-12">
        <div className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-gray-900 to-gray-950 text-gray-50">
          <div className="container px-4 md:px-6 flex flex-col items-center space-y-4">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-black dark:bg-gray-700">About Us</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Mission and Values</h2>
            <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              At IT Solutions, our mission is to empower businesses of all sizes with cutting-edge IT services and
              solutions. We believe in delivering exceptional value, fostering long-term partnerships, and driving
              innovation to help our clients succeed in the digital age.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
