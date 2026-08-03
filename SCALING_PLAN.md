# Target95+ Scaling Plan

## Technical Scaling Strategy for 100K+ Users

---

## 📚 Table of Contents

1. [Scaling Overview](#scaling-overview)
2. [Question Bank Scaling](#question-bank-scaling)
3. [Database Scaling](#database-scaling)
4. [Performance Optimization](#performance-optimization)
5. [Caching Strategy](#caching-strategy)
6. [Search Infrastructure](#search-infrastructure)
7. [Infrastructure Scaling](#infrastructure-scaling)
8. [Monitoring & Observability](#monitoring--observability)
9. [Cost Optimization](#cost-optimization)

---

## 📈 Scaling Overview

Target95+ must scale from **1,000 students** (current) to **100,000+ students** within 2 years while maintaining <200ms response time and 99.9% uptime.

### Scaling Milestones

```
Phase 1: 1K → 10K users (v1.0 - v1.1)
  - Optimize current architecture
  - Implement caching
  - Database indexing
  - CDN setup

Phase 2: 10K → 50K users (v1.2 - v2.0)
  - Backend migration (custom API)
  - Microservices architecture
  - Advanced caching (Redis)
  - Search optimization

Phase 3: 50K → 100K users (v2.0 - v3.0)
  - Horizontal scaling
  - Multi-region deployment
  - Data warehousing
  - Advanced monitoring
```

### Scaling Principles

```
1. Scale Horizontally
   - Add more servers, not bigger servers
   - Stateless application servers
   - Load balancing

2. Cache Aggressively
   - CDN for static assets
   - Redis for frequent queries
   - Browser caching
   - Application-level caching

3. Optimize Database
   - Indexing strategy
   - Query optimization
   - Read replicas
   - Data archival

4. Monitor Everything
   - Real-time metrics
   - Performance tracking
   - Error tracking
   - User experience monitoring

5. Plan for Failure
   - Redundancy
   - Auto-scaling
   - Circuit breakers
   - Graceful degradation
```

---

## 📝 Question Bank Scaling

### Current State
- 5,000 questions (ICSE/ISC)
- Single Firestore collection
- Basic filtering

### Target State (100K users)
- 100,000+ questions (5+ boards)
- Optimized storage
- Fast search and filtering
- Version control for questions

### Scaling Strategy

#### Question Volume Growth

```
Timeline:
  v1.0 (Jan 2025):  5,000 questions (ICSE/ISC)
  v1.1 (Apr 2025):  15,000 questions (+CBSE)
  v1.2 (Jul 2025):  30,000 questions (+state boards)
  v2.0 (Oct 2025):  75,000 questions (+subjects)
  v3.0 (2026):      150,000+ questions (global)

Growth Rate: 3-4x per year
```

#### Storage Architecture

```
Option 1: Firestore (Current - Up to 50K users)
  - Collections: questions, chapters, subjects
  - Indexing: Composite indexes
  - Cost: $0.18/100K reads
  - Pros: Easy, integrated
  - Cons: Expensive at scale

Option 2: Firestore + Algolia (50K-100K users)
  - Firestore: Source of truth
  - Algolia: Search index
  - Cost: $0.18/100K reads + $49/month (Algolia)
  - Pros: Fast search, scalable
  - Cons: Additional service

Option 3: Custom Backend + PostgreSQL (100K+ users)
  - PostgreSQL: Primary database
  - Elasticsearch: Search
  - Redis: Cache
  - Cost: $500-1000/month
  - Pros: Full control, cost-effective
  - Cons: More complex
```

#### Question Metadata Schema

```javascript
{
  questionId: "q_12345",
  board: "ICSE", // ICSE, ISC, CBSE, UP
  class: "10", // 10, 12
  subject: "Computer Science",
  chapter: "Inheritance",
  topic: "Method Overriding",
  difficulty: "medium", // easy, medium, hard
  type: "mcq", // theory, mcq, programming
  question: "What is method overriding?",
  options: ["A", "B", "C", "D"], // for MCQ
  correctAnswer: "B",
  explanation: "Method overriding allows...",
  marks: 3,
  tags: ["oop", "inheritance", "important"],
  yearAsked: ["2020", "2021", "2023"], // Board exam years
  frequency: 8, // How many times asked
  estimatedTime: 60, // seconds
  hints: ["Hint 1", "Hint 2"],
  relatedQuestions: ["q_12346", "q_12347"],
  createdAt: "2025-01-15",
  updatedAt: "2025-01-15",
  version: 1,
  status: "active" // active, archived, draft
}
```

#### Question Indexing Strategy

```javascript
// Composite indexes for common queries
Index 1: board + class + subject + chapter
  - Use case: Get all questions for a chapter
  - Query: WHERE board='ICSE' AND class=10 AND subject='CS' AND chapter='Inheritance'

Index 2: board + class + difficulty + type
  - Use case: Filter questions by difficulty
  - Query: WHERE board='ICSE' AND class=10 AND difficulty='medium' AND type='mcq'

Index 3: topic + difficulty
  - Use case: Practice specific topic
  - Query: WHERE topic='Method Overriding' AND difficulty='medium'

Index 4: tags + frequency
  - Use case: Get important questions
  - Query: WHERE tags CONTAINS 'important' ORDER BY frequency DESC
```

#### Question Versioning

```
Version Control for Questions:
  - Track changes over time
  - Rollback if needed
  - A/B test variations
  - Quality improvement

Schema:
  questionId: "q_12345"
  version: 3
  history: [
    { version: 1, text: "...", createdAt: "2025-01-01" },
    { version: 2, text: "...", createdAt: "2025-06-01" },
    { version: 3, text: "...", createdAt: "2025-12-01" }
  ]
  currentVersion: 3
```

---

## 🗄️ Database Scaling

### Current State (Firestore)

```
Collections:
  - users (1,000 docs)
  - questions (5,000 docs)
  - progress (10,000 docs)
  - mockTests (5,000 docs)

Performance:
  - Read: 10-50ms
  - Write: 20-100ms
  - Cost: $25/month
```

### Target State (100K users)

```
Collections:
  - users (100,000 docs)
  - questions (100,000 docs)
  - progress (1,000,000 docs)
  - mockTests (500,000 docs)
  - attempts (10,000,000 docs)

Performance:
  - Read: <100ms
  - Write: <200ms
  - Cost: $2,000-3,000/month
```

### Scaling Strategy

#### Phase 1: Firestore Optimization (1K-10K users)

```javascript
// 1. Composite Indexes
// Create indexes for common queries
// - board + class + subject
// - userId + timestamp
// - topic + difficulty

// 2. Query Optimization
// Use indexed queries only
// Avoid collection scans
// Limit result sets

// 3. Data Modeling
// Denormalize for read performance
// Embed frequently accessed data
// Use subcollections wisely

// 4. Caching
// Client-side caching (localStorage)
// Service worker caching
// Firestore offline persistence
```

#### Phase 2: Hybrid Architecture (10K-50K users)

```
Architecture:
  ┌──────────────┐
  │   Client     │
  └──────┬───────┘
         │
    ┌────┴────┐
    │         │
    ↓         ↓
┌───────┐ ┌───────┐
│ CDN   │ │  WAF  │
└───┬───┘ └───┬───┘
    │         │
    ↓         ↓
┌───────┐ ┌───────┐
│  API  │ │ Cache │
│Gateway│ │(Redis)│
└───┬───┘ └───┬───┘
    │         │
    ↓         ↓
┌───────┐ ┌───────┐
│Backend│ │Search │
│(Node) │ │(Algolia)│
└───┬───┘ └───┬───┘
    │         │
    ↓         ↓
┌───────┐ ┌───────┐
│Postgres│ │Firestore│
│(Primary)│ │(Cache) │
└───────┘ └───────┘

Benefits:
  - Fast search (Algolia)
  - Low latency (Redis cache)
  - Cost-effective (PostgreSQL)
  - Scalable (microservices)
```

#### Phase 3: Microservices (50K-100K users)

```
Services:
  1. User Service
     - Authentication
     - Profile management
     - Preferences
  
  2. Content Service
     - Questions
     - Chapters
     - Subjects
  
  3. Progress Service
     - Learning progress
     - Analytics
     - Weakness detection
  
  4. AI Service
     - AI Tutor
     - Recommendations
     - Predictions
  
  5. Gamification Service
     - XP calculation
     - Badges
     - Leaderboards
  
  6. Notification Service
     - Push notifications
     - Email
     - SMS

Database per Service:
  - User Service → PostgreSQL (users)
  - Content Service → PostgreSQL + Algolia (questions)
  - Progress Service → PostgreSQL + BigQuery (analytics)
  - AI Service → PostgreSQL + Pinecone (vectors)
  - Gamification Service → Redis (real-time)
  - Notification Service → Firebase (messaging)
```

### Database Optimization

#### Indexing Strategy

```sql
-- Users table
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_board_class ON users(board, class);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Questions table
CREATE INDEX idx_questions_board_class ON questions(board, class, subject);
CREATE INDEX idx_questions_chapter ON questions(chapter_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty, type);
CREATE INDEX idx_questions_tags ON questions USING GIN(tags);

-- Progress table
CREATE INDEX idx_progress_user ON progress(user_id, created_at);
CREATE INDEX idx_progress_topic ON progress(user_id, topic_id);
CREATE INDEX idx_progress_accuracy ON progress(user_id, accuracy);

-- Mock tests table
CREATE INDEX idx_mocktests_user ON mock_tests(user_id, completed_at);
CREATE INDEX idx_mocktests_type ON mock_tests(type, difficulty);
```

#### Query Optimization

```javascript
// Bad: Full table scan
SELECT * FROM questions WHERE subject = 'Computer Science';

// Good: Indexed query
SELECT * FROM questions 
WHERE board = 'ICSE' AND class = 10 AND subject = 'Computer Science' 
LIMIT 50;

// Bad: N+1 query problem
for (let chapter of chapters) {
  const questions = await getQuestions(chapter.id);
}

// Good: Batch query
const questions = await getQuestions(chapters.map(c => c.id));

// Bad: No pagination
SELECT * FROM attempts WHERE user_id = 123;

// Good: Paginated
SELECT * FROM attempts 
WHERE user_id = 123 
ORDER BY created_at DESC 
LIMIT 50 OFFSET 0;
```

#### Read Replicas

```
Primary Database (Write):
  - User writes
  - Progress updates
  - Mock test results

Read Replicas (Read):
  - Question browsing
  - Analytics queries
  - Leaderboard queries
  - Report generation

Replication:
  - Synchronous (primary → replica)
  - Lag: <1s
  - Load balancer: Route reads to replicas
```

---

## ⚡ Performance Optimization

### Performance Targets

```
Response Time:
  - API calls: <200ms (95th percentile)
  - Page load: <2s (first contentful paint)
  - Question load: <500ms
  - AI response: <3s

Throughput:
  - Concurrent users: 10,000+
  - Requests per second: 1,000+
  - Database queries: 5,000+/second

Availability:
  - Uptime: 99.9% (43 min downtime/month)
  - Error rate: <0.1%
```

### Optimization Techniques

#### Frontend Optimization

```javascript
// 1. Code Splitting
import dynamic from 'next/dynamic';
const Analytics = dynamic(() => import('./Analytics'), { ssr: false });

// 2. Lazy Loading
const Image = ({ src, alt }) => (
  <img src={src} alt={alt} loading="lazy" />
);

// 3. Memoization
const QuestionList = memo(({ questions }) => {
  return questions.map(q => <Question key={q.id} {...q} />);
});

// 4. Virtualization (long lists)
import { FixedSizeList } from 'react-window';
<FixedSizeList height={600} itemCount={1000} itemSize={50}>
  {Row}
</FixedSizeList>

// 5. Service Worker Caching
// Cache static assets
// Cache API responses
// Offline support
```

#### Backend Optimization

```javascript
// 1. Connection Pooling
const pool = new Pool({
  max: 20, // Max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// 2. Query Optimization
// Use prepared statements
const query = 'SELECT * FROM questions WHERE id = $1';
const res = await pool.query(query, [questionId]);

// 3. Batch Operations
// Insert multiple records at once
await db.batchInsert(questions);

// 4. Caching Layer
const getQuestion = async (id) => {
  // Check cache first
  const cached = await redis.get(`question:${id}`);
  if (cached) return JSON.parse(cached);
  
  // Fetch from database
  const question = await db.questions.find(id);
  
  // Cache for 1 hour
  await redis.setex(`question:${id}`, 3600, JSON.stringify(question));
  
  return question;
};
```

#### Database Optimization

```sql
-- 1. Partitioning (large tables)
CREATE TABLE attempts_2025_01 PARTITION OF attempts
FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- 2. Materialized Views (analytics)
CREATE MATERIALIZED VIEW user_stats AS
SELECT 
  user_id,
  COUNT(*) as total_questions,
  AVG(accuracy) as avg_accuracy,
  MAX(streak) as max_streak
FROM attempts
GROUP BY user_id;

-- Refresh every hour
REFRESH MATERIALIZED VIEW user_stats;

-- 3. Archiving (old data)
-- Move old attempts to archive table
INSERT INTO attempts_archive
SELECT * FROM attempts WHERE created_at < NOW() - INTERVAL '1 year';

DELETE FROM attempts WHERE created_at < NOW() - INTERVAL '1 year';
```

---

## 🚀 Caching Strategy

### Multi-Level Caching

```
┌─────────────────────────────────────────┐
│         CACHING LAYERS                   │
└─────────────────────────────────────────┘

Level 1: Browser Cache
  - Static assets (images, CSS, JS)
  - TTL: 7 days
  - Hit rate: 60-70%

Level 2: CDN Cache
  - Static assets
  - API responses (public)
  - TTL: 1 hour
  - Hit rate: 80-90%

Level 3: Application Cache (Redis)
  - Frequent queries
  - Session data
  - TTL: 5 minutes - 1 hour
  - Hit rate: 70-80%

Level 4: Database Cache
  - Query results
  - Connection pooling
  - Hit rate: 50-60%
```

### Caching Policies

#### Static Assets (CDN)

```javascript
// Cache headers
Cache-Control: public, max-age=604800, immutable // 7 days

// Images
/images/* → Cache: 7 days
/css/* → Cache: 7 days
/js/* → Cache: 7 days

// Fonts
/fonts/* → Cache: 30 days
```

#### API Responses (Redis)

```javascript
// Cacheable responses:
  - Questions list: 5 minutes
  - Chapter details: 1 hour
  - Leaderboard: 10 minutes
  - User profile: 15 minutes

// Non-cacheable:
  - User submissions
  - Mock test results
  - Progress updates

// Cache keys:
  question:{id} → 1 hour
  chapter:{id} → 1 hour
  leaderboard:{type} → 10 minutes
  user:{id}:profile → 15 minutes
```

#### Cache Invalidation

```javascript
// Invalidate on update
async function updateQuestion(id, data) {
  // Update database
  await db.questions.update(id, data);
  
  // Invalidate cache
  await redis.del(`question:${id}`);
  await redis.del(`chapter:${data.chapterId}`);
  
  // Update search index
  await algolia.updateObject({
    objectID: id,
    ...data
  });
}

// Batch invalidation
async function invalidateChapter(chapterId) {
  const keys = await redis.keys(`chapter:${chapterId}:*`);
  await redis.del(keys);
}
```

### Cache Warming

```javascript
// Pre-load frequently accessed data
async function warmCache() {
  // Top 100 questions
  const topQuestions = await getTopQuestions(100);
  for (const q of topQuestions) {
    await redis.setex(`question:${q.id}`, 3600, JSON.stringify(q));
  }
  
  // Active chapters
  const chapters = await getActiveChapters();
  for (const ch of chapters) {
    await redis.setex(`chapter:${ch.id}`, 3600, JSON.stringify(ch));
  }
  
  // Leaderboards
  await redis.setex('leaderboard:global', 600, JSON.stringify(await getGlobalLeaderboard()));
}

// Run on server start and every hour
setInterval(warmCache, 3600000);
```

---

## 🔍 Search Infrastructure

### Current State
- Basic Firestore queries
- Limited filtering
- No full-text search

### Target State
- Fast full-text search
- Faceted filtering
- Typo tolerance
- Relevance ranking

### Search Architecture

#### Phase 1: Firestore Search (1K-10K users)

```javascript
// Basic filtering
const questions = await db.collection('questions')
  .where('board', '==', 'ICSE')
  .where('class', '==', 10)
  .where('subject', '==', 'Computer Science')
  .get();

// Limitations:
  - No full-text search
  - No relevance ranking
  - Limited to 10 filters
```

#### Phase 2: Algolia Integration (10K-50K users)

```javascript
// Index questions in Algolia
await algolia.index('questions').saveObject({
  objectID: question.id,
  question: question.text,
  chapter: question.chapter,
  topic: question.topic,
  difficulty: question.difficulty,
  type: question.type,
  tags: question.tags
});

// Search with filters
const results = await algolia.search('inheritance', {
  filters: 'board:ICSE AND class:10',
  hitsPerPage: 20,
  attributesToRetrieve: ['question', 'chapter', 'difficulty']
});

// Features:
  - Full-text search
  - Typo tolerance
  - Faceted filtering
  - Relevance ranking
  - <50ms response time
```

#### Phase 3: Elasticsearch (50K-100K users)

```javascript
// Elasticsearch cluster
{
  "clusters": {
    "questions": {
      "shards": 5,
      "replicas": 2
    }
  }
}

// Advanced search
const results = await es.search({
  index: 'questions',
  body: {
    query: {
      bool: {
        must: [
          { match: { question: 'inheritance' } },
          { match: { board: 'ICSE' } }
        ],
        filter: [
          { range: { difficulty: { gte: 'medium' } } }
        ]
      }
    },
    aggs: {
      chapters: { terms: { field: 'chapter' } },
      topics: { terms: { field: 'topic' } }
    }
  }
});

// Features:
  - Full-text search
  - Faceted search
  - Analytics
  - <100ms response time
  - Scalable to 1M+ documents
```

### Search Features

```
1. Full-Text Search
   - Search across question text
   - Search in explanations
   - Typo tolerance
   - Synonyms

2. Faceted Filtering
   - Board (ICSE, ISC, CBSE)
   - Class (10, 12)
   - Chapter
   - Topic
   - Difficulty
   - Type (theory, MCQ, programming)

3. Relevance Ranking
   - Keyword match
   - Popularity (frequency)
   - Recency
   - User ratings

4. Autocomplete
   - Suggest questions
   - Suggest topics
   - Recent searches
```

---

## 🏗️ Infrastructure Scaling

### Current Infrastructure (Vercel + Firebase)

```
Hosting: Vercel
  - Serverless functions
  - Edge network
  - Auto-scaling

Database: Firestore
  - NoSQL
  - Real-time
  - Auto-scaling

Limitations:
  - Cold starts (serverless)
  - Firestore costs at scale
  - Limited backend logic
```

### Target Infrastructure (100K users)

```
Hosting: AWS / GCP / Azure
  - Load balancer
  - Auto-scaling group
  - Multi-region

Compute:
  - API servers (Node.js)
  - AI servers (Python)
  - Background workers

Database:
  - PostgreSQL (primary)
  - Redis (cache)
  - Algolia (search)
  - BigQuery (analytics)

Storage:
  - S3 / Cloud Storage (files)
  - CloudFront CDN
  - Pinecone (vectors)

Monitoring:
  - Datadog / New Relic
  - Sentry (errors)
  - Google Analytics
```

### Auto-Scaling Strategy

```javascript
// Horizontal scaling
const autoScaling = {
  minInstances: 3,
  maxInstances: 50,
  targetCPU: 70,
  
  scaleUp: {
    triggers: [
      'CPU > 70% for 5 minutes',
      'Request queue > 100',
      'Response time > 500ms'
    ]
  },
  
  scaleDown: {
    triggers: [
      'CPU < 30% for 10 minutes',
      'Request queue < 10',
      'Response time < 200ms'
    ]
  }
};

// Load balancer
const loadBalancer = {
  algorithm: 'round-robin',
  healthCheck: {
    path: '/health',
    interval: 30,
    timeout: 5
  },
  stickySessions: false // Stateless
};
```

### Multi-Region Deployment

```
Regions:
  - Primary: Mumbai (India)
  - Secondary: Singapore (Asia)
  - Tertiary: Virginia (US - diaspora)

Traffic Routing:
  - India → Mumbai
  - Southeast Asia → Singapore
  - US/Europe → Virginia

Data Replication:
  - Primary: Read/Write
  - Secondary: Read-only replica
  - Tertiary: Read-only replica

Latency Targets:
  - India: <50ms
  - Southeast Asia: <100ms
  - US/Europe: <200ms
```

---

## 📊 Monitoring & Observability

### Monitoring Stack

```
Application Monitoring:
  - Datadog / New Relic
  - Response time
  - Error rate
  - Throughput

Infrastructure Monitoring:
  - AWS CloudWatch / GCP Monitoring
  - CPU, memory, disk
  - Network traffic
  - Database performance

Error Tracking:
  - Sentry
  - Stack traces
  - User context
  - Release tracking

Log Management:
  - ELK Stack (Elasticsearch, Logstash, Kibana)
  - Structured logging
  - Log aggregation
  - Search and analysis

Real-Time Analytics:
  - Google Analytics
  - Mixpanel / Amplitude
  - User behavior
  - Conversion tracking
```

### Key Metrics

```
Performance Metrics:
  - Response time (p50, p95, p99)
  - Throughput (requests/second)
  - Error rate (%)
  - Availability (%)

Business Metrics:
  - Daily Active Users (DAU)
  - Weekly Active Users (WAU)
  - Monthly Active Users (MAU)
  - Session duration
  - Feature adoption

Database Metrics:
  - Query time (p50, p95, p99)
  - Connections used
  - Cache hit rate
  - Slow queries

AI Metrics:
  - Response time
  - Accuracy
  - Token usage
  - Cost per query
```

### Alerting

```javascript
const alerts = {
  // Critical (page immediately)
  critical: [
    { metric: 'availability', threshold: '< 99%', action: 'page' },
    { metric: 'error_rate', threshold: '> 1%', action: 'page' },
    { metric: 'response_time_p95', threshold: '> 1000ms', action: 'page' }
  ],
  
  // Warning (Slack notification)
  warning: [
    { metric: 'response_time_p95', threshold: '> 500ms', action: 'slack' },
    { metric: 'cpu_usage', threshold: '> 80%', action: 'slack' },
    { metric: 'db_connections', threshold: '> 80%', action: 'slack' }
  ],
  
  // Info (email digest)
  info: [
    { metric: 'new_signups', threshold: '> 100/day', action: 'email' },
    { metric: 'revenue', threshold: '> ₹1L/day', action: 'email' }
  ]
};
```

---

## 💰 Cost Optimization

### Cost Breakdown (100K users)

```
Infrastructure:
  - Hosting (AWS/Vercel): ₹50,000/month
  - Database (PostgreSQL + Redis): ₹30,000/month
  - Search (Algolia): ₹20,000/month
  - CDN (CloudFront): ₹10,000/month
  - Storage (S3): ₹5,000/month
  - Monitoring (Datadog): ₹15,000/month
  Total: ₹1,30,000/month

AI/ML:
  - LLM API (GPT-4): ₹80,000/month
  - Vector DB (Pinecone): ₹10,000/month
  - Speech/OCR APIs: ₹10,000/month
  Total: ₹1,00,000/month

Third-Party:
  - Firebase (Auth, Messaging): ₹5,000/month
  - Email (SendGrid): ₹3,000/month
  - SMS (Twilio): ₹5,000/month
  Total: ₹13,000/month

Grand Total: ₹2,43,000/month (~$3,000/month)
```

### Cost Optimization Strategies

#### 1. Caching

```
Before:
  - 1M database queries/day
  - Cost: ₹60,000/month

After:
  - 100K database queries/day (90% cache hit)
  - Cost: ₹6,000/month
  - Savings: ₹54,000/month
```

#### 2. Query Optimization

```
Before:
  - 10,000 slow queries/day (>500ms)
  - Database load: 80%

After:
  - 500 slow queries/day (95% reduction)
  - Database load: 40%
  - Savings: ₹20,000/month (smaller DB)
```

#### 3. AI Cost Optimization

```
Before:
  - GPT-4 for all queries
  - Cost: ₹1,50,000/month

After:
  - GPT-3.5 for simple queries (80%)
  - GPT-4 for complex queries (20%)
  - Cost: ₹60,000/month
  - Savings: ₹90,000/month
```

#### 4. Storage Optimization

```
Before:
  - 10TB storage
  - Cost: ₹20,000/month

After:
  - 2TB hot storage (S3)
  - 8TB cold storage (Glacier)
  - Cost: ₹8,000/month
  - Savings: ₹12,000/month
```

### Total Savings: ₹1,76,000/month (72% reduction)

---

## 🔮 Future Scaling (2026+)

### 1M+ Users Architecture

```
Users: 1,000,000+
Questions: 1,000,000+
Daily Active Users: 300,000+
Requests/second: 10,000+

Infrastructure:
  - 100+ API servers
  - 10+ database servers
  - 5+ search nodes
  - Multi-region (5+ regions)
  - Cost: ₹10-15 lakhs/month

Technology:
  - Kubernetes (orchestration)
  - Kafka (event streaming)
  - Spark (data processing)
  - TensorFlow (ML at scale)
```

### Global Scaling

```
Regions:
  - India (Mumbai, Bangalore)
  - Southeast Asia (Singapore)
  - Middle East (Dubai)
  - US (Virginia, California)
  - Europe (London)

CDN:
  - CloudFront / Cloudflare
  - 200+ edge locations
  - <50ms latency globally

Data Residency:
  - India data → India servers
  - EU data → EU servers
  - US data → US servers
```

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Status**: Scaling Plan Complete - Ready for Implementation