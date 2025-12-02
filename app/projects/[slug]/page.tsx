import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Zap, Brain, FileText, Pill, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { projects, getProjectBySlug } from '@/data/projects';
import { ReactNode } from 'react';
import { CuraSensePreviewSection } from '@/components/CuraSensePreviewSection';

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

// Simple markdown-like renderer for project descriptions
function renderDescription(text: string) {
  const lines = text.split('\n');
  const elements: ReactNode[] = [];
  let currentList: string[] = [];
  let inCodeBlock = false;
  let codeContent = '';
  let inTable = false;
  let tableRows: string[][] = [];
  
  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 text-neutral-400 mb-6 ml-4">
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };
  
  const flushTable = () => {
    if (tableRows.length > 0) {
      const headerRow = tableRows[0];
      const bodyRows = tableRows.slice(2); // Skip header and separator
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left text-neutral-400 border border-neutral-800 rounded-lg overflow-hidden">
            <thead className="bg-neutral-800/50">
              <tr>
                {headerRow.map((cell, i) => (
                  <th key={i} className="px-4 py-3 font-semibold text-white">{cell.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, i) => (
                <tr key={i} className="border-t border-neutral-800">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };
  
  lines.forEach((line) => {
    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${elements.length}`} className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 overflow-x-auto mb-6">
            <code className="text-sm text-cyan-400">{codeContent.trim()}</code>
          </pre>
        );
        codeContent = '';
        inCodeBlock = false;
      } else {
        flushList();
        flushTable();
        inCodeBlock = true;
      }
      return;
    }
    
    if (inCodeBlock) {
      codeContent += line + '\n';
      return;
    }
    
    // Tables
    if (line.includes('|') && line.trim().startsWith('|')) {
      flushList();
      inTable = true;
      const cells = line.split('|').filter(cell => cell.trim() !== '');
      if (!line.includes('---')) {
        tableRows.push(cells);
      } else {
        tableRows.push(cells); // Keep separator for reference
      }
      return;
    } else if (inTable) {
      flushTable();
    }
    
    // H2 headers
    if (line.startsWith('## ')) {
      flushList();
      const text = line.replace('## ', '').replace(/[🎯💡🏗️🚀🔧📊🛠️]/g, '').trim();
      const emoji = line.match(/[🎯💡🏗️🚀🔧📊🛠️]/)?.[0] || '';
      elements.push(
        <h2 key={`h2-${elements.length}`} className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2">
          {emoji && <span>{emoji}</span>}
          {text}
        </h2>
      );
      return;
    }
    
    // H3 headers
    if (line.startsWith('### ')) {
      flushList();
      const text = line.replace('### ', '').replace(/^\d+\.\s*/, '').trim();
      elements.push(
        <h3 key={`h3-${elements.length}`} className="text-xl font-semibold text-white mt-6 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
          {text}
        </h3>
      );
      return;
    }
    
    // List items
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const item = line.replace(/^[-*]\s+/, '').replace(/\*\*([^*]+)\*\*/g, '$1');
      currentList.push(item);
      return;
    }
    
    // Empty lines
    if (line.trim() === '') {
      flushList();
      return;
    }
    
    // Regular paragraphs
    flushList();
    const processedLine = line
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-neutral-800 px-1.5 py-0.5 rounded text-cyan-400 text-sm">$1</code>');
    
    elements.push(
      <p 
        key={`p-${elements.length}`} 
        className="text-neutral-400 mb-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: processedLine }}
      />
    );
  });
  
  flushList();
  flushTable();
  
  return elements;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isCuraSense = slug === 'curasense';

  return (
    <div className="min-h-screen py-20 bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-cyan-400 mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5 text-sm text-neutral-500">
              <Calendar className="w-4 h-4" />
              {project.year}
            </span>
            {project.featured && (
              <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 text-xs font-semibold rounded-full border border-cyan-500/30">
                Featured Project
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>

          <p className="text-xl text-neutral-400 mb-6">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-neutral-300 text-sm font-medium rounded-full border border-neutral-800 hover:border-cyan-500/50 transition-colors"
              >
                <Tag className="w-3.5 h-3.5 text-cyan-500" />
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

        {/* CuraSense Feature Cards */}
        {isCuraSense && (
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20">
              <FileText className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">Prescription Analysis</h3>
              <p className="text-sm text-neutral-400">AI-powered PDF parsing and medical insight extraction</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
              <ImageIcon className="w-8 h-8 text-emerald-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">Medical Imaging</h3>
              <p className="text-sm text-neutral-400">X-ray, CT, and MRI analysis with Gemini Vision</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20">
              <Pill className="w-8 h-8 text-violet-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">Drug Comparison</h3>
              <p className="text-sm text-neutral-400">Medication interactions and alternatives lookup</p>
            </div>
          </div>
        )}

        {/* Stats Bar for CuraSense */}
        {isCuraSense && (
          <div className="flex flex-wrap justify-center gap-8 p-6 mb-12 rounded-2xl bg-neutral-900/50 border border-neutral-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">10+</div>
              <div className="text-sm text-neutral-500">Reports Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">98.5%</div>
              <div className="text-sm text-neutral-500">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-400">&lt;30s</div>
              <div className="text-sm text-neutral-500">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">3</div>
              <div className="text-sm text-neutral-500">AI Models</div>
            </div>
          </div>
        )}

        {/* Interactive Preview for CuraSense */}
        {isCuraSense ? (
          <CuraSensePreviewSection />
        ) : (
          /* Project Image Placeholder for other projects */
          <div className="relative h-64 sm:h-96 mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-900/30 to-violet-900/30 border border-neutral-800">
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500/30 to-violet-500/30">
                {project.title.charAt(0)}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-cyan-400" />
            Project Overview
          </h2>
          
          <div className="space-y-0">
            {renderDescription(project.longDescription)}
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-violet-400" />
            Technologies Used
          </h2>
          <div className="not-prose grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
            {project.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 p-3 bg-neutral-900/50 rounded-xl border border-neutral-800 hover:border-cyan-500/50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
                <span className="text-sm font-medium text-neutral-300">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
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
