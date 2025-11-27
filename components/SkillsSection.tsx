'use client';

import { motion } from 'framer-motion';
import {
  Layout,
  Server,
  Database,
  Cloud,
  Wrench,
} from 'lucide-react';
import { skillCategories, getSkillsByCategory } from '@/data/skills';
import { Skill } from '@/types';

// Varied icon shapes per category for visual rhythm
const categoryConfig: { [key: string]: { icon: React.ElementType; shape: string } } = {
  Layout: { icon: Layout, shape: 'rounded-full' },
  Server: { icon: Server, shape: 'shape-hexagon' },
  Database: { icon: Database, shape: 'rounded-xl' },
  Cloud: { icon: Cloud, shape: 'shape-squircle' },
  Wrench: { icon: Wrench, shape: 'rounded-lg' },
};

interface SkillBadgeProps {
  skill: Skill;
  index: number;
}

function SkillBadge({ skill, index }: SkillBadgeProps) {
  // Alternate between pill and rounded shapes for variety
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="relative group"
    >
      <div className={`flex items-center gap-3 px-4 py-3 bg-white dark:bg-neutral-900 ${isEven ? 'rounded-full' : 'rounded-lg md:rounded-xl'} border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-primary-500/50 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-all duration-200 ease-out cursor-default`}>
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {skill.name}
        </span>
        {/* Proficiency bar with varied end cap */}
        <div className={`flex-1 h-1.5 bg-gray-200 dark:bg-neutral-700 ${isEven ? 'rounded-full' : 'rounded-sm'} overflow-hidden min-w-[60px]`}>
          <motion.div
            className={`h-full bg-gradient-to-r from-primary-500 to-accent-500 ${isEven ? 'rounded-full' : 'rounded-sm'}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <div className="space-y-10">
      {skillCategories.map((category, categoryIndex) => {
        const config = categoryConfig[category.icon] || { icon: Wrench, shape: 'rounded-lg' };
        const Icon = config.icon;
        const categorySkills = getSkillsByCategory(category.id);

        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              {/* Icon container with varied shape per category */}
              <div className={`p-2.5 ${config.shape} bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-600 dark:text-primary-400 shadow-sm`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {category.label}
              </h3>
              {/* Decorative accent */}
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 dark:from-neutral-800 to-transparent ml-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categorySkills.map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
