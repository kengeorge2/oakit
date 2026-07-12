import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { services, getServiceBySlug } from '@/lib/services';
import { Check } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} | OAK IT Solutions`,
    description: service.shortDesc,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Icon className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold">{service.title}</h1>
        </div>
        <p className="text-xl text-gray-400 mb-12">{service.shortDesc}</p>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">What We Offer</h2>
          <ul className="space-y-3">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-lg">
                <Check className="w-5 h-5 mt-1 text-green-400 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Why Choose This Service</h2>
          <ul className="space-y-3">
            {service.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 text-lg">
                <span className="text-blue-400 font-bold">+</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={service.cta.href}>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              {service.cta.label}
            </Button>
          </Link>
          <Link href="/#services">
            <Button size="lg" variant="secondary">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
