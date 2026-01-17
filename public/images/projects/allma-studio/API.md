# API Documentation

Complete API reference for Allma Studio backend services.

## Base URL

```
Development: http://localhost:8000
Production:  https://your-domain.com/api
```

## Authentication

Currently, the API does not require authentication for local development. For production deployments, implement API key or OAuth2 authentication.

---

## Table of Contents

- [Health & Status](#health--status)
- [Chat](#chat)
- [RAG (Retrieval-Augmented Generation)](#rag)
- [Models](#models)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## Health & Status

### GET /health

Check system health and component status.

**Request:**
```http
GET /health HTTP/1.1
Host: localhost:8000
```

**Response:**
```json
{
  "status": "healthy",
  "components": {
    "ollama": {
      "status": "connected",
      "host": "http://localhost:11434",
      "model": "deepseek-r1:latest"
    },
    "vector_store": {
      "status": "ready",
      "backend": "chromadb",
      "documents_count": 150
    },
    "database": {
      "status": "connected",
      "type": "sqlite"
    }
  },
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Status Codes:**
| Code | Description |
|------|-------------|
| 200 | All systems operational |
| 503 | One or more components unavailable |

---

## Chat

### POST /chat/

Send a message and receive an AI response.

**Request:**
```http
POST /chat/ HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
  "message": "Explain quantum computing in simple terms",
  "use_rag": false,
  "conversation_id": "550e8400-e29b-41d4-a716-446655440000",
  "stream": true,
  "temperature": 0.7,
  "max_tokens": 2048
}
```

**Request Body:**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `message` | string | ✅ | - | User's message text |
| `use_rag` | boolean | ❌ | `false` | Enable RAG retrieval |
| `conversation_id` | string (UUID) | ❌ | auto-generated | Conversation identifier |
| `stream` | boolean | ❌ | `true` | Enable streaming response |
| `temperature` | float | ❌ | `0.7` | Response creativity (0.0-2.0) |
| `max_tokens` | integer | ❌ | `2048` | Maximum response length |

**Response (Streaming):**

```text
Content-Type: text/event-stream

data: {"content": "Quantum", "done": false}

data: {"content": " computing", "done": false}

data: {"content": " is a type of", "done": false}

data: {"content": "", "done": true, "conversation_id": "550e8400-e29b-41d4-a716-446655440000", "sources": []}

```

**Response (Non-Streaming):**

```json
{
  "content": "Quantum computing is a type of computation that harnesses quantum mechanical phenomena...",
  "conversation_id": "550e8400-e29b-41d4-a716-446655440000",
  "sources": [],
  "model": "deepseek-r1:latest",
  "tokens_used": {
    "prompt": 15,
    "completion": 245,
    "total": 260
  }
}
```

**Response with RAG Sources:**

```json
{
  "content": "Based on your documents, quantum computing...",
  "conversation_id": "550e8400-e29b-41d4-a716-446655440000",
  "sources": [
    {
      "document_id": "doc_123",
      "chunk_id": "chunk_456",
      "source": "quantum_intro.pdf",
      "content": "Quantum computing leverages...",
      "relevance_score": 0.92
    },
    {
      "document_id": "doc_124",
      "chunk_id": "chunk_789",
      "source": "physics_notes.md",
      "content": "Unlike classical bits...",
      "relevance_score": 0.87
    }
  ],
  "model": "deepseek-r1:latest"
}
```

---

### GET /chat/conversations

List all conversations.

**Request:**
```http
GET /chat/conversations?limit=20&offset=0 HTTP/1.1
Host: localhost:8000
```

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 20 | Max conversations to return |
| `offset` | integer | 0 | Pagination offset |

**Response:**
```json
{
  "conversations": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Quantum Computing Discussion",
      "created_at": "2024-01-15T09:00:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z",
      "message_count": 12
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "title": "Python Best Practices",
      "created_at": "2024-01-14T14:00:00.000Z",
      "updated_at": "2024-01-14T15:45:00.000Z",
      "message_count": 8
    }
  ],
  "total": 45,
  "limit": 20,
  "offset": 0
}
```

---

### GET /chat/conversations/{conversation_id}

Get conversation details with messages.

**Request:**
```http
GET /chat/conversations/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Host: localhost:8000
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Quantum Computing Discussion",
  "created_at": "2024-01-15T09:00:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z",
  "messages": [
    {
      "id": "msg_001",
      "role": "user",
      "content": "What is quantum computing?",
      "created_at": "2024-01-15T09:00:00.000Z"
    },
    {
      "id": "msg_002",
      "role": "assistant",
      "content": "Quantum computing is...",
      "created_at": "2024-01-15T09:00:05.000Z",
      "sources": []
    }
  ]
}
```

---

### DELETE /chat/conversations/{conversation_id}

Delete a conversation.

**Request:**
```http
DELETE /chat/conversations/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Host: localhost:8000
```

**Response:**
```json
{
  "success": true,
  "message": "Conversation deleted successfully"
}
```

---

## RAG

### POST /rag/ingest

Upload and process a document for RAG.

**Request:**
```http
POST /rag/ingest HTTP/1.1
Host: localhost:8000
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="document.pdf"
Content-Type: application/pdf

