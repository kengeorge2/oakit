'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { pricingTiers, pricingFaq } from '@/lib/pricing';
import { Check } from 'lucide-react';
import Reveal from '@/components/Reveal';

const tierColors: Record<string, { border: string; gradient: string; hoverBorder: string; shadow: string }> = {
  basic: { border: 'border-purple-500', gradient: 'from-purple-500 to-indigo-500', hoverBorder: 'hover:border-purple-400', shadow: 'hover:shadow-purple-500/20' },
  regular: { border: 'border-blue-500', gradient: 'from-blue-500 to-purple-500', hoverBorder: 'hover:border-blue-400', shadow: 'hover:shadow-blue-500/20' },
  advanced: { border: 'border-lime-500', gradient: 'from-lime-500 to-purple-500', hoverBorder: 'hover:border-lime-400', shadow: 'hover:shadow-lime-500/20' },
};

const tierDescColors: Record<string, string> = {
  basic: 'from-purple-500 to-lime-500',
  regular: 'from-blue-500 to-purple-500',
  advanced: 'from-lime-500 to-purple-500',
};

const ServicesPricing = () => {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="w-full py-8 md:py-16 lg:py-24 section-dark-alt grid-overlay" id="servicesPricing">
      <div className="mt-12 space-y-6 p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
        <Reveal>
          <div className="space-y-3">
            <span className="section-label">01 — IT Services Pricing</span>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Flexible Pricing for Your IT Needs
            </h2>
            <p className="text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the IT service plan that best fits your business requirements and budget.
            </p>
          </div>
        </Reveal>

        {/* Monthly / Annual Toggle */}
        <Reveal delay={1}>
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <span className={!annual ? 'text-white font-medium' : ''}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                annual ? 'bg-blue-600' : 'bg-gray-600'
              }`}
              aria-label="Toggle annual billing"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                  annual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={annual ? 'text-white font-medium' : ''}>
              Annual <span className="text-green-400 text-xs font-semibold">Save ~17%</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <p className="text-gray-400 text-sm">* Final cost subject to change. Based on services selected, users, and inventory.</p>
        </Reveal>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end py-8 md:py-12 container mx-auto">
          {pricingTiers.map((tier, idx) => {
            const colors = tierColors[tier.id] || tierColors.basic;
            const descColor = tierDescColors[tier.id] || 'from-gray-500 to-gray-400';
            const price = annual ? tier.annualPrice : tier.monthlyPrice;
            const isPopular = tier.popular;

            return (
              <Reveal key={tier.id} delay={idx as 0 | 1 | 2}>
                <Card
                  className={`pricing-card bg-gray-800/80 backdrop-blur-sm text-gray-200 border-2 ${colors.border} ${colors.hoverBorder} ${colors.shadow} shadow-xl shadow-black/10 ${
                    isPopular ? 'relative ring-2 ring-blue-500/50 md:-translate-y-2' : ''
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription className={`font-bold bg-gradient-to-r ${descColor} text-transparent bg-clip-text`}>
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-4xl font-bold">
                        {price !== null ? (
                          <>
                            ${price.toLocaleString()}
                            <span className="text-base font-normal text-gray-400">
                              /{annual ? 'yr' : 'mo'}
                            </span>
                          </>
                        ) : (
                          'Request Quote'
                        )}
                      </div>
                      <ul className="space-y-2.5 text-sm text-gray-400">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 mt-0.5 text-green-400 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-center pb-6">
                        <Link href={tier.id === 'advanced' ? '/#contactUs' : tier.cta.href}>
                          <Button
                            className={`w-full py-3 bg-gradient-to-r ${colors.gradient} hover:brightness-110 text-gray-200 btn-glow`}
                            variant={tier.cta.variant === 'outline' ? 'outline' : 'default'}
                          >
                            {tier.cta.label}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* Pricing FAQ */}
        <Reveal>
          <div className="max-w-3xl mx-auto pt-8 border-t border-white/[0.06]">
            <h3 className="text-2xl font-bold text-center text-white mb-6">Pricing Questions</h3>
            <div className="space-y-3">
              {pricingFaq.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.03] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/[0.04] transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-100">{faq.question}</span>
                    <span className={`ml-4 transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-gray-400">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ServicesPricing;
