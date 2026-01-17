# Documentation Index

Welcome to Allma Studio documentation. This directory contains comprehensive guides for all aspects of the project.

## Organization

### Core Documentation
- [README](../README.md) - Project overview and quick start
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [LICENSE](../LICENSE) - MIT License

### Architecture & Design
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture and design patterns
- [API.md](API.md) - Complete API reference and examples

### Deployment & Operations
- [DEPLOYMENT.md](../DEPLOYMENT.md) - Deployment guides for all platforms

### Backend Documentation
- [Backend Guide](backend/ORCHESTRATION.md) - Backend architecture and services

### Frontend Documentation
- [Design System](frontend/DESIGN_SYSTEM.md) - UI/UX design principles
- [Component Reference](frontend/COMPONENT_REFERENCE.md) - React components

### Getting Started Guides
- [Quick Start Guide](guides/QUICK_START.md) - Fast setup instructions

## Project Structure

```
docs/
├── INDEX.md                          (this file)
├── ARCHITECTURE.md                   (system architecture)
├── API.md                            (API reference)
├── backend/
│   └── ORCHESTRATION.md             (backend services)
├── frontend/
│   ├── DESIGN_SYSTEM.md             (design principles)
│   └── COMPONENT_REFERENCE.md       (React components)
├── deployment/
│   └── DEPLOYMENT.md                (cloud deployment)
└── guides/
    └── QUICK_START.md               (setup guide)
```

## Quick Links

### For Users
- Start here: [README](../README.md)
- Quick setup: [Quick Start Guide](guides/QUICK_START.md)
- API usage: [API Reference](API.md)

### For Developers
- System design: [Architecture](ARCHITECTURE.md)
- Backend services: [Orchestration Guide](backend/ORCHESTRATION.md)
- Frontend components: [Component Reference](frontend/COMPONENT_REFERENCE.md)
- UI/UX design: [Design System](frontend/DESIGN_SYSTEM.md)

### For DevOps/Operators
- Deployment: [Deployment Guide](../DEPLOYMENT.md)
- Configuration: See [README Configuration](../README.md#configuration)
- Health checks: See [API Reference - Health](API.md#health-status)

## Key Topics

### Getting Started
1. [Installation](../README.md#installation)
2. [Configuration](../README.md#configuration)
3. [Quick Start](guides/QUICK_START.md)

### API Integration
1. [API Overview](API.md)
2. [Chat Endpoint](API.md#chat)
3. [RAG Endpoint](API.md#rag)
4. [Model Management](API.md#models)

### Deployment
1. [Docker Compose](../DEPLOYMENT.md)
2. [Kubernetes](../DEPLOYMENT.md)
3. [Cloud Platforms](../README.md#deployment)

### Development
1. [Backend Architecture](ARCHITECTURE.md#backend-architecture)
2. [Frontend Architecture](ARCHITECTURE.md#frontend-architecture)
3. [Contributing Guidelines](../CONTRIBUTING.md)

## Important Notes

- All endpoints require Ollama to be running locally
- Default models: `deepseek-r1:latest` for LLM, `nomic-embed-text` for embeddings
- The application works offline once models are downloaded
- No telemetry or external API calls by default

## Getting Help

- Check the relevant documentation section above
- Review [API examples](API.md#sdk-examples)
- See [Contributing guidelines](../CONTRIBUTING.md) for development questions
- Visit GitHub issues for bug reports

---

Last Updated: January 2026