[binary content]
------WebKitFormBoundary--
```

**Supported File Types:**
- `.txt` - Plain text
- `.md` - Markdown
- `.pdf` - PDF documents
- `.docx` - Microsoft Word
- `.html` - HTML files

**Request Parameters (multipart/form-data):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | file | ✅ | Document to ingest |
| `collection` | string | ❌ | Target collection name |
| `chunk_size` | integer | ❌ | Characters per chunk (default: 500) |
| `chunk_overlap` | integer | ❌ | Overlap between chunks (default: 50) |

**Response:**
```json
{
  "success": true,
  "document_id": "doc_abc123",
  "filename": "document.pdf",
  "file_size": 1048576,
  "chunks_created": 25,
  "processing_time_ms": 1250,
  "metadata": {
    "pages": 10,
    "word_count": 5000,
    "language": "en"
  },
  "message": "Document processed successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "UNSUPPORTED_FILE_TYPE",
  "message": "File type .xlsx is not supported",
  "supported_types": [".txt", ".md", ".pdf", ".docx", ".html"]
}
```

---

### POST /rag/ingest/text

Ingest raw text directly.

**Request:**
```http
POST /rag/ingest/text HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
  "text": "Your text content here...",
  "source": "manual_input",
  "metadata": {
    "author": "John Doe",
    "category": "notes"
  }
}
```

**Response:**
```json
{
  "success": true,
  "document_id": "doc_xyz789",
  "chunks_created": 5,
  "message": "Text ingested successfully"
}
```

---

### GET /rag/documents

List all ingested documents.

**Request:**
```http
GET /rag/documents?collection=default HTTP/1.1
Host: localhost:8000
```

**Response:**
```json
{
  "documents": [
    {
      "id": "doc_abc123",
      "filename": "document.pdf",
      "source": "document.pdf",
      "chunks_count": 25,
      "created_at": "2024-01-15T10:00:00.000Z",
      "file_size": 1048576,
      "metadata": {
        "pages": 10,
        "word_count": 5000
      }
    }
  ],
  "total": 10,
  "collection": "default"
}
```

---

### DELETE /rag/documents/{document_id}

Delete an ingested document.

**Request:**
```http
DELETE /rag/documents/doc_abc123 HTTP/1.1
Host: localhost:8000
```

**Response:**
```json
{
  "success": true,
  "chunks_deleted": 25,
  "message": "Document and all chunks deleted successfully"
}
```

---

### POST /rag/search

Search for similar documents.

**Request:**
```http
POST /rag/search HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
  "query": "What is quantum entanglement?",
  "k": 5,
  "collection": "default",
  "threshold": 0.7
}
```

**Request Body:**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `query` | string | ✅ | - | Search query |
| `k` | integer | ❌ | 5 | Number of results |
| `collection` | string | ❌ | "default" | Collection to search |
| `threshold` | float | ❌ | 0.0 | Minimum similarity score |

**Response:**
```json
{
  "query": "What is quantum entanglement?",
  "results": [
    {
      "chunk_id": "chunk_001",
      "document_id": "doc_abc123",
      "source": "quantum_physics.pdf",
      "content": "Quantum entanglement is a phenomenon where two or more particles become interconnected...",
      "score": 0.95,
      "metadata": {
        "page": 5,
        "chunk_index": 12
      }
    },
    {
      "chunk_id": "chunk_002",
      "document_id": "doc_abc123",
      "source": "quantum_physics.pdf",
      "content": "Einstein famously called entanglement 'spooky action at a distance'...",
      "score": 0.89,
      "metadata": {
        "page": 6,
        "chunk_index": 15
      }
    }
  ],
  "total_results": 2,
  "search_time_ms": 45
}
```

---

### GET /rag/collections

List all document collections.

**Request:**
```http
GET /rag/collections HTTP/1.1
Host: localhost:8000
```

**Response:**
```json
{
  "collections": [
    {
      "name": "default",
      "documents_count": 10,
      "chunks_count": 250,
      "created_at": "2024-01-10T00:00:00.000Z"
    },
    {
      "name": "research",
      "documents_count": 5,
      "chunks_count": 150,
      "created_at": "2024-01-12T00:00:00.000Z"
    }
  ]
}
```

---

## Models

### GET /models/

List available Ollama models.

**Request:**
```http
GET /models/ HTTP/1.1
Host: localhost:8000
```

**Response:**
```json
{
  "models": [
    {
      "name": "deepseek-r1:latest",
      "size": 5200000000,
      "size_human": "5.2 GB",
      "modified_at": "2024-01-15T00:00:00.000Z",
      "digest": "sha256:abc123...",
      "details": {
        "format": "gguf",
        "family": "deepseek",
        "parameter_size": "8B",
        "quantization_level": "Q4_K_M"
      }
    },
    {
      "name": "nomic-embed-text:latest",
      "size": 274000000,
      "size_human": "274 MB",
      "modified_at": "2024-01-10T00:00:00.000Z",
      "details": {
        "format": "gguf",
        "family": "nomic",
        "type": "embedding"
      }
    }
  ],
  "current_model": "deepseek-r1:latest"
}
```

---

### POST /models/switch

Switch the active LLM model.

**Request:**
```http
POST /models/switch HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
  "model_name": "gemma2:9b"
}
```

**Response:**
```json
{
  "success": true,
  "previous_model": "deepseek-r1:latest",
  "current_model": "gemma2:9b",
  "message": "Model switched successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "MODEL_NOT_FOUND",
  "message": "Model 'llama4' is not installed. Available models: deepseek-r1:latest, gemma2:9b",
  "available_models": ["deepseek-r1:latest", "gemma2:9b", "qwen2.5-coder:7b"]
}
```

---

### POST /models/pull

Pull a new model from Ollama.

**Request:**
```http
POST /models/pull HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
  "model_name": "llama3.2"
}
```

**Response (Streaming):**
```text
Content-Type: text/event-stream

