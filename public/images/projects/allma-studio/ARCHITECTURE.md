# Architecture

This document provides a deep dive into the architecture of Allma Studio, explaining the design decisions, component interactions, and data flows.

## Table of Contents

- [System Overview](#system-overview)
- [Backend Architecture](#backend-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Data Flow](#data-flow)
- [Service Layer](#service-layer)
- [Database Design](#database-design)
- [Security Architecture](#security-architecture)

---

## System Overview

Allma Studio follows a **microservices-inspired monolith** architecture, where the application is structured as independent services but deployed as a single unit. This provides the benefits of clean separation while avoiding the complexity of distributed systems.

<div align="center">

![System Architecture](../diagrams/architecture-diagram.jpg)

*High-level system architecture showing component interactions*

</div>

**Key Components:**

| Layer | Technology | Responsibility |
|-------|------------|----------------|
| Frontend | React + Vite | User interface, API communication |
| API Gateway | FastAPI | Request routing, validation, CORS |
| Orchestrator | Python | Service coordination, business logic |
| Services | Python async | Domain-specific operations |
| Vector Store | ChromaDB | Embedding storage and similarity search |
| LLM Runtime | Ollama | Local model inference |

---

## Backend Architecture

### Layer Overview

The backend follows a **layered architecture** with clear separation of concerns:

```
┌────────────────────────────────────────────────┐
│              Presentation Layer                │
│         (Routes / API Endpoints)               │
├────────────────────────────────────────────────┤
│              Orchestration Layer               │
│         (Business Logic Coordinator)           │
├────────────────────────────────────────────────┤
│               Service Layer                    │
│     (Domain-Specific Business Logic)           │
├────────────────────────────────────────────────┤
│               Data Access Layer                │
│    (Database, Vector Store, External APIs)     │
└────────────────────────────────────────────────┘
```

### Component Details

#### 1. Presentation Layer (Routes)

Located in `orchestration/routes/`, each route file handles HTTP concerns:

| File | Responsibility |
|------|----------------|
| `chat.py` | Chat message handling, streaming responses |
| `rag.py` | Document ingestion, RAG queries |
| `models.py` | Ollama model management |
| `health.py` | System health checks |

**Pattern:**
```python
router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/")
async def send_message(
    request: ChatRequest,
    orchestrator: Orchestrator = Depends(get_orchestrator)
):
    return await orchestrator.handle_chat(request)
```

#### 2. Orchestration Layer

The `Orchestrator` class (`orchestration/orchestrator.py`) is the **central coordinator**:

- Receives requests from routes
- Coordinates between multiple services
- Handles cross-cutting concerns
- Returns unified responses

**Key Methods:**
```python
class Orchestrator:
    async def handle_chat(self, request) -> AsyncGenerator:
        """Coordinate chat with optional RAG"""
        
    async def ingest_document(self, file) -> OrchestrationResult:
        """Coordinate document processing"""
        
    async def search_similar(self, query) -> List[Document]:
        """Coordinate similarity search"""
```

#### 3. Service Layer

Each service handles a specific domain:

| Service | Responsibility |
|---------|----------------|
| `RAGService` | Embeddings, retrieval, reranking |
| `DocumentService` | File parsing, text chunking |
| `VectorStoreService` | ChromaDB operations |
| `ConversationService` | Chat history management |

**Service Pattern:**
```python
class RAGService:
    async def initialize(self):
        """Async initialization"""
        
    async def embed_text(self, text: str) -> List[float]:
        """Generate embeddings via Ollama"""
        
    async def retrieve(self, query: str, k: int = 5) -> List[Document]:
        """Retrieve relevant documents"""
```

---

## Frontend Architecture

### Component Hierarchy

```
App.jsx
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── ModelSelector
│   │   └── ThemeToggle
│   ├── Sidebar
│   │   ├── ConversationList
│   │   └── NewChatButton
│   └── MainContent
│       └── ChatInterface
│           ├── MessageList
│           │   ├── UserMessage
│           │   └── AssistantMessage
│           │       └── MarkdownRenderer
│           ├── InputArea
│           │   ├── TextInput
│           │   ├── FileUpload
│           │   └── SendButton
│           └── RAGToggle
└── Modals
    ├── SettingsModal
    └── DocumentModal
```

### State Management

Using React hooks for state management:

```
┌─────────────────────────────────────────────────────────┐
│                    App State (Context)                  │
├─────────────────────────────────────────────────────────┤
│  • currentModel: string                                 │
│  • theme: 'light' | 'dark'                             │
│  • isBackendAvailable: boolean                         │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│               Custom Hooks (Local State)                │
├─────────────────────────────────────────────────────────┤
│  useChat()                                              │
│  • messages: Message[]                                  │
│  • isLoading: boolean                                   │
│  • sendMessage: (text) => void                         │
├─────────────────────────────────────────────────────────┤
│  useConversations()                                     │
│  • conversations: Conversation[]                        │
│  • activeId: string                                    │
│  • selectConversation: (id) => void                    │
├─────────────────────────────────────────────────────────┤
│  useModels()                                            │
│  • models: Model[]                                      │
│  • currentModel: string                                │
│  • switchModel: (name) => void                         │
└─────────────────────────────────────────────────────────┘
```

### API Service Layer

```
src/services/
├── api.js          # Main API client with demo fallback
└── demoApi.js      # Simulated responses for demo mode
```

**Auto-Fallback Pattern:**
```javascript
// api.js
let isBackendAvailable = null;

export async function checkBackendAvailable() {
  try {
    await axios.get(`${API_URL}/health`, { timeout: 3000 });
    isBackendAvailable = true;
  } catch {
    isBackendAvailable = false;
  }
  return isBackendAvailable;
}

export async function sendMessage(message, useRag) {
  if (!isBackendAvailable) {
    return demoApi.sendMessage(message, useRag);
  }
  return axios.post(`${API_URL}/chat/`, { message, use_rag: useRag });
}
```

---

## Data Flow

### RAG Implementation Architecture

<div align="center">

![RAG Implementation Architecture](../diagrams/RAG_Implementation_Architecture_Diagram.jpg)

*Complete RAG pipeline showing query processing through response generation*

</div>

The RAG pipeline follows this flow:

1. **Query Input**: User submits a question
2. **Embedding**: Query converted to vector via Nomic Embed Text
3. **Similarity Search**: ChromaDB finds relevant document chunks
4. **Context Assembly**: Top-k results assembled into context
5. **Prompt Augmentation**: Context injected into LLM prompt
6. **Generation**: Ollama generates response with sources

### Document Ingestion Pipeline

<div align="center">

![RAG Ingestion Pipeline](../diagrams/RAG_ingestion_Diagram.png)

*Document processing from upload to vector storage*

</div>

**Ingestion Stages:**

| Stage | Component | Description |
|-------|-----------|-------------|
| Load | DocumentService | Parse PDF, DOCX, MD, TXT, HTML, JSON, CSV |
| Extract | TextSplitter | Extract text with metadata preservation |
| Chunk | TextSplitter | Split into overlapping chunks (default: 1000 chars, 200 overlap) |
| Embed | RAGService | Generate embeddings via Ollama API |
| Store | VectorStoreService | Persist to ChromaDB with metadata |

### Entity Relationships

<div align="center">

![Entity Relationship Diagram](../diagrams/Entity_Relationship_Diagram.png)

*Data model showing relationships between entities*

</div>

**Key Relationships:**
- **Document** (1) → (N) **Chunks**: Documents split for embedding
- **Chunk** (1) → (1) **Embedding**: Each chunk has one vector
- **Conversation** (1) → (N) **Messages**: Chat history
- **Message** (N) → (N) **Sources**: RAG source references

---

## Service Layer

### RAGService

Handles all RAG-related operations:

```python
class RAGService:
    """
    Retrieval-Augmented Generation Service
    
    Responsibilities:
    - Generate embeddings via Ollama
    - Retrieve relevant documents
    - Rerank results for relevance
    - Build context for LLM
    """
    
    async def embed_text(self, text: str) -> List[float]:
        """Generate embedding vector for text"""
        response = await self.ollama_client.post("/api/embeddings", {
            "model": self.embedding_model,
            "prompt": text
        })
        return response["embedding"]
    
    async def retrieve(self, query: str, k: int = 5) -> List[Document]:
        """Retrieve k most similar documents"""
        query_embedding = await self.embed_text(query)
        return await self.vector_store.similarity_search(query_embedding, k)
    
    def build_context(self, documents: List[Document]) -> str:
        """Format documents into LLM context"""
        return "\n\n".join([
            f"[Source: {doc.metadata.get('source', 'unknown')}]\n{doc.content}"
            for doc in documents
        ])
```

### DocumentService

Handles document processing:

```python
class DocumentService:
    """
    Document Processing Service
    
    Responsibilities:
    - Parse various file formats
    - Split documents into chunks
    - Extract metadata
    """
    
    SUPPORTED_FORMATS = ['.txt', '.md', '.pdf', '.docx']
    
    async def parse_document(self, file: UploadFile) -> str:
        """Extract text from uploaded file"""
        
    def chunk_text(self, text: str, chunk_size: int = 500) -> List[Chunk]:
        """Split text into overlapping chunks"""
        
    def extract_metadata(self, file: UploadFile) -> Dict:
        """Extract file metadata"""
```

### VectorStoreService

Manages ChromaDB operations:

```python
class VectorStoreService:
    """
    Vector Store Service (ChromaDB)
    
    Responsibilities:
    - Initialize and manage ChromaDB client
    - Store document embeddings
    - Perform similarity searches
    - Handle persistence
    """
    
    async def add_documents(self, documents: List[Document]) -> None:
        """Store documents with embeddings"""
        
    async def similarity_search(
        self, 
        embedding: List[float], 
        k: int = 5
    ) -> List[Document]:
        """Find k most similar documents"""
        
    async def delete_collection(self, collection_name: str) -> None:
        """Remove a document collection"""
```

---

## Database Design

### SQLite (Conversation Storage)

```sql
-- Conversations Table
CREATE TABLE conversations (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages Table
CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL,
    role TEXT NOT NULL,  -- 'user' | 'assistant'
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

-- RAG Sources Table (for message context)
CREATE TABLE message_sources (
    id TEXT PRIMARY KEY,
    message_id TEXT NOT NULL,
    document_id TEXT NOT NULL,
    chunk_id TEXT NOT NULL,
    relevance_score REAL,
    FOREIGN KEY (message_id) REFERENCES messages(id)
);
```

### ChromaDB (Vector Storage)

```
Collection: documents
├── Embeddings: float[768]  (nomic-embed-text dimensions)
├── Documents: string       (chunk content)
└── Metadata:
    ├── source: string      (filename)
    ├── chunk_index: int    (position in document)
    ├── created_at: string  (timestamp)
    └── doc_id: string      (parent document ID)
```

---

## Security Architecture

### API Security

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                      │
├─────────────────────────────────────────────────────────┤
│  1. CORS Policy                                         │
│     • Configurable allowed origins                      │
│     • Preflight request handling                        │
├─────────────────────────────────────────────────────────┤
│  2. Rate Limiting                                       │
│     • Per-IP request limits                            │
│     • Configurable thresholds                          │
├─────────────────────────────────────────────────────────┤
│  3. Input Validation                                    │
│     • Pydantic model validation                        │
│     • File type restrictions                           │
│     • Size limits                                      │
├─────────────────────────────────────────────────────────┤
│  4. Error Handling                                      │
│     • Sanitized error messages                         │
│     • No stack traces in production                    │
└─────────────────────────────────────────────────────────┘
```

### Container Security

```dockerfile
# Non-root user
RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 appuser
USER appuser

# Read-only filesystem
--read-only

# No new privileges
--security-opt=no-new-privileges:true

# Resource limits
--memory=2g
--cpus=1
```

### Data Privacy

- **Zero Telemetry**: No data collection or phone-home
- **Local Processing**: All LLM inference happens locally
- **User Data Control**: Data stored locally, easily deletable
- **No Cloud Dependencies**: Works fully offline

---

## Performance Considerations

### Caching Strategy

```
┌─────────────────────────────────────────────────────────┐
│                   Caching Layers                        │
├─────────────────────────────────────────────────────────┤
│  L1: In-Memory Cache                                    │
│      • Embedding cache (LRU, 1000 items)               │
│      • Model info cache (TTL: 5 minutes)               │
├─────────────────────────────────────────────────────────┤
│  L2: ChromaDB Cache                                     │
│      • Persisted vectors                               │
│      • SQLite-backed                                   │
├─────────────────────────────────────────────────────────┤
│  L3: Response Cache (Future)                            │
│      • Repeated query caching                          │
│      • Configurable TTL                                │
└─────────────────────────────────────────────────────────┘
```

### Async Operations

All I/O operations are async for maximum concurrency:

```python
# Parallel embedding generation
embeddings = await asyncio.gather(*[
    self.embed_text(chunk) for chunk in chunks
])

# Parallel file operations
results = await asyncio.gather(
    self.save_to_db(document),
    self.store_vectors(embeddings),
    self.update_metadata(doc_id)
)
```

---

## Extension Points

### Adding New LLM Providers

1. Create new service in `services/`:
```python
class CloudLLMService:
    async def generate(self, prompt: str) -> AsyncGenerator[str, None]:
        """Stream response from cloud provider"""
```

2. Register in Orchestrator
3. Add configuration to `config.py`

### Adding New Document Types

1. Add parser to `DocumentService`:
```python
def parse_xlsx(self, file: UploadFile) -> str:
    """Parse Excel files"""
```

2. Update `SUPPORTED_FORMATS`
3. Add handling in route

### Adding New Vector Stores

1. Implement `VectorStoreBackend` ABC:
```python
class FaissBackend(VectorStoreBackend):
    async def add(self, embeddings, documents): ...
    async def search(self, embedding, k): ...
```

2. Configure in `config.py`
