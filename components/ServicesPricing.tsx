'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { pricingTiers, pricingFaq } from '@/lib/pricing';
import { Check } from 'lucide-react';

const tierColors: Record<string, { border: string; gradient: string; hoverBorder: string }> = {
  basic: { border: 'border-purple-500', gradient: 'from-purple-500 to-indigo-500', hoverBorder: 'hover:border-purple-600' },
  regular: { border: 'border-blue-500', gradient: 'from-blue-500 to-purple-500', hoverBorder: 'hover:border-blue-600' },
  advanced: { border: 'border-lime-500', gradient: 'from-lime-500 to-purple-500', hoverBorder: 'hover:border-lime-600' },
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
    <section className="w-full py-8 md:py-16 lg:py-24 bg-gray-100 dark:bg-gray-800 md:-mt-20" id="servicesPricing">
      <div className="mt-12 space-y-4 bg-gray-950 p-6 rounded-lg">
        <div className="inline-block rounded-lg bg-gray-700 px-3 py-1 text-white text-sm">IT Services Pricing</div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Flexible Pricing for Your IT Needs
        </h2>
        <p className="text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Choose the IT service plan that best fits your business requirements and budget.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <span className={!annual ? 'text-white font-medium' : ''}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              annual ? 'bg-blue-600' : 'bg-gray-600'
            }`}
            aria-label="Toggle annual billing"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                annual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={annual ? 'text-white font-medium' : ''}>
            Annual <span className="text-green-400 text-xs font-semibold">Save ~17%</span>
          </span>
        </div>

        <p className="text-gray-400 text-sm">* Final cost subject to change. Based on services selected, users, and inventory.</p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end py-8 md:py-16 container mx-auto">
          {pricingTiers.map((tier) => {
            const colors = tierColors[tier.id] || tierColors.basic;
            const descColor = tierDescColors[tier.id] || 'from-gray-500 to-gray-400';
            const price = annual ? tier.annualPrice : tier.monthlyPrice;
            const isPopular = tier.popular;

            return (
              <Card
                key={tier.id}
                className={`bg-gray-800 text-gray-200 border-4 ${colors.border} ${colors.hoverBorder} hover:border-8 transition-all duration-300 ${
                  isPopular ? 'relative ring-2 ring-blue-500' : ''
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
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
                    <ul className="space-y-2 text-sm text-gray-400">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 mt-0.5 text-green-400 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-center pb-6">
                      <Link href={tier.cta.href}>
                        <Button
                          className={`w-full py-3 bg-gradient-to-r ${colors.gradient} hover:brightness-110 text-gray-200`}
                          variant={tier.cta.variant === 'outline' ? 'outline' : 'default'}
                        >
                          {tier.cta.label}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pricing FAQ */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-gray-800">
          <h3 className="text-2xl font-bold text-center text-white mb-6">Pricing Questions</h3>
          <div className="space-y-3">
            {pricingFaq.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-700 bg-gray-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-750 transition-colors"
                >
                  <span className="font-medium text-gray-100">{faq.question}</span>
                  <span className={`ml-4 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
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
      </div>
    </section>
  );
};

export default ServicesPricing;
