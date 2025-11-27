'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/ProjectCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects } from '@/data/projects';

// export const metadata: Metadata = {
//   title: 'Projects',
//   description: 'Explore my portfolio of web development projects including full-stack applications, e-commerce platforms, and more.',
// };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

// Extract unique tags from all projects
const getAllTags = () => {
  const tagSet = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const allTags = useMemo(() => getAllTags(), []);
  
  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter(project => project.tags.includes(selectedTag));
  }, [selectedTag]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20 bg-gray-50 dark:bg-neutral-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="My Projects"
            subtitle="A showcase of my work, side projects, and experiments in web development"
          />
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTag === null
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 border border-gray-200 dark:border-neutral-700 hover:border-primary-500/50 hover:bg-primary-50 dark:hover:bg-primary-500/10'
              }`}
            >
              All Projects
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 border border-gray-200 dark:border-neutral-700 hover:border-primary-500/50 hover:bg-primary-50 dark:hover:bg-primary-500/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          
          {/* Filter status */}
          <p className="text-center mt-4 text-sm text-gray-500 dark:text-neutral-500">
            {selectedTag 
              ? `Showing ${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} with "${selectedTag}"`
              : `Showing all ${projects.length} projects`
            }
          </p>
        </motion.div>

        {/* All Projects Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.slug} 
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 dark:text-neutral-500 text-lg">
              No projects found with the selected technology.
            </p>
            <button
              onClick={() => setSelectedTag(null)}
              className="mt-4 text-primary-600 dark:text-primary-400 hover:underline"
            >
              Clear filter
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
