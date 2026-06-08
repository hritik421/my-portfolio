export const blogDetails = {
  "url-shortener-system-design": {
    lead: [
      "I've been building distributed systems for 3 years. Redis caching. Kubernetes. PostgreSQL at scale.",
      "Yet when I sat down to design a URL Shortener - one of the most basic system design problems - something unexpected happened.",
      "Not confusion. Clarity. Every decision I'd made in production suddenly had a name and a reason.",
    ],
    sections: [
      {
        title: "What is a URL Shortener?",
        paragraphs: [
          "A URL Shortener takes a long URL and returns a compact short URL. When someone visits the short URL, they get redirected to the original.",
          "Simple to use. Interesting to design.",
        ],
        codeBlocks: [
          {
            label: "Long URL",
            code: "https://www.amazon.com/very/long/product/url?ref=xyz&tag=abc&source=google",
          },
          {
            label: "Short URL",
            code: "https://bit.ly/3xK9mP",
          },
        ],
      },
      {
        title: "Step 1 - Requirements",
        paragraphs: [
          "Before touching architecture, clarify what the system actually needs to do.",
        ],
        listGroups: [
          {
            label: "Functional Requirements",
            items: [
              "User provides long URL and system returns a unique short URL",
              "Visiting short URL redirects to long URL",
              "User can track how many times URL was clicked",
              "Same long URL can have multiple unique short codes (each user gets their own)",
            ],
          },
          {
            label: "Non-Functional Requirements",
            items: [
              "High availability - URL shortener must never go down",
              "Low latency redirects - under 100ms",
              "Scalable to 100M URLs created per day",
            ],
          },
        ],
      },
      {
        title: "Step 2 - Scale Estimation",
        paragraphs: [
          "This is where most engineers skip ahead. Do not. The numbers justify every decision after.",
        ],
        codeBlocks: [
          {
            code:
              "Given:\n100 million URLs shortened per day\nRead:Write ratio = 100:1\n\nWrites per second:\n100M / (24 x 60 x 60) = ~1,000 writes/sec\n\nReads per second:\n1,000 x 100 = 100,000 reads/sec\n\nStorage for 5 years:\n1 URL record ~= 500 bytes\n100M x 365 x 5 x 500 bytes ~= 91 TB",
          },
        ],
        numbered: [
          "Read:Write ratio is 100:1, so this system is massively read-heavy.",
          "At 100,000 reads/second, we cannot afford to hit the database for every redirect.",
        ],
      },
      {
        title: "Step 3 - API Design",
        codeBlocks: [
          {
            code:
              "POST /shorten\nBody: { longURL: \"https://amazon.com/...\" }\nResponse: { shortURL: \"https://bit.ly/dnh3K2p\" }\n\nGET /{shortCode}\nResponse: 302 redirect to longURL",
          },
        ],
      },
      {
        title: "The 301 vs 302 Decision",
        paragraphs: [
          "When a user visits bit.ly/dnh3K2p, the HTTP status code changes your system behavior.",
        ],
        decisionCards: [
          {
            title: "301 - Moved Permanently",
            bullets: [
              "Browser caches this redirect",
              "Your server may not see future repeat visits",
              "Lower server load, but weaker analytics",
            ],
          },
          {
            title: "302 - Found (Temporary Redirect)",
            bullets: [
              "Browser does not permanently cache this",
              "Every visit reaches your service",
              "Full click analytics, at higher server load",
            ],
          },
        ],
        paragraphsAfter: [
          "Our requirement says we must track click counts, so 302 is the right choice.",
        ],
      },
      {
        title: "Step 4 - Architecture",
        codeBlocks: [
          {
            code:
              "User -> Load Balancer -> URL Service -> Redis Cache\n                                         |\n                                   Cache MISS\n                                         |\n                                   PostgreSQL DB",
          },
          {
            label: "Read latency without cache",
            code:
              "1 request x 10ms DB read = 10ms\n100,000 req/sec x 10ms = not sustainable",
          },
          {
            label: "Read latency with Redis",
            code:
              "1 request x 0.1ms Redis read = 0.1ms\n100,000 req/sec x 0.1ms = fast",
          },
        ],
        paragraphs: [
          "The 100:1 read ratio makes Redis essential, not optional.",
        ],
      },
      {
        title: "Step 5 - The Core Algorithm",
        paragraphs: [
          "How do we generate short codes like dnh3K2p?",
        ],
        decisionCards: [
          {
            title: "Approach 1: Hash the long URL",
            bullets: [
              "Hash and truncate is simple",
              "But truncation can create collisions",
              "Collision handling adds complexity and risk",
            ],
          },
          {
            title: "Approach 2: Base62 Encoding (chosen)",
            bullets: [
              "Character set: a-z + A-Z + 0-9 = 62",
              "62^7 ~= 3.5 trillion unique values",
              "Enough for 182 billion URLs over 5 years at 100M/day",
            ],
          },
        ],
        codeBlocks: [
          {
            label: "Generation flow",
            code:
              "1. Save longURL to DB\n2. DB returns auto-increment ID (e.g. 12345)\n3. Base62(12345) = \"dnh3K2p\"\n4. Save shortCode to same DB row\n5. Cache shortCode -> longURL in Redis\n6. Return bit.ly/dnh3K2p",
          },
        ],
        paragraphsAfter: [
          "Auto-increment IDs are already unique, so Base62 codes generated from them are collision-free.",
        ],
      },
      {
        title: "Step 6 - Database Schema",
        codeBlocks: [
          {
            code:
              "CREATE TABLE urls (\n  id            BIGSERIAL PRIMARY KEY,\n  long_url      TEXT NOT NULL,\n  short_code    VARCHAR(7) UNIQUE NOT NULL,\n  created_by    UUID REFERENCES users(id),\n  created_at    TIMESTAMP DEFAULT NOW(),\n  expires_at    TIMESTAMP,\n  click_count   BIGINT DEFAULT 0\n);\n\nCREATE INDEX idx_short_code ON urls(short_code);",
          },
        ],
        paragraphs: [
          "The short_code index is critical because every redirect is a lookup by short_code.",
        ],
      },
      {
        title: "Complete Redirect Flow",
        codeBlocks: [
          {
            code:
              "User visits bit.ly/dnh3K2p\n        |\n        v\nCheck Redis: key = dnh3K2p\n        |\n        +-- HIT  -> increment click_count (async)\n        |          return 302 redirect ~1ms\n        |\n        +-- MISS -> query PostgreSQL\n                   cache result in Redis\n                   increment click_count (async)\n                   return 302 redirect ~12ms",
          },
        ],
        paragraphs: [
          "Click updates should be async so redirect latency stays low.",
        ],
      },
      {
        title: "What This Taught Me",
        paragraphs: [
          "Designing this on paper forced me to justify each architectural choice with numbers, not intuition.",
          "That is the difference between building systems and designing systems.",
          "Interviews are less about naming tools and more about proving why each choice fits the workload.",
        ],
      },
      {
        title: "Key Takeaways",
        table: {
          headers: ["Decision", "Choice", "Why"],
          rows: [
            ["Redirect type", "302", "Need click analytics"],
            ["Short code generation", "Base62(DB ID)", "No collisions"],
            ["Read storage", "Redis", "100:1 read ratio"],
            ["Write storage", "PostgreSQL", "ACID + indexed lookups"],
            ["Click tracking", "Async queue", "Do not block redirect"],
          ],
        },
      },
    ],
    closing: [
      "Next up: Pastebin, Rate Limiter, and Twitter Feed Design.",
    ],
  },
  "whatsapp-system-design": {
    lead: [
      "WhatsApp serves over 2 billion users, handling 100 billion messages per day.",
      "Designing a system at this scale isn't just an engineering challenge — it's an exercise in making the right tradeoffs between consistency, availability, latency, and cost.",
      "In this post, I walk through the core architectural decisions behind a WhatsApp-scale messaging system, the way I'd approach it in a system design interview, and the tradeoffs I'd defend.",
    ],
    sections: [
      {
        title: "Functional Requirements",
        listGroups: [
          {
            label: "Core Features",
            items: [
              "One-to-one messaging (text, media, voice notes)",
              "Group messaging (up to 1024 members)",
              "Online/last seen indicators",
              "Message delivery receipts (sent ✓, delivered ✓✓, read ✓✓ in blue)",
              "Push notifications for offline users",
            ],
          },
        ],
      },
      {
        title: "Scale Estimates",
        table: {
          headers: ["Metric", "Estimate"],
          rows: [
            ["DAU", "500M"],
            ["Messages/day", "100B"],
            ["Messages/sec (peak)", "~1.5M"],
            ["Avg message size", "1 KB"],
            ["Storage/day", "~100 TB"],
          ],
        },
        paragraphsAfter: [
          "This tells us immediately: we need a horizontally scalable message store, not a traditional relational DB as the hot path.",
        ],
      },
      {
        title: "High-Level Architecture",
        paragraphs: [
          "The system has five core planes:",
        ],
        listGroups: [
          {
            label: "Core Services",
            items: [
              "Connection Layer — WebSocket servers maintaining persistent connections per user",
              "Message Service — stateless, routes and persists messages",
              "Presence Service — tracks online/offline status (deliberately separated from WebSocket servers)",
              "Notification Service — pushes to offline users via APNS/FCM",
              "Media Service — upload/download via pre-signed URLs with CDN",
            ],
          },
        ],
        paragraphsAfter: [
          "Key architectural decision: The Presence Service is a separate service from the WebSocket server. Co-locating presence with WebSocket seems natural, but it creates tight coupling. A dedicated Presence Service backed by Redis gives us sub-millisecond reads, horizontal scalability, and the ability to deploy/scale it independently.",
        ],
      },
      {
        title: "Message Flow (1-to-1)",
        codeBlocks: [
          {
            code: "Sender → WebSocket Server → Message Service → Cassandra (persist)\n                                            → Presence Service (is recipient online?)\n                                              ├── YES → WebSocket Server (recipient) → Deliver\n                                              └── NO  → Notification Service → Push",
          },
        ],
        paragraphsAfter: [
          "Delivery receipts flow in reverse: when the recipient's client acknowledges receipt, a receipt event travels back through the WebSocket layer and updates the sender's UI.",
        ],
      },
      {
        title: "Database Design — Why Cassandra?",
        paragraphs: [
          "Messages are write-heavy, append-only, and accessed by (conversation_id, timestamp) — a perfect fit for Cassandra's partition-key model. We never update messages (edits are new records); we rarely do range queries outside a single conversation.",
        ],
        codeBlocks: [
          {
            label: "Messages table schema",
            code: "messages_by_conversation:\n  partition_key: conversation_id\n  clustering_key: message_id (ULID — sortable + unique)\n  columns: sender_id, content, type, status, created_at",
          },
        ],
        paragraphsAfter: [
          "For user metadata (contacts, profile) and group membership, PostgreSQL works fine — these are low-write, relational datasets.",
        ],
      },
      {
        title: "Group Messaging: Fan-out Strategy",
        paragraphs: [
          "This is where scale bites. For a group of 1024 members, a naive \"write to every member's inbox\" approach means 1024 writes per message.",
        ],
        decisionCards: [
          {
            title: "Fan-out on Write (small groups < 50)",
            bullets: [
              "Write message to each member's inbox",
              "Fast reads — messages already in each user's queue",
              "Acceptable write amplification for small groups",
            ],
          },
          {
            title: "Fan-out on Read (large groups — chosen)",
            bullets: [
              "Store one copy in group_messages table",
              "Each member pulls using last_seen_message_id cursor",
              "Unread counts in Redis per (user_id, group_id)",
              "Drastically lower write amplification",
            ],
          },
        ],
        paragraphsAfter: [
          "This hybrid model is a deliberate tradeoff: slightly higher read latency for large groups, but drastically lower write amplification.",
        ],
      },
      {
        title: "Presence Service Deep Dive",
        paragraphs: [
          "Presence is deceptively hard. Naive polling kills your database. Event-driven updates with TTL-based expiry in Redis is the right model:",
        ],
        codeBlocks: [
          {
            label: "Presence lifecycle",
            code: "On WebSocket connect: SET presence:{user_id} online EX 60\nHeartbeat every 30s: refreshes the TTL\nOn disconnect: key expires naturally (no explicit delete — handles crashes cleanly)\nlast_seen timestamp: written to PostgreSQL asynchronously on disconnect",
          },
        ],
        paragraphsAfter: [
          "Tradeoff acknowledged: Presence has eventual consistency. A user who just closed the app might show as \"online\" for up to 60 seconds. This is acceptable — WhatsApp itself behaves this way, and the alternative (synchronous writes on every disconnect) is worse for availability.",
        ],
      },
      {
        title: "Media Handling",
        paragraphs: [
          "Never stream media through your application servers. The pattern:",
        ],
        numbered: [
          "Client requests a pre-signed S3 URL from the Media Service",
          "Client uploads directly to S3",
          "S3 URL (or CDN URL) is sent as the message payload",
          "Recipient downloads directly from CDN",
        ],
        paragraphsAfter: [
          "This keeps your WebSocket servers lean and makes media delivery globally fast via edge caching.",
        ],
      },
      {
        title: "Failure Modes & Resilience",
        listGroups: [
          {
            label: "Key failure scenarios",
            items: [
              "WebSocket server crash: Clients reconnect with exponential backoff. Message Service is stateless — any server can pick up the connection.",
              "Message loss: Clients use an ack-based protocol. Unacknowledged messages are retried with idempotency keys to prevent duplicates.",
              "Cassandra node failure: Replication factor of 3 with QUORUM reads/writes gives fault tolerance with acceptable consistency.",
              "Notification Service lag: Acceptable — push notifications are best-effort by nature (APNS/FCM don't guarantee delivery).",
            ],
          },
        ],
      },
      {
        title: "Key Takeaways",
        table: {
          headers: ["Decision", "Choice", "Why"],
          rows: [
            ["Message store", "Cassandra", "Write-heavy, partition-key access pattern"],
            ["Presence", "Redis with TTL", "Sub-ms reads, handles crashes via expiry"],
            ["Large group fan-out", "Fan-out on read", "Avoids 1024x write amplification"],
            ["Media delivery", "Pre-signed URLs + CDN", "Keeps WebSocket servers lean"],
            ["Delivery receipts", "Reverse WebSocket flow", "Real-time UX requirement"],
          ],
        },
      },
    ],
    closing: [
      "The difference between a mid-level and senior answer on this problem isn't knowing Cassandra vs MySQL. It's proactively surfacing tradeoffs — why fan-out on read for large groups, why the Presence Service is separate, and calling out that delivery receipts require careful ordering guarantees.",
      "System design interviews reward engineers who think like they've operated these systems, not just read about them.",
    ],
  },
  "youtube-system-design": {
    lead: [
      "YouTube serves 2 billion logged-in users per month, with 500 hours of video uploaded every minute.",
      "Designing a video platform at this scale introduces challenges that most backend systems never face: massive write amplification on upload, adaptive bitrate streaming, globally distributed delivery, and a recommendation engine that drives 70% of watch time.",
      "This post covers the core architectural decisions I'd make — and the tradeoffs I'd own.",
    ],
    sections: [
      {
        title: "Functional Requirements",
        listGroups: [
          {
            label: "Core Features",
            items: [
              "Upload videos (large files, async processing)",
              "Stream videos (adaptive bitrate, low latency)",
              "Search videos by title/description",
              "Like, comment, subscribe",
              "View count (eventually consistent is fine)",
              "Recommendations (out of scope for core design, but worth mentioning)",
            ],
          },
        ],
      },
      {
        title: "Scale Estimates",
        table: {
          headers: ["Metric", "Estimate"],
          rows: [
            ["DAU", "1B"],
            ["Videos watched/day", "5B"],
            ["Video uploads/min", "500 hours"],
            ["Avg video size (raw)", "600 MB"],
            ["Storage (new uploads/day)", "~1.5 PB (raw)"],
          ],
        },
        paragraphsAfter: [
          "The read:write ratio is extremely skewed toward reads (~200:1). This fundamentally shapes the architecture: optimize aggressively for reads, accept higher write complexity.",
        ],
      },
      {
        title: "High-Level Architecture",
        paragraphs: [
          "Six core services:",
        ],
        listGroups: [
          {
            label: "Core Services",
            items: [
              "Upload Service — handles raw video ingestion, triggers transcoding",
              "Transcoding Service — converts raw video to multiple formats/resolutions",
              "Metadata Service — stores video info, user data, relationships",
              "CDN Layer — delivers video chunks globally",
              "Search Service — Elasticsearch-backed video search",
              "View Count Service — eventually consistent counter system",
            ],
          },
        ],
      },
      {
        title: "Video Upload & Transcoding Pipeline",
        paragraphs: [
          "This is the most interesting part of YouTube's architecture.",
        ],
        codeBlocks: [
          {
            label: "Upload flow",
            code: "Client → Resumable Upload API → Object Storage (raw) → Message Queue\n                                                              ↓\n                                                    Transcoding Workers\n                                                              ↓\n                                             Multiple resolutions (360p/720p/1080p/4K)\n                                             Multiple formats (MP4/WebM/HLS segments)\n                                                              ↓\n                                                    CDN Origin Storage",
          },
        ],
        paragraphsAfter: [
          "Why resumable uploads? A 600MB file over a mobile connection will fail without resumability. The Upload Service issues an upload session ID; the client can resume from the last acknowledged byte on failure.",
          "Why a message queue between upload and transcoding? Decoupling. Upload spikes should not cascade into transcoding failures. The queue absorbs bursts; workers drain at their own pace. This is a classic backpressure pattern.",
          "Transcoding is expensive. For each uploaded video, workers generate ~8-10 output variants. Use dedicated GPU instances and a DAG-based workflow engine to parallelize segment-level transcoding — split the video into 5-second segments, transcode all in parallel, reassemble.",
        ],
      },
      {
        title: "Adaptive Bitrate Streaming (ABR)",
        paragraphs: [
          "YouTube doesn't serve one video file. It serves HLS (HTTP Live Streaming) segments:",
        ],
        listGroups: [
          {
            label: "How ABR works",
            items: [
              "Video is split into 2–10 second .ts segments",
              "A .m3u8 manifest lists available quality levels and segment URLs",
              "The client player monitors bandwidth and switches quality tier per segment",
              "Segments are served from CDN edge nodes — not origin",
            ],
          },
        ],
        paragraphsAfter: [
          "The manifest itself is tiny (a few KB). Most CDN cache hits are on segments. This is why YouTube can buffer so fast — it's serving small, cacheable chunks from nearby edge nodes, not streaming from a central server.",
        ],
      },
      {
        title: "Database Design",
        codeBlocks: [
          {
            label: "Videos table (PostgreSQL)",
            code: "videos(\n  video_id UUID PK,\n  uploader_id UUID,\n  title TEXT,\n  description TEXT,\n  status ENUM(processing, ready, failed),\n  created_at TIMESTAMP\n)",
          },
        ],
        paragraphs: [
          "Why PostgreSQL for metadata? Video metadata is relational, low-write-frequency, and benefits from ACID guarantees (you don't want a video marked \"ready\" before transcoding completes).",
        ],
        decisionCards: [
          {
            title: "Comments — Cassandra",
            bullets: [
              "High write volume, accessed by (video_id, timestamp)",
              "No complex joins needed",
              "Write-optimized, time-sorted access pattern",
            ],
          },
          {
            title: "View Counts — Redis → PostgreSQL",
            bullets: [
              "Redis INCR views:{video_id} for real-time counting",
              "Flushed to PostgreSQL periodically",
              "Eventual consistency acceptable (lag by a few minutes)",
              "Strong consistency not worth the write cost",
            ],
          },
        ],
      },
      {
        title: "CDN Strategy",
        paragraphs: [
          "This is where YouTube spends most of its infrastructure cost — and it's worth discussing explicitly.",
        ],
        listGroups: [
          {
            label: "Tiered CDN",
            items: [
              "Edge nodes (100s globally): Serve cached segments closest to users",
              "Regional PoPs: Mid-tier cache, reduces origin load",
              "Origin: CDN-facing object storage (S3-compatible)",
            ],
          },
        ],
        paragraphsAfter: [
          "Cache policy: Video segments are immutable once transcoded. Cache-Control: max-age=31536000, immutable. Eviction is by popularity, not TTL — a 5-year-old viral video should stay cached at edge.",
          "Long-tail problem: 80% of watch time goes to 20% of videos. The remaining 80% of videos will have low cache hit rates. For these, CDN misses go to regional PoP, then origin. You accept higher latency for rare content.",
        ],
      },
      {
        title: "Search: Elasticsearch",
        paragraphs: [
          "Video search is a classic Elasticsearch use case:",
        ],
        listGroups: [
          {
            label: "Search architecture",
            items: [
              "Inverted index on title, description, tags, transcript (auto-generated)",
              "Ranking signals: view count, engagement rate, freshness, personalization score",
              "Index updated asynchronously after upload completes (eventual consistency is fine)",
            ],
          },
        ],
        paragraphsAfter: [
          "At YouTube's scale, Elasticsearch is supplemented with a dedicated ML ranking layer. The search query returns candidates; a ranking model re-orders them by predicted CTR.",
        ],
      },
      {
        title: "Failure Modes",
        listGroups: [
          {
            label: "Key failure scenarios",
            items: [
              "Transcoding worker failure: Jobs are idempotent (segment-level). Failed segments are retried from the queue. Video stays in processing state until all segments complete.",
              "CDN edge failure: Client retries with next nearest edge (health-checked). Graceful degradation to lower bitrate.",
              "Metadata DB overload: Read replicas for all read traffic. Primary only takes writes. Connection pooling (PgBouncer) to prevent connection exhaustion.",
              "Hot video spike (viral): CDN absorbs 95%+ of traffic. Origin shielded. Pre-warming CDN for known events (sports finals, product launches) is a real ops practice.",
            ],
          },
        ],
      },
      {
        title: "Key Tradeoffs Summary",
        table: {
          headers: ["Decision", "Choice", "Why"],
          rows: [
            ["View count consistency", "Eventual (Redis → DB)", "Write cost outweighs accuracy"],
            ["Comments DB", "Cassandra", "Write-heavy, time-sorted"],
            ["Transcoding pipeline", "Async + queue", "Decouple upload from processing"],
            ["Video delivery", "HLS segments via CDN", "ABR + cacheability"],
            ["Search updates", "Async", "Freshness < availability"],
          ],
        },
      },
    ],
    closing: [
      "YouTube's architecture is a masterclass in designing for asymmetric read/write ratios and accepting the right kinds of eventual consistency.",
      "The interesting decisions aren't which databases to use — they're why those databases, under what access patterns, and what failure modes you're trading away.",
      "If you're preparing for system design interviews, the habit to build is: for every component you add, ask \"what happens when this fails?\" and \"what's the consistency model here, and is that acceptable?\" That discipline is what separates a passing answer from a memorable one.",
    ],
  },
};
