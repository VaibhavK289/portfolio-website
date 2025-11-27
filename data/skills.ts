import { Skill } from '@/types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: 'react', category: 'frontend', proficiency: 95 },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend', proficiency: 90 },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend', proficiency: 90 },
  { name: 'JavaScript', icon: 'javascript', category: 'frontend', proficiency: 95 },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend', proficiency: 90 },
  { name: 'HTML/CSS', icon: 'html', category: 'frontend', proficiency: 95 },
  
  // Backend
  { name: 'Node.js', icon: 'nodejs', category: 'backend', proficiency: 90 },
  { name: 'Express', icon: 'express', category: 'backend', proficiency: 85 },
  { name: 'Python', icon: 'python', category: 'backend', proficiency: 80 },
  { name: 'GraphQL', icon: 'graphql', category: 'backend', proficiency: 75 },
  { name: 'REST APIs', icon: 'api', category: 'backend', proficiency: 90 },
  
  // Database
  { name: 'PostgreSQL', icon: 'postgresql', category: 'database', proficiency: 85 },
  { name: 'MongoDB', icon: 'mongodb', category: 'database', proficiency: 85 },
  { name: 'Redis', icon: 'redis', category: 'database', proficiency: 75 },
  { name: 'Prisma', icon: 'prisma', category: 'database', proficiency: 80 },
  
  // DevOps
  { name: 'Docker', icon: 'docker', category: 'devops', proficiency: 80 },
  { name: 'AWS', icon: 'aws', category: 'devops', proficiency: 75 },
  { name: 'Vercel', icon: 'vercel', category: 'devops', proficiency: 90 },
  { name: 'CI/CD', icon: 'cicd', category: 'devops', proficiency: 80 },
  
  // Tools
  { name: 'Git', icon: 'git', category: 'tools', proficiency: 90 },
  { name: 'VS Code', icon: 'vscode', category: 'tools', proficiency: 95 },
  { name: 'Figma', icon: 'figma', category: 'tools', proficiency: 70 },
  { name: 'Linux', icon: 'linux', category: 'tools', proficiency: 80 },
];

export const getSkillsByCategory = (category: Skill['category']) =>
  skills.filter((s) => s.category === category);

export const skillCategories = [
  { id: 'frontend', label: 'Frontend', icon: 'Layout' },
  { id: 'backend', label: 'Backend', icon: 'Server' },
  { id: 'database', label: 'Database', icon: 'Database' },
  { id: 'devops', label: 'DevOps', icon: 'Cloud' },
  { id: 'tools', label: 'Tools', icon: 'Wrench' },
] as const;
