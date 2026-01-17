'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { 
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Terminal,
  Settings,
  Key,
  Play,
  Monitor,
  Download,
  FolderTree,
  Github,
  Check,
  Copy,
  ChevronRight,
  Zap,
  Code2,
  Server,
  Database,
  Brain,
  Lock,
  Rocket,
  Box,
  Cpu,
} from 'lucide-react';
import {
  ScrollReveal,
  ScrollProgress,
  aiCardContainerVariants,
  aiCardVariants,
} from '@/components/animations';
import { AllmaPageNav, AllmaBackground } from '../page';

// Code Block Component
function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-800/50 border-b border-neutral-700">
        <span className="text-xs text-neutral-400">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-cyan-400">{code}</code>
      </pre>
    </div>
  );
}

// Documentation Hero
function DocsHero() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link href="/projects/allma-studio" className="group inline-flex items-center gap-2 text-neutral-400 hover:text-violet-400 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Overview
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <BookOpen className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">Getting Started</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Documentation &{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-500 to-cyan-400">
              Setup Guide
            </span>
          </h1>
          
          <p className="text-lg text-neutral-400 max-w-2xl">
            Everything you need to get Allma Studio running on your local machine.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Prerequisites Section
function PrerequisitesSection() {
  const requirements = [
    { icon: Box, name: 'Docker Desktop', desc: 'Recommended for easy setup', required: true },
    { icon: Code2, name: 'Node.js 18+', desc: 'For frontend development', required: false },
    { icon: Server, name: 'Python 3.11+', desc: 'For backend development', required: false },
    { icon: Brain, name: 'Ollama', desc: 'Local LLM runtime', required: true },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Rocket className="w-6 h-6 text-violet-400" />
            Prerequisites
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {requirements.map((req) => (
            <motion.div
              key={req.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <req.icon className="w-5 h-5 text-violet-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{req.name}</span>
                  {req.required && (
                    <span className="px-1.5 py-0.5 text-[10px] rounded bg-emerald-500/20 text-emerald-400">Required</span>
                  )}
                </div>
                <span className="text-xs text-neutral-400">{req.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Quick Start Section
function QuickStartSection() {
  return (
    <section className="relative py-12 px-4 sm:px-6 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-amber-400" />
            Quick Start (Docker)
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-violet-400 mb-3">1. Clone the repository</h3>
            <CodeBlock code={`git clone https://github.com/VaibhavK289/Allma.git
cd Allma`} />
          </div>

          <div>
            <h3 className="text-sm font-medium text-violet-400 mb-3">2. Copy environment file</h3>
            <CodeBlock code={`cp .env.example .env`} />
          </div>

          <div>
            <h3 className="text-sm font-medium text-violet-400 mb-3">3. Start all services</h3>
            <CodeBlock code={`docker compose up -d`} />
          </div>

          <div>
            <h3 className="text-sm font-medium text-violet-400 mb-3">4. Open in browser</h3>
            <CodeBlock code={`open http://localhost:3000`} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Manual Setup Section
function ManualSetupSection() {
  return (
    <section className="relative py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Terminal className="w-6 h-6 text-cyan-400" />
            Manual Setup (Development)
          </h2>
        </ScrollReveal>

        <div className="space-y-8">
          {/* Ollama Setup */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-violet-400" />
              Install Ollama & Models
            </h3>
            <div className="space-y-4">
              <CodeBlock code={`# Install Ollama (Windows)
# Download from https://ollama.ai/download

# Pull required models
ollama pull nomic-embed-text    # Required for embeddings
ollama pull deepseek-r1:latest  # Recommended LLM

# Or choose another model:
ollama pull gemma2:9b
ollama pull qwen2.5-coder:7b`} />
            </div>
          </div>

          {/* Backend Setup */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-400" />
              Backend Setup
            </h3>
            <CodeBlock code={`cd allma-backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
.\\venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn main:app --reload --host 0.0.0.0 --port 8000`} />
          </div>

          {/* Frontend Setup */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-emerald-400" />
              Frontend Setup
            </h3>
            <CodeBlock code={`cd allma-frontend

# Install dependencies
npm install

# Start development server
npm run dev`} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Configuration Section
function ConfigurationSection() {
  return (
    <section className="relative py-12 px-4 sm:px-6 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Settings className="w-6 h-6 text-violet-400" />
            Configuration
          </h2>
        </ScrollReveal>

        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            Environment Variables
          </h3>
          <p className="text-sm text-neutral-400 mb-4">Create a <code className="text-violet-400">.env</code> file in the root directory:</p>
          <CodeBlock 
            language="env"
            code={`# Backend Configuration
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=deepseek-r1:latest
OLLAMA_EMBEDDING_MODEL=nomic-embed-text:latest

# Vector Store
VECTOR_STORE_PATH=./data/vectorstore
CHROMA_PERSIST_DIRECTORY=./data/vectorstore

# API Settings
API_HOST=0.0.0.0
API_PORT=8000
LOG_LEVEL=INFO

# Frontend Configuration
VITE_API_URL=http://localhost:8000`} />
        </div>

        {/* Model Options */}
        <div className="mt-8 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            Available Models
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left py-2 text-neutral-400 font-medium">Model</th>
                  <th className="text-left py-2 text-neutral-400 font-medium">Size</th>
                  <th className="text-left py-2 text-neutral-400 font-medium">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                <tr><td className="py-2 text-white">deepseek-r1:latest</td><td className="py-2 text-neutral-400">5.2GB</td><td className="py-2 text-neutral-400">Reasoning, Analysis</td></tr>
                <tr><td className="py-2 text-white">gemma2:9b</td><td className="py-2 text-neutral-400">5.4GB</td><td className="py-2 text-neutral-400">General Purpose</td></tr>
                <tr><td className="py-2 text-white">qwen2.5-coder:7b</td><td className="py-2 text-neutral-400">4.7GB</td><td className="py-2 text-neutral-400">Code Generation</td></tr>
                <tr><td className="py-2 text-white">llama3.2</td><td className="py-2 text-neutral-400">2.0GB</td><td className="py-2 text-neutral-400">Fast Responses</td></tr>
                <tr><td className="py-2 text-white">nomic-embed-text</td><td className="py-2 text-neutral-400">274MB</td><td className="py-2 text-emerald-400">Embeddings (Required)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// Access Points Section
function AccessPointsSection() {
  const endpoints = [
    { name: 'Frontend', url: 'http://localhost:5173', desc: 'React Application' },
    { name: 'Backend API', url: 'http://localhost:8000', desc: 'FastAPI Server' },
    { name: 'API Docs', url: 'http://localhost:8000/docs', desc: 'Swagger UI' },
    { name: 'Ollama', url: 'http://localhost:11434', desc: 'LLM Runtime' },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Monitor className="w-6 h-6 text-emerald-400" />
            Access Points
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {endpoints.map((ep) => (
            <motion.div
              key={ep.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-violet-500/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">{ep.name}</span>
                <span className="text-xs text-neutral-500">{ep.desc}</span>
              </div>
              <code className="text-sm text-cyan-400">{ep.url}</code>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// API Reference Section
function APIReferenceSection() {
  return (
    <section className="relative py-12 px-4 sm:px-6 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <Code2 className="w-6 h-6 text-cyan-400" />
            API Reference
          </h2>
          <p className="text-neutral-400 mb-6 text-sm">Base URL: <code className="text-cyan-400">http://localhost:8000</code></p>
        </ScrollReveal>

        <div className="space-y-6">
          {/* Health Endpoint */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 text-xs font-bold rounded bg-emerald-500/20 text-emerald-400">GET</span>
              <code className="text-white font-mono text-sm">/health</code>
              <span className="text-neutral-500 text-sm">— Check system health</span>
            </div>
            <CodeBlock 
              language="json"
              code={`{
  "status": "healthy",
  "components": {
    "ollama": { "status": "connected", "model": "deepseek-r1:latest" },
    "vector_store": { "status": "ready", "documents_count": 150 },
    "database": { "status": "connected" }
  },
  "version": "1.0.0"
}`} />
          </div>

          {/* Chat Endpoint */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 text-xs font-bold rounded bg-amber-500/20 text-amber-400">POST</span>
              <code className="text-white font-mono text-sm">/chat/</code>
              <span className="text-neutral-500 text-sm">— Send a chat message</span>
            </div>
            <h4 className="text-sm font-medium text-violet-400 mb-2">Request Body:</h4>
            <CodeBlock 
              language="json"
              code={`{
  "message": "Explain quantum computing",
  "use_rag": false,
  "conversation_id": "optional-uuid",
  "stream": true,
  "temperature": 0.7,
  "max_tokens": 2048
}`} />
            <h4 className="text-sm font-medium text-violet-400 mt-4 mb-2">Response (Streaming):</h4>
            <CodeBlock 
              language="text"
              code={`data: {"content": "Quantum", "done": false}
data: {"content": " computing", "done": false}
data: {"content": "", "done": true, "sources": []}`} />
          </div>

          {/* RAG Ingest Endpoint */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 text-xs font-bold rounded bg-amber-500/20 text-amber-400">POST</span>
              <code className="text-white font-mono text-sm">/rag/ingest</code>
              <span className="text-neutral-500 text-sm">— Upload document for RAG</span>
            </div>
            <h4 className="text-sm font-medium text-violet-400 mb-2">Request (multipart/form-data):</h4>
            <CodeBlock 
              language="bash"
              code={`curl -X POST http://localhost:8000/rag/ingest \\
  -F "file=@document.pdf"`} />
            <h4 className="text-sm font-medium text-violet-400 mt-4 mb-2">Response:</h4>
            <CodeBlock 
              language="json"
              code={`{
  "success": true,
  "document_id": "doc_abc123",
  "filename": "document.pdf",
  "chunks_created": 25,
  "processing_time_ms": 1250
}`} />
          </div>

          {/* RAG Search Endpoint */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 text-xs font-bold rounded bg-amber-500/20 text-amber-400">POST</span>
              <code className="text-white font-mono text-sm">/rag/search</code>
              <span className="text-neutral-500 text-sm">— Search documents</span>
            </div>
            <h4 className="text-sm font-medium text-violet-400 mb-2">Request Body:</h4>
            <CodeBlock 
              language="json"
              code={`{
  "query": "What is quantum entanglement?",
  "k": 5,
  "threshold": 0.7
}`} />
            <h4 className="text-sm font-medium text-violet-400 mt-4 mb-2">Response:</h4>
            <CodeBlock 
              language="json"
              code={`{
  "results": [
    {
      "chunk_id": "chunk_001",
      "source": "quantum_physics.pdf",
      "content": "Quantum entanglement is...",
      "score": 0.95
    }
  ],
  "search_time_ms": 45
}`} />
          </div>

          {/* Models Endpoint */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 text-xs font-bold rounded bg-emerald-500/20 text-emerald-400">GET</span>
              <code className="text-white font-mono text-sm">/models/</code>
              <span className="text-neutral-500 text-sm">— List available models</span>
            </div>
            <CodeBlock 
              language="json"
              code={`{
  "models": [
    {
      "name": "deepseek-r1:latest",
      "size_human": "5.2 GB",
      "details": { "parameter_size": "8B", "quantization": "Q4_K_M" }
    }
  ],
  "current_model": "deepseek-r1:latest"
}`} />
          </div>

          {/* Switch Model Endpoint */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 text-xs font-bold rounded bg-amber-500/20 text-amber-400">POST</span>
              <code className="text-white font-mono text-sm">/models/switch</code>
              <span className="text-neutral-500 text-sm">— Switch active model</span>
            </div>
            <CodeBlock 
              language="json"
              code={`// Request
{ "model_name": "gemma2:9b" }

// Response
{
  "success": true,
  "previous_model": "deepseek-r1:latest",
  "current_model": "gemma2:9b"
}`} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Error Codes Section
function ErrorCodesSection() {
  const errorCodes = [
    { code: 'VALIDATION_ERROR', status: '400', desc: 'Invalid request format' },
    { code: 'NOT_FOUND', status: '404', desc: 'Resource not found' },
    { code: 'UNSUPPORTED_FILE_TYPE', status: '400', desc: 'File type not supported' },
    { code: 'MODEL_NOT_FOUND', status: '404', desc: 'Ollama model not installed' },
    { code: 'OLLAMA_UNAVAILABLE', status: '503', desc: 'Cannot connect to Ollama' },
    { code: 'RATE_LIMITED', status: '429', desc: 'Too many requests' },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Lock className="w-6 h-6 text-red-400" />
            Error Codes
          </h2>
        </ScrollReveal>

        <div className="overflow-x-auto rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="text-left px-4 py-3 text-neutral-400 font-medium">Code</th>
                <th className="text-left px-4 py-3 text-neutral-400 font-medium">HTTP</th>
                <th className="text-left px-4 py-3 text-neutral-400 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {errorCodes.map((err) => (
                <tr key={err.code}>
                  <td className="px-4 py-3 font-mono text-red-400 text-xs">{err.code}</td>
                  <td className="px-4 py-3 text-neutral-400">{err.status}</td>
                  <td className="px-4 py-3 text-neutral-400">{err.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <h4 className="text-sm font-medium text-white mb-2">Error Response Format:</h4>
          <CodeBlock 
            language="json"
            code={`{
  "detail": {
    "error": "OLLAMA_UNAVAILABLE",
    "message": "Cannot connect to Ollama server at http://localhost:11434",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}`} />
        </div>
      </div>
    </section>
  );
}

// SDK Examples Section
function SDKExamplesSection() {
  return (
    <section className="relative py-12 px-4 sm:px-6 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Terminal className="w-6 h-6 text-indigo-400" />
            SDK Examples
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          {/* Python Example */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="px-2 py-1 text-xs rounded bg-blue-500/20 text-blue-400">Python</span>
            </h3>
            <CodeBlock 
              language="python"
              code={`import httpx

client = httpx.Client(base_url="http://localhost:8000")

# Chat
response = client.post("/chat/", json={
    "message": "Explain AI",
    "use_rag": False
})
print(response.json())

# Ingest document
with open("doc.pdf", "rb") as f:
    response = client.post("/rag/ingest", files={"file": f})
print(response.json())`} />
          </div>

          {/* JavaScript Example */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="px-2 py-1 text-xs rounded bg-amber-500/20 text-amber-400">JavaScript</span>
            </h3>
            <CodeBlock 
              language="javascript"
              code={`// Streaming chat with EventSource
const eventSource = new EventSource('/api/chat?' + new URLSearchParams({
  message: 'Hello!',
  use_rag: 'false'
}));

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.done) {
    console.log('Sources:', data.sources);
    eventSource.close();
  } else {
    process.stdout.write(data.content);
  }
};

// Upload document
const formData = new FormData();
formData.append('file', fileInput.files[0]);
await fetch('/rag/ingest', { method: 'POST', body: formData });`} />
          </div>

          {/* cURL Example */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="px-2 py-1 text-xs rounded bg-emerald-500/20 text-emerald-400">cURL</span>
            </h3>
            <CodeBlock 
              language="bash"
              code={`# Health check
curl http://localhost:8000/health

# Chat
curl -X POST http://localhost:8000/chat/ \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Hello!", "use_rag": false}'

# Ingest document
curl -X POST http://localhost:8000/rag/ingest \\
  -F "file=@document.pdf"

# List models
curl http://localhost:8000/models/`} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Navigation Footer
function NavigationFooter() {
  return (
    <section className="relative py-8 px-4 sm:px-6 border-t border-neutral-800">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/projects/allma-studio/technical"
          className="group inline-flex items-center gap-2 text-neutral-400 hover:text-violet-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Technical
        </Link>
        
        <Link
          href="/projects/allma-studio/deep-dive"
          className="group inline-flex items-center gap-2 text-neutral-400 hover:text-violet-400 transition-colors"
        >
          Deep-Dive
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

export default function AllmaDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#08080c] via-[#0a0a12] to-[#0c0c14] text-white overflow-x-hidden">
      <ScrollProgress />
      
      <div className="fixed inset-0 pointer-events-none">
        <AllmaBackground />
      </div>

      <AllmaPageNav currentPage="docs" />

      <DocsHero />
      <PrerequisitesSection />
      <QuickStartSection />
      <ManualSetupSection />
      <ConfigurationSection />
      <AccessPointsSection />
      <APIReferenceSection />
      <ErrorCodesSection />
      <SDKExamplesSection />
      <NavigationFooter />
    </div>
  );
}
