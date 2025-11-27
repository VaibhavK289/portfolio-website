"use client";

import { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg md:rounded-xl font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus-visible:ring-primary-500 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:shadow-xl hover:scale-[1.02]',
        secondary:
          'bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-neutral-700 focus-visible:ring-gray-500 border border-gray-200 dark:border-neutral-700 hover:scale-[1.02]',
        outline:
          'border-2 border-primary-500/50 text-primary-600 dark:text-primary-400 hover:bg-primary-500/10 dark:hover:bg-primary-500/10 hover:border-primary-500 focus-visible:ring-primary-500 hover:scale-[1.02]',
        ghost:
          'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 focus-visible:ring-gray-500',
        gradient:
          'bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 bg-[length:200%_auto] text-white hover:bg-right shadow-lg shadow-accent-500/25 transition-all duration-500 hover:scale-[1.02]',
        pill:
          'rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:scale-[1.05]',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Simple cn function to combine classes
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface ButtonBaseProps extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant, size, className, children } = props;
  const classes = cn(buttonVariants({ variant, size }), className);

  if ('href' in props && props.href) {
    const { href, external } = props;
    
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <Link href={href} className={classes}>
        <motion.span
          className="inline-flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  const { onClick, type = 'button', disabled } = props as ButtonAsButton;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
