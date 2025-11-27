import { Social, NavLink } from '@/types';

export const socials: Social[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'Github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'Linkedin',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
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
  title: 'Aspiring Full-Stack Developer',
  email: 'vaibhav.kumar.kandhway@gmail.com',
  location: 'Vellore Institute of Technology',
  bio: `I'm a passionate and motivated developer seeking entry-level opportunities. I've completed 5+ projects showcasing my skills in React, Next.js, Node.js, and modern web technologies.`,
  longBio: `I'm an enthusiastic and self-driven developer eager to kickstart my career in software development. Through self-learning and dedication, I've built 5+ projects that demonstrate my proficiency in modern web technologies.

My journey in tech began with a curiosity about how websites work, which evolved into a deep passion for building full-stack applications. I've invested countless hours learning React, Next.js, Node.js, TypeScript, and other cutting-edge technologies through hands-on project development.

I'm actively seeking entry-level opportunities where I can contribute my skills, learn from experienced professionals, and grow as a developer. I'm a quick learner, team player, and always excited to take on new challenges.`,
  resumeUrl: 'https://github.com/VaibhavK289/resume/raw/main/resume.pdf',
  avatarUrl: '/images/avatar.jpg',
};
