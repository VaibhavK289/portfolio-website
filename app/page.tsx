'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ChevronDown,
  Code,
  Palette,
  Zap,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ProjectCard';
import { SkillsSection } from '@/components/SkillsSection';
import { getFeaturedProjects } from '@/data/projects';
import { personalInfo, socials } from '@/data/socials';
import {
  Spotlight,
  TextGenerateEffect,
  BackgroundBeams,
  SparklesCore,
  HoverBorderGradient,
} from '@/components/ui/aceternity';
import { MagicCard } from '@/components/ui/magicui';
import { TiltCard, ScrollProgress, ScrollReveal, staggerContainer, fadeUpVariant } from '@/components/animations';

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  // Smooth spring for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  
  // Seamless background gradient that changes with scroll
  const gradientOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.15, 0.1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Seamless gradient overlay that transitions between sections */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 50%, rgba(168, 85, 247, var(--gradient-opacity)), transparent)`,
        }}
      >
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: gradientOpacity }}
        />
      </motion.div>

      {/* Hero Section with Spotlight */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-black/[0.96] dark:via-black/[0.96] dark:to-black/[0.96] antialiased">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent" />
        </motion.div>
        
        {/* Spotlight Effect - only in dark mode */}
        <div className="hidden dark:block">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
        </div>
        
        {/* Sparkles Background - both modes with different colors */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={40}
            className="w-full h-full"
            particleColor="var(--color-sparkle)"
          />
        </div>
        
        {/* Light mode decorative gradient blobs */}
        <div className="absolute inset-0 dark:hidden overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                Available for new opportunities
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                Hi, I&apos;m{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 dark:from-primary-400 via-accent-500 dark:via-accent-400 to-primary-500 dark:to-primary-400 animate-shimmer bg-[length:200%_auto]">
                  {personalInfo.name}
                </span>
              </h1>

              <TextGenerateEffect
                words={personalInfo.title}
                className="text-xl sm:text-2xl text-gray-600 dark:text-neutral-300 font-medium mb-6"
              />

              <p className="text-lg text-gray-600 dark:text-neutral-400 mb-8 max-w-lg leading-relaxed">
                {personalInfo.bio}
              </p>

              {/* Location with glow */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-neutral-400 mb-8">
                <div className="p-1.5 rounded-full bg-primary-500/10">
                  <MapPin className="w-4 h-4 text-primary-500 dark:text-primary-400" />
                </div>
                <span>{personalInfo.location}</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  href="/projects"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-6 py-2"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-4 h-4" />
                </HoverBorderGradient>
                
                <Button
                  href={personalInfo.resumeUrl}
                  variant="outline"
                  size="lg"
                  external
                  className="border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-500">
                  Connect:
                </span>
                <div className="flex items-center gap-2">
                  {socials.slice(0, 3).map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.name}
                    >
                      {social.icon === 'Github' && <Github className="w-5 h-5" />}
                      {social.icon === 'Linkedin' && <Linkedin className="w-5 h-5" />}
                      {social.icon === 'Twitter' && (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Visual element with Glowing Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                {/* Animated gradient border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-3xl blur-lg opacity-75 animate-pulse"></div>
                
                <div className="relative w-80 h-80 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-1 overflow-hidden">
                  <div className="w-full h-full rounded-3xl bg-neutral-950 flex items-center justify-center relative overflow-hidden">
                    {/* Inner sparkles */}
                    <SparklesCore
                      id="avatar-sparkles"
                      background="transparent"
                      minSize={0.4}
                      maxSize={1}
                      particleDensity={30}
                      className="absolute inset-0"
                      particleColor="var(--color-accent-400)"
                    />
                    <span className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary-400 to-accent-500 relative z-10">
                      VK
                    </span>
                  </div>
                </div>
                
                {/* Floating elements with better styling */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-neutral-900/90 backdrop-blur-sm shadow-xl border border-neutral-800"
                >
                  <span className="text-2xl">⚛️</span>
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-neutral-900/90 backdrop-blur-sm shadow-xl border border-neutral-800"
                >
                  <span className="text-2xl">🚀</span>
                </motion.div>
                
                <motion.div
                  animate={{ y: [-5, 15, -5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute top-1/2 -right-8 px-4 py-2 rounded-xl bg-neutral-900/90 backdrop-blur-sm shadow-xl border border-neutral-800"
                >
                  <span className="text-2xl">💻</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center text-gray-500 dark:text-neutral-500"
            >
              <span className="text-sm mb-2">Scroll down</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>

        {/* Background Beams - only in dark mode */}
        <div className="hidden dark:block">
          <BackgroundBeams className="opacity-40" />
        </div>
      </section>

      {/* Services/What I Do Section with Bento Grid style */}
      <section className="py-24 bg-gray-50 dark:bg-neutral-950 relative overflow-hidden">
        {/* Seamless gradient transition from hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 dark:from-black/50 via-transparent to-transparent pointer-events-none" />
        
        {/* Subtle ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary-500/5 via-accent-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <SectionHeading
              title="What I Do"
              subtitle="I specialize in building modern, performant web applications"
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[{
                icon: Code,
                title: 'Frontend Development',
                description: 'Building responsive and interactive UIs with React, Next.js, and modern CSS',
                gradient: 'from-cyan-400 to-primary-500',
                iconBg: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
                glowColor: 'rgba(6, 182, 212, 0.3)',
              },
              {
                icon: Globe,
                title: 'Backend Development',
                description: 'Creating robust APIs and server-side applications with Node.js',
                gradient: 'from-accent-400 to-accent-600',
                iconBg: 'bg-gradient-to-br from-violet-400 to-purple-600',
                glowColor: 'rgba(168, 85, 247, 0.3)',
              },
              {
                icon: Palette,
                title: 'UI/UX Design',
                description: 'Designing beautiful, user-friendly interfaces with attention to detail',
                gradient: 'from-primary-400 to-accent-500',
                iconBg: 'bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-500',
                glowColor: 'rgba(99, 102, 241, 0.3)',
              },
              {
                icon: Zap,
                title: 'Performance',
                description: 'Optimizing applications for speed, SEO, and best practices',
                gradient: 'from-emerald-400 to-cyan-500',
                iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-500',
                glowColor: 'rgba(16, 185, 129, 0.3)',
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Card glow effect on hover */}
                  <motion.div 
                    className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: `linear-gradient(135deg, ${service.glowColor}, transparent)` }}
                  />
                  
                  <div className="relative h-full p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-300">
                    {/* Icon with glow */}
                    <div className="relative mb-5">
                      <motion.div 
                        className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                        style={{ background: service.glowColor }}
                      />
                      <div className={`relative w-14 h-14 rounded-xl ${service.iconBg} flex items-center justify-center shadow-lg`}>
                        <service.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {/* Title with gradient on hover */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-accent-500 transition-all duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Subtle bottom accent line */}
                    <motion.div 
                      className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-neutral-900/50 relative">
        {/* Seamless gradient transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-neutral-950 via-transparent to-gray-50 dark:to-neutral-950 pointer-events-none" />
        
        {/* Subtle sparkles for about section */}
        <div className="absolute inset-0 opacity-30">
          <SparklesCore
            id="about-sparkles"
            background="transparent"
            minSize={0.3}
            maxSize={0.8}
            particleDensity={15}
            className="w-full h-full"
            particleColor="var(--color-sparkle)"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <SectionHeading
              title="About Me"
              subtitle="Get to know me better and what drives my passion for development"
            />
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
                  {personalInfo.longBio}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/about" variant="secondary">
                  Learn More About Me
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="/contact" variant="ghost">
                  Get In Touch
                </Button>
              </div>
            </ScrollReveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { number: '0', label: 'Years Experience' },
                { number: '5+', label: 'Projects Completed' },
                { number: '10+', label: 'Technologies' },
                { number: '100%', label: 'Dedication' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                >
                  <TiltCard className="h-full">
                    <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900/80 border border-gray-200 dark:border-neutral-800 text-center backdrop-blur-sm hover:border-primary-500/50 transition-colors h-full shadow-sm">
                      <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 dark:from-primary-400 to-accent-500 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-neutral-400">
                        {stat.label}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <ScrollReveal>
        <section className="py-20 bg-gray-50 dark:bg-neutral-950 relative">
          {/* Top gradient blend */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 dark:from-neutral-900/80 to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading
              title="Skills & Technologies"
              subtitle="The tools and technologies I use to bring ideas to life"
            />
            <SkillsSection />
          </div>
          
          {/* Bottom gradient blend */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 dark:from-neutral-900/50 to-transparent pointer-events-none" />
        </section>
      </ScrollReveal>
      
      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      {/* Featured Projects Section */}
      <ScrollReveal>
        <section className="py-20 bg-white dark:bg-neutral-900/50 relative">
          {/* Top gradient blend */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50/80 dark:from-neutral-950/80 to-transparent pointer-events-none z-20" />
          
          {/* Subtle sparkles for projects section */}
          <div className="absolute inset-0 opacity-30">
            <SparklesCore
              id="projects-sparkles"
              background="transparent"
              minSize={0.3}
              maxSize={0.8}
              particleDensity={15}
              className="w-full h-full"
              particleColor="var(--color-sparkle)"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading
              title="Featured Projects"
              subtitle="A selection of my best work showcasing my skills and experience"
            />

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {featuredProjects.map((project, index) => (
                <motion.div key={project.slug} variants={fadeUpVariant}>
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <HoverBorderGradient
                containerClassName="rounded-full mx-auto"
                href="/projects"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-8 py-3"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-5 h-5" />
              </HoverBorderGradient>
            </motion.div>
          </div>
          
          {/* Bottom gradient blend */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50/80 dark:from-neutral-950/80 to-transparent pointer-events-none z-20" />
        </section>
      </ScrollReveal>
      
      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-500/20 to-transparent" />

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-950 dark:to-neutral-950 relative overflow-hidden">
          {/* Top gradient blend */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/50 dark:from-neutral-900/50 to-transparent pointer-events-none z-20" />
          
          {/* Background sparkles - both modes */}
          <div className="absolute inset-0">
            <SparklesCore
              id="cta-sparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={20}
              className="w-full h-full"
              particleColor="var(--color-sparkle)"
            />
          </div>
          
          {/* Light mode decorative elements */}
          <div className="absolute inset-0 dark:hidden overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-10 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Let&apos;s Work{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 dark:from-primary-400 to-accent-500">
                  Together
                </span>
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Have a project in mind or just want to chat? I&apos;m always open to
                discussing new opportunities and ideas.
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  href="/contact"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-8 py-3"
                >
                  <Mail className="w-5 h-5" />
                  <span>Get In Touch</span>
                </HoverBorderGradient>
                
                <Button
                  href={`mailto:${personalInfo.email}`}
                  variant="outline"
                  size="lg"
                  external
                  className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                >
                  {personalInfo.email}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
