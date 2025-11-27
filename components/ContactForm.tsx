'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-white mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="w-full px-4 py-3 rounded-xl border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="w-full px-4 py-3 rounded-xl border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-white mb-2"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject')}
          className="w-full px-4 py-3 rounded-xl border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="What's this about?"
        />
        {errors.subject && (
          <p className="mt-1.5 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-white mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className="w-full px-4 py-3 rounded-xl border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
          placeholder="Tell me about your project or just say hi..."
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Status Messages */}
      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-4 rounded-xl bg-green-900/30 text-green-400"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Message sent successfully! I&apos;ll get back to you soon.</span>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-4 rounded-xl bg-red-900/30 text-red-400"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