data: {"status": "pulling", "progress": 0, "total": 2000000000}

data: {"status": "pulling", "progress": 500000000, "total": 2000000000}

data: {"status": "pulling", "progress": 2000000000, "total": 2000000000}

data: {"status": "success", "message": "Model llama3.2 pulled successfully"}

```

---

## Error Handling

### Error Response Format

All errors follow a consistent format:

```json
{
  "detail": {
    "error": "ERROR_CODE",
    "message": "Human-readable error message",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/chat/",
    "request_id": "req_abc123"
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request format |
| `BAD_REQUEST` | 400 | Malformed request |
| `NOT_FOUND` | 404 | Resource not found |
| `UNSUPPORTED_FILE_TYPE` | 400 | File type not supported |
| `FILE_TOO_LARGE` | 413 | File exceeds size limit |
| `MODEL_NOT_FOUND` | 404 | Ollama model not installed |
| `OLLAMA_UNAVAILABLE` | 503 | Cannot connect to Ollama |
| `VECTOR_STORE_ERROR` | 500 | ChromaDB error |
| `INTERNAL_ERROR` | 500 | Unexpected server error |
| `RATE_LIMITED` | 429 | Too many requests |

### Example Error Responses

**Validation Error:**
```json
{
  "detail": {
    "error": "VALIDATION_ERROR",
    "message": "Field 'message' is required",
    "field": "message",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**Ollama Unavailable:**
```json
{
  "detail": {
    "error": "OLLAMA_UNAVAILABLE",
    "message": "Cannot connect to Ollama server at http://localhost:11434. Ensure Ollama is running.",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## Rate Limiting

Default rate limits (configurable):

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/chat/` | 60 requests | 1 minute |
| `/rag/ingest` | 10 requests | 1 minute |
| `/rag/search` | 100 requests | 1 minute |
| `/models/pull` | 5 requests | 10 minutes |

**Rate Limit Headers:**
```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1705315800
```

**Rate Limited Response:**
```json
{
  "detail": {
    "error": "RATE_LIMITED",
    "message": "Rate limit exceeded. Try again in 30 seconds.",
    "retry_after": 30
  }
}
```

---

## WebSocket API

### /ws/chat

Real-time chat with streaming responses.

**Connection:**
```javascript
const ws = new WebSocket('ws://localhost:8000/ws/chat');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'message',
    content: 'Hello, AI!',
    use_rag: false,
    conversation_id: 'optional-uuid'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'token') {
    // Append token to response
    console.log(data.content);
  } else if (data.type === 'done') {
    // Response complete
    console.log('Sources:', data.sources);
  } else if (data.type === 'error') {
    console.error(data.message);
  }
};
```

**Message Types:**

| Type | Direction | Description |
|------|-----------|-------------|
| `message` | Client → Server | Send user message |
| `token` | Server → Client | Streaming token |
| `done` | Server → Client | Response complete |
| `error` | Server → Client | Error occurred |
| `ping` | Both | Keep-alive |

---

## SDK Examples

### Python

```python
import httpx

client = httpx.Client(base_url="http://localhost:8000")

# Chat
response = client.post("/chat/", json={
    "message": "Explain AI",
    "use_rag": False
})
print(response.json())

# Ingest document
with open("doc.pdf", "rb") as f:
    response = client.post(
        "/rag/ingest",
        files={"file": f}
    )
print(response.json())
```

### JavaScript/TypeScript

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});

// Chat
const chat = async (message: string) => {
  const response = await api.post('/chat/', {
    message,
    use_rag: false
  });
  return response.data;
};

// Streaming chat
const streamChat = async (message: string) => {
  const response = await fetch('http://localhost:8000/chat/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, stream: true })
  });
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    console.log(decoder.decode(value));
  }
};
```

### cURL

```bash
# Health check
curl http://localhost:8000/health

# Chat
curl -X POST http://localhost:8000/chat/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!", "use_rag": false}'

# Ingest document
curl -X POST http://localhost:8000/rag/ingest \
  -F "file=@document.pdf"

# List models
curl http://localhost:8000/models/
```
