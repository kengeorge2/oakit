'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'sonner';

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
    <section id="contactUs">
      <div>
        <div className="flex flex-col items-center space-y-4 py-12">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">
            Contact Us
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Have a question or need assistance? Our team is here to help. Fill out the form below or give us a call,
            and we&apos;ll be in touch as soon as possible.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 w-full max-w-lg"
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 min-h-[100px]"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
