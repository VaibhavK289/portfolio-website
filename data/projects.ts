import { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'curasense-diagnosis',
    title: 'CuraSense - AI Medical Diagnosis',
    description: 'An AI-powered medical diagnosis system leveraging multi-agent workflows, RAG, and vision analysis for clinical decision support.',
    longDescription: `Built an advanced AI-powered medical diagnosis system for comprehensive clinical decision support.
    
Key features include:
- Multi-Agent AI Workflows orchestrated using CrewAI and LangGraph
- Document Processing to extract and analyze medical documents (PDF, images)
- RAG System with semantic search using ChromaDB vector database
- Vision Analysis for medical images (X-rays, scans) using Gemini Vision
- Real-time Streaming with live diagnosis updates via Server-Sent Events
- Modern UI with professional dashboard and animations
- Secure session-based data isolation with 15-min TTL

The system provides comprehensive clinical decision support through intelligent AI agents.`,
    image: '/images/projects/curasense_homepage.jpeg',
    tags: ['Python', 'FastAPI', 'CrewAI', 'LangGraph', 'ChromaDB', 'Gemini'],
    githubUrl: 'https://github.com/VaibhavK289/curasense-diagnosis',
    featured: true,
    year: '2025',
  },
  {
    slug: 'task-management-app',
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates, team workspaces, and integrations.',
    longDescription: `Developed a Trello-inspired task management application for teams.

Key features include:
- Drag-and-drop kanban boards
- Real-time collaboration with presence indicators
- Team workspaces and permission management
- Integration with Slack and GitHub
- Time tracking and reporting
- Mobile-responsive progressive web app

Used by 50+ teams for daily project management.`,
    image: '/images/projects/taskapp.jpg',
    tags: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'DnD Kit'],
    liveUrl: 'https://example-tasks.com',
    githubUrl: 'https://github.com/yourusername/taskapp',
    featured: true,
    year: '2025',
  },
  {
    slug: 'ai-content-generator',
    title: 'AI Content Generator',
    description: 'SaaS platform leveraging AI to generate marketing copy, blog posts, and social media content.',
    longDescription: `Created an AI-powered content generation platform using OpenAI's GPT API.

Key features include:
- Multiple content templates (blogs, ads, social posts)
- Brand voice customization
- Content history and versioning
- Team collaboration features
- Usage analytics and quotas
- API access for enterprise clients

Generates over 100,000 pieces of content monthly.`,
    image: '/images/projects/ai-generator.jpg',
    tags: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL', 'Stripe'],
    liveUrl: 'https://example-ai.com',
    githubUrl: 'https://github.com/yourusername/ai-content',
    featured: true,
    year: '2024',
  },
  {
    slug: 'fitness-tracking-app',
    title: 'Fitness Tracking App',
    description: 'Mobile-first fitness app with workout logging, progress tracking, and social features.',
    longDescription: `Built a comprehensive fitness tracking application with React Native.

Key features include:
- Custom workout builder
- Progress photos and measurements
- Social feed and challenges
- Integration with wearables
- Nutrition logging
- Personal records tracking

Available on iOS and Android with 5,000+ downloads.`,
    image: '/images/projects/fitness.jpg',
    tags: ['React Native', 'Node.js', 'MongoDB', 'AWS', 'GraphQL'],
    liveUrl: 'https://example-fitness.com',
    githubUrl: 'https://github.com/yourusername/fitness',
    featured: false,
    year: '2024',
  },
  {
    slug: 'real-estate-platform',
    title: 'Real Estate Platform',
    description: 'Property listing platform with advanced search, virtual tours, and mortgage calculator.',
    longDescription: `Developed a modern real estate platform for property listings and searches.

Key features include:
- Advanced search with map integration
- Virtual 3D property tours
- Mortgage and affordability calculators
- Agent profiles and direct messaging
- Saved searches and alerts
- Market analytics dashboard

Lists over 50,000 properties across multiple regions.`,
    image: '/images/projects/realestate.jpg',
    tags: ['Next.js', 'Node.js', 'Elasticsearch', 'Mapbox', 'AWS S3'],
    liveUrl: 'https://example-realestate.com',
    githubUrl: 'https://github.com/yourusername/realestate',
    featured: false,
    year: '2024',
  },
  {
    slug: 'developer-portfolio',
    title: 'Developer Portfolio',
    description: 'This very portfolio website built with Next.js, featuring dark mode and smooth animations.',
    longDescription: `Created this portfolio to showcase my work and skills as a full-stack developer.

Key features include:
- Modern, responsive design
- Dark/light mode toggle
- Smooth page transitions and animations
- Contact form with validation
- SEO optimized
- Performance optimized

Built with Next.js 14, Tailwind CSS, and Framer Motion.`,
    image: '/images/projects/portfolio.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://yourportfolio.com',
    githubUrl: 'https://github.com/yourusername/portfolio',
    featured: false,
    year: '2025',
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
