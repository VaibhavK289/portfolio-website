'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Input focus animation - expands border on focus
const inputClasses = "w-full px-5 py-3.5 rounded-lg border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:ring-0 focus:border-primary-500 dark:focus:border-primary-400 focus:shadow-[0_0_0_4px_rgba(6,182,212,0.1)] transition-all duration-300 ease-out outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
      {/* Decorative geometric accents */}
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-primary-500/10 to-transparent blur-xl pointer-events-none" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 shape-hexagon bg-gradient-to-br from-accent-500/10 to-transparent blur-xl pointer-events-none" />
      
      {/* Name */}
      <div className="relative">
        <motion.label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
          animate={{ 
            color: focusedField === 'name' ? 'var(--color-primary-500)' : undefined 
          }}
          transition={{ duration: 0.2 }}
        >
          Name
        </motion.label>
        <div className="relative">
          <input
            type="text"
            id="name"
            {...register('name')}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className={inputClasses}
            placeholder="Your name"
          />
          {/* Animated underline accent */}
          <motion.div 
            className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
            initial={{ width: 0, x: '-50%' }}
            animate={{ 
              width: focusedField === 'name' ? '100%' : 0,
              x: focusedField === 'name' ? 0 : '-50%'
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
        {errors.name && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-sm text-red-500"
          >
            {errors.name.message}
          </motion.p>
        )}
      </div>

      {/* Email */}
      <div className="relative">
        <motion.label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
          animate={{ 
            color: focusedField === 'email' ? 'var(--color-primary-500)' : undefined 
          }}
          transition={{ duration: 0.2 }}
        >
          Email
        </motion.label>
        <div className="relative">
          <input
            type="email"
            id="email"
            {...register('email')}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className={inputClasses}
            placeholder="your.email@example.com"
          />
          <motion.div 
            className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
            initial={{ width: 0, x: '-50%' }}
            animate={{ 
              width: focusedField === 'email' ? '100%' : 0,
              x: focusedField === 'email' ? 0 : '-50%'
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
        {errors.email && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-sm text-red-500"
          >
            {errors.email.message}
          </motion.p>
        )}
      </div>

      {/* Subject */}
      <div className="relative">
        <motion.label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
          animate={{ 
            color: focusedField === 'subject' ? 'var(--color-primary-500)' : undefined 
          }}
          transition={{ duration: 0.2 }}
        >
          Subject
        </motion.label>
        <div className="relative">
          <input
            type="text"
            id="subject"
            {...register('subject')}
            onFocus={() => setFocusedField('subject')}
            onBlur={() => setFocusedField(null)}
            className={inputClasses}
            placeholder="What's this about?"
          />
          <motion.div 
            className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
            initial={{ width: 0, x: '-50%' }}
            animate={{ 
              width: focusedField === 'subject' ? '100%' : 0,
              x: focusedField === 'subject' ? 0 : '-50%'
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
        {errors.subject && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-sm text-red-500"
          >
            {errors.subject.message}
          </motion.p>
        )}
      </div>

      {/* Message */}
      <div className="relative">
        <motion.label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
          animate={{ 
            color: focusedField === 'message' ? 'var(--color-primary-500)' : undefined 
          }}
          transition={{ duration: 0.2 }}
        >
          Message
        </motion.label>
        <div className="relative">
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            className={`${inputClasses} resize-none`}
            placeholder="Tell me about your project or just say hi..."
          />
          <motion.div 
            className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
            initial={{ width: 0, x: '-50%' }}
            animate={{ 
              width: focusedField === 'message' ? '100%' : 0,
              x: focusedField === 'message' ? 0 : '-50%'
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
        {errors.message && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-sm text-red-500"
          >
            {errors.message.message}
          </motion.p>
        )}
      </div>

      {/* Status Messages */}
      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-4 rounded-[12px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
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
            className="flex items-center gap-2 p-4 rounded-[12px] bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
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
