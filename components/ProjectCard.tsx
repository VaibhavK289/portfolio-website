'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Project } from '@/types';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white dark:bg-neutral-900 rounded-xl md:rounded-2xl lg:rounded-3xl border border-gray-200/80 dark:border-neutral-800 overflow-hidden hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-primary-500/10 shadow-sm"
    >
      {/* Geometric accent - floating circle */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Image with clip-path reveal effect */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10">
        {project.image && !imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Hexagon placeholder for visual interest */}
            <div className="relative w-24 h-24 shape-hexagon bg-gradient-to-br from-primary-500/30 to-accent-500/30 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary-500/60 dark:text-primary-400/60">
                {project.title.charAt(0)}
              </span>
            </div>
          </div>
        )}
        {/* Diagonal overlay on hover - adds geometric interest */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Corner accent shape */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quick links on hover */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-900 hover:bg-white transition-colors shadow-lg"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-900 hover:bg-white transition-colors shadow-lg"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          )}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-semibold rounded-full shadow-lg">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500 dark:text-neutral-500">{project.year}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2.5 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-neutral-500 text-xs font-medium rounded-full">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* View details link */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 font-medium text-sm group/link"
        >
          View Case Study
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
