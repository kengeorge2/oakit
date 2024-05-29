
'use client'; 

//import { Button } from "@/components/ui/button"
//import { Label } from "@/components/ui/label"
//import { Input } from "@/components/ui/input"
//import { Textarea } from "@/components/ui/textarea"

// Import component definitions
// Assuming basic form validation and success/error handling logic
// Assuming EmailIcon and UserIcon are defined elsewhere


//import { Form, Formik, Field, ErrorMessage } from 'formik';
//import * as Yup from 'yup';
//import { useRouter } from 'next/router';


import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define a type for the form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Define types for custom component props
interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

interface InputProps {
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface TextareaProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Label = ({ htmlFor, children }: LabelProps) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);

const Input = ({ id, type = 'text', placeholder, value, onChange }: InputProps) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  />
);

const Textarea = ({ id, placeholder, value, onChange }: TextareaProps) => (
  <textarea
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 min-h-[100px]"
  />
);

const Button = ({ children, type = 'button' }: ButtonProps) => (
  <button
    type={type}
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
  >
    {children}
  </button>
);

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

  const validateForm = (): boolean => {
    const newErrors: FormData = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.message) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission logic here, e.g., send data to an API
      console.log('Form data submitted:', formData);
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
          and we`&apos;ll be in touch as soon as possible.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-2 p-6 bg-gray-100 rounded-lg border-4 border-lime-500 border-gray-300 animate-pulse"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>
          <div className="flex justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
    </section>
  );
};

export default ContactUs;
