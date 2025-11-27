import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { projects, getProjectBySlug } from '@/data/projects';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              {project.year}
            </span>
            {project.featured && (
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full"
              >
                <Tag className="w-3.5 h-3.5" />
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <Button href={project.liveUrl} variant="primary" external>
                <ExternalLink className="w-4 h-4" />
                View Live Site
              </Button>
            )}
            {project.githubUrl && (
              <Button href={project.githubUrl} variant="outline" external>
                <Github className="w-4 h-4" />
                View Source Code
              </Button>
            )}
          </div>
        </header>

        {/* Project Image Placeholder */}
        <div className="relative h-64 sm:h-96 mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl font-bold text-primary-500/20 dark:text-primary-400/20">
              {project.title.charAt(0)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Project Overview</h2>
          <div className="whitespace-pre-line text-gray-600 dark:text-gray-400">
            {project.longDescription}
          </div>

          <h2 className="mt-12">Technologies Used</h2>
          <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {project.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="w-2 h-2 rounded-full gradient-bg" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <Button href="/projects" variant="ghost">
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Button>
            <Button href="/contact" variant="primary">
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
