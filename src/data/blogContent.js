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
};
