'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'sonner';
import Reveal from '@/components/Reveal';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormData = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (errors[id as keyof FormData]) {
      setErrors({ ...errors, [id]: '' });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success('Message sent!', {
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Something went wrong', {
        description: err instanceof Error ? err.message : 'Please try again or email us directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contactUs" className="section-dark grid-overlay">
      <div className="w-full py-8 md:py-16 lg:py-24">
        <div className="flex flex-col items-center space-y-6 py-12 container mx-auto px-4 md:px-6">
          <Reveal>
            <div className="space-y-3 text-center">
              <span className="section-label">08 — Contact Us</span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Get in Touch</h2>
              <p className="max-w-[600px] mx-auto text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a question or need assistance? Our team is here to help. Fill out the form below or give us a call,
                and we&apos;ll be in touch as soon as possible.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-8 bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.08] w-full max-w-lg"
            >
              {/* Honeypot — hidden from humans, visible to bots */}
              <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-glow mt-1 block w-full rounded-lg bg-white/[0.06] border border-white/[0.1] text-gray-100 placeholder-gray-500 shadow-sm focus:outline-none"
                  />
                  {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-glow mt-1 block w-full rounded-lg bg-white/[0.06] border border-white/[0.1] text-gray-100 placeholder-gray-500 shadow-sm focus:outline-none"
                  />
                  {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input-glow mt-1 block w-full rounded-lg bg-white/[0.06] border border-white/[0.1] text-gray-100 placeholder-gray-500 shadow-sm focus:outline-none min-h-[120px]"
                />
                {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-glow px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/20"
                >
                  {loading ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
