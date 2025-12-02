import { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'curasense',
    title: 'CuraSense - AI Healthcare Platform',
    description: 'An AI-powered healthcare assistant combining cutting-edge machine learning with medical expertise for prescription analysis, medical imaging diagnosis, and drug comparison.',
    longDescription: `CuraSense is a comprehensive AI-powered healthcare platform that combines cutting-edge artificial intelligence with medical expertise to provide instant analysis of prescriptions, medical images, and drug comparisons.

## 🎯 Problem Statement

Healthcare professionals and patients often face challenges with:
- Time-consuming manual prescription analysis
- Limited access to quick medical image interpretation
- Difficulty comparing medications and checking drug interactions
- Lack of accessible, AI-powered diagnostic support tools

## 💡 Solution

CuraSense addresses these challenges by providing three specialized AI models working together for comprehensive healthcare support:

### 1. Prescription Analysis
Upload any medical prescription or blood test report PDF for instant AI-powered analysis. The system extracts medication details, dosages, and provides insights about the prescribed treatments.

### 2. X-Ray & CT Scan Analysis
Advanced vision AI analyzes X-rays, CT scans, and MRI images with detailed diagnostic reports. Powered by Gemini Vision for accurate medical image interpretation.

### 3. Medicine Comparison
Compare medications, check drug interactions, and find alternatives with comprehensive drug information from verified medical databases.

## 🏗️ System Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router for optimal performance
- **UI Components**: Custom component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth, professional interactions
- **State Management**: React hooks with Context API
- **Authentication**: Clerk for secure user authentication

### Backend (FastAPI + Python)
- **API Framework**: FastAPI for high-performance async API
- **AI Orchestration**: CrewAI and LangGraph for multi-agent workflows
- **Vector Database**: ChromaDB for semantic search and RAG
- **Document Processing**: PDF parsing and image extraction
- **Real-time Updates**: Server-Sent Events (SSE) for live diagnosis streaming

### AI/ML Models
- **Gemini Pro**: Text analysis and reasoning
- **Gemini Vision**: Medical image analysis (X-rays, CT scans, MRIs)
- **RAG Pipeline**: Retrieval-Augmented Generation for accurate medical information
- **Multi-Agent System**: Specialized agents for different diagnostic tasks

## 🚀 Key Features

| Feature | Description |
|---------|-------------|
| **Real-time Streaming** | Live diagnosis updates via Server-Sent Events |
| **HIPAA-Compliant Design** | Secure session-based data isolation with 15-min TTL |
| **Multi-format Support** | PDF prescriptions, blood reports, X-rays, CT scans |
| **Drug Interaction Checker** | Comprehensive medication safety analysis |
| **Professional Dashboard** | Clean, intuitive interface for healthcare professionals |
| **98.5% Accuracy Rate** | High accuracy in prescription and image analysis |
| **< 30s Response Time** | Fast AI-powered analysis and results |

## 🔧 Technical Implementation

### Document Processing Pipeline
\`\`\`
Upload → PDF/Image Parsing → Text Extraction → AI Analysis → Report Generation
\`\`\`

### Multi-Agent Workflow
1. **Document Analyzer Agent**: Extracts and structures medical data
2. **Medical Expert Agent**: Provides clinical interpretation
3. **Drug Interaction Agent**: Checks medication safety
4. **Report Generator Agent**: Creates comprehensive reports

### RAG System Architecture
- Document embedding using sentence transformers
- ChromaDB vector storage for efficient retrieval
- Context-aware response generation with medical knowledge base

## 📊 Performance Metrics

- **Reports Analyzed**: 10+ (and growing)
- **Accuracy Rate**: 98.5%
- **Average Response Time**: < 30 seconds
- **AI Models**: 3 specialized models

## 🛠️ Tech Stack

**Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Clerk Auth, Radix UI
**Backend**: Python, FastAPI, CrewAI, LangGraph, ChromaDB
**AI/ML**: Google Gemini Pro, Gemini Vision, LangChain
**Infrastructure**: Vercel (Frontend), Railway/Render (Backend)`,
    image: '/images/projects/curasense_homepage.jpeg',
    tags: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'CrewAI', 'LangGraph', 'ChromaDB', 'Gemini AI', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://curasense-frontend.vercel.app/',
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
    image: '',
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
    image: '',
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
    image: '',
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
    image: '',
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
    image: '',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://yourportfolio.com',
    githubUrl: 'https://github.com/yourusername/portfolio',
    featured: false,
    year: '2025',
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
