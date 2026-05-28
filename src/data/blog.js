export const blogs = [
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
    title: "Why I Chose BFF Architecture for a Next.js + Microservices Stack",
    excerpt:
      "Direct microservice calls from the browser caused waterfall latency, CORS headaches, and N+1 problems. Here's how a BFF layer with Next.js API routes fixed all three.",
    date: "Mar 2025",
    readTime: "6 min read",
    tags: ["Next.js", "Microservices", "Architecture"],
    featured: false,
    slug: "bff-nextjs-microservices",
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
