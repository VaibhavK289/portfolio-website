import { Social, NavLink } from '@/types';

export const socials: Social[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/VaibhavK289',
    icon: 'Github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/vaibhav-kumar-kandhway',
    icon: 'Linkedin',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/VaibhavK289',
    icon: 'Twitter',
  },
  {
    name: 'Email',
    url: 'mailto:vaibhav.kumar.kandhway@gmail.com',
    icon: 'Mail',
  },
];

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const personalInfo = {
  name: 'Vaibhav Kumar Kandhway',
  title: 'Full-Stack Developer',
  email: 'vaibhav.kumar.kandhway@gmail.com',
  location: 'Vellore Institute of Technology',
  bio: `Final-year CS student at Vellore Institute of Technology, shipping production-ready code in React, Next.js, and Node.js. My projects have real users, real APIs, and real impact.`,
  longBio: `I build full-stack applications that solve real problems. Currently completing my B.Tech in Computer Science at Vellore Institute of Technology, I've spent the last 2+ years turning ideas into deployed products.

My stack centers on React/Next.js for frontends that feel native, Node.js backends that scale, and TypeScript everywhere for code that doesn't break at 3 AM.

What sets me apart: I don't just build tutorials — I ship. CuraSense predicts diseases with ML models. EmoSync processes real-time sentiment. Nexora handles production-grade e-commerce. Each project taught me something new about building software that matters.

I'm looking for a team where I can contribute from day one, learn from senior engineers, and grow into a developer who makes complex things simple.`,
  resumeUrl: 'https://github.com/VaibhavK289/resume/raw/main/resume.pdf',
  avatarUrl: '/images/avatar.jpg',
};
