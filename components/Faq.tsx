'use client';

import React, { useState } from 'react';
import Reveal from '@/components/Reveal';

const faqs = [
  {
    question: "What IT services does OAK IT Solutions provide?",
    answer: "We provide POS system implementation, web development, mobile app development, cloud solutions, IT consulting, network infrastructure, cybersecurity, and technical support for businesses of all sizes."
  },
  {
    question: "How much does a POS system cost?",
    answer: "Our POS systems start from $700/month for up to 50 users. For 50-150 users, plans start from $1,500/month. Enterprise solutions with 150+ users are custom-quoted based on your specific requirements."
  },
  {
    question: "Do you offer training for new systems?",
    answer: "Yes! We provide comprehensive training for all our solutions. This includes on-site training, documentation, video tutorials, and ongoing support to ensure your team is confident using the new systems."
  },
  {
    question: "What areas do you serve?",
    answer: "We are headquartered in Kampala, Uganda and serve clients globally. Our cloud-based solutions can be deployed anywhere, and we have partnerships across East Africa for on-site support."
  },
  {
    question: "How can I enroll in the Full Stack Bootcamp?",
    answer: "You can register for our Full Stack Web Development Bootcamp through our online registration form. The 1.5-month program covers frontend, backend, and deployment with hands-on projects."
  },
  {
    question: "Do you offer ongoing technical support?",
    answer: "Absolutely. All our service plans include ongoing technical support. We offer email, phone, and remote support, with response times based on your service tier."
  }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-8 md:py-16 lg:py-24 section-dark grid-overlay" id="faq">
      <div className="container px-4 sm:px-6 md:px-6">
        <Reveal>
          <div className="space-y-3 text-center mb-12">
            <span className="section-label">06 — FAQ</span>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[600px] mx-auto text-gray-600 dark:text-gray-400">
              Got questions? We have answers. Here are some of the most common questions we receive.
            </p>
          </div>
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <Reveal key={index} delay={(index % 3) as 0 | 1 | 2}>
              <div className="rounded-lg border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900 dark:text-gray-100">{faq.question}</span>
                  <span className={`ml-4 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                <div
                  className="accordion-content"
                  style={{
                    maxHeight: openIndex === index ? '200px' : '0px',
                    opacity: openIndex === index ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
