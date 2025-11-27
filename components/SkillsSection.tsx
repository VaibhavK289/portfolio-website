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

const categoryIcons: { [key: string]: React.ElementType } = {
  Layout,
  Server,
  Database,
  Cloud,
  Wrench,
};

interface SkillBadgeProps {
  skill: Skill;
  index: number;
}

function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="relative group"
    >
      <div className="flex items-center gap-3 px-4 py-3 bg-neutral-900 rounded-xl border border-neutral-800 shadow-sm hover:shadow-md hover:border-primary-500/50 hover:bg-neutral-800/50 transition-all cursor-default">
        <span className="text-sm font-medium text-white">
          {skill.name}
        </span>
        {/* Proficiency bar */}
        <div className="flex-1 h-1.5 bg-neutral-700 rounded-full overflow-hidden min-w-[60px]">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
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
        const Icon = categoryIcons[category.icon] || Wrench;
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
              <div className="p-2 rounded-lg bg-primary-900/30 text-primary-400">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {category.label}
              </h3>
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
