export const blogs = [
  {
    id: "whatsapp-system-design",
    title: "Designing WhatsApp: Real-Time Messaging at Billion-User Scale",
    excerpt:
      "A deep dive into the architectural decisions behind a WhatsApp-scale messaging system — WebSocket management, Cassandra fan-out, Presence Service design, and the tradeoffs I'd defend in a real interview.",
    date: "June 2025",
    readTime: "10 min read",
    tags: ["System Design", "Distributed Systems", "Real-Time"],
    featured: true,
    slug: "whatsapp-system-design",
  },
  {
    id: "youtube-system-design",
    title: "Designing YouTube: Video at Global Scale",
    excerpt:
      "500 hours of video uploaded per minute, 5 billion views per day. How do you architect upload pipelines, adaptive bitrate streaming, CDN strategy, and eventually consistent view counts at this scale?",
    date: "June 2025",
    readTime: "12 min read",
    tags: ["System Design", "Distributed Systems", "CDN", "Video Streaming"],
    featured: false,
    slug: "youtube-system-design",
  },
  {
    id: "url-shortener-system-design",
    title: "Designing a URL Shortener: What I Learned Designing on Paper",
    excerpt:
      "I've built Redis caching and distributed systems in production. Yet designing a URL Shortener from scratch taught me something I was missing - how to justify every decision with numbers. Here's the full design with the math.",
    date: "May 2026",
    readTime: "8 min read",
    tags: ["System Design", "Redis", "PostgreSQL", "Backend"],
    featured: true,
    slug: "url-shortener-system-design",
  },
  {
    id: "multi-cloud-storage-strategy-pattern",
    title: "Multi-Cloud Storage with the Strategy Pattern in .NET",
    excerpt:
      "How I built a pluggable storage abstraction that switches between Azure Blob and GCP Cloud Storage with zero application code changes — and why PostgreSQL beat Redis for job state.",
    date: "May 2025",
    readTime: "7 min read",
    tags: [".NET", "Azure", "GCP", "Design Patterns"],
    featured: false,
    slug: "multi-cloud-storage-strategy-pattern",
  },
  {
    id: "bff-nextjs-microservices",
    title: "Why I Chose BFF Architecture for a .NET + Microservices Stack",
    excerpt:
      "Direct microservice calls from the browser caused waterfall latency, CORS headaches, and N+1 problems. Here's how a BFF layer with .NET fixed all three.",
    date: "Mar 2025",
    readTime: "6 min read",
    tags: [".NET", "Microservices", "Architecture"],
    featured: false,
    slug: "bff-dotnet-microservices",
  },
  {
    id: "micro-frontend-web-components",
    title: "Framework-Agnostic Micro-Frontends with Web Components",
    excerpt:
      "When you need a widget to run inside React, Angular, and plain HTML without coupling — Web Components are the answer. A practical guide from production experience.",
    date: "Jan 2025",
    readTime: "8 min read",
    tags: ["Micro-Frontend", "Web Components", "React"],
    featured: false,
    slug: "micro-frontend-web-components",
  },
];
