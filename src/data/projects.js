export const projects = [
  {
    id: "export-service",
    title: "Data Export Service",
    tagline: "Cloud-agnostic, fault-tolerant export engine at enterprise scale",
    company: "Walmart Global Tech",
    period: "Apr 2025 – Dec 2025",
    type: "Full Time",
    featured: true,
    category: ["backend", "cloud"],
    shortDesc:
      "Built a cloud-agnostic Data Export Service handling 100MB+ Excel/CSV files with async processing, multi-cloud storage, and zero-downtime deploys.",
    problem:
      "Walmart's internal teams needed on-demand and scheduled exports of massive datasets (100MB+) across Excel and CSV formats. The existing solution was synchronous, timed out frequently, and was locked to a single cloud provider — creating a hard dependency and operational risk.",
    solution:
      "Designed and built a fully async export pipeline using ASP.NET Core and C#. Implemented a PostgreSQL-backed job queue with configurable retry logic and halted-process recovery. Used the Strategy pattern to build a pluggable multi-cloud storage layer supporting both Azure Blob Storage and GCP Cloud Storage — zero code changes needed to switch providers.",
    outcome: [
      { metric: ">100MB", label: "File size handled" },
      { metric: "0", label: "Cloud provider lock-in" },
      { metric: "Auto", label: "Failure recovery" },
    ],
    techStack: ["ASP.NET Core", "C#", "PostgreSQL", "Azure Blob", "GCP Cloud Storage", "Docker"],
    architecture: [
      { from: "Client / Scheduler", to: "Export API (ASP.NET Core)" },
      { from: "Export API", to: "PostgreSQL Job Queue" },
      { from: "Job Queue", to: "Background Worker (retry + recovery)" },
      { from: "Background Worker", to: "Azure Blob / GCP Storage (Strategy pattern)" },
    ],
    decisions: [
      {
        title: "Strategy Pattern for multi-cloud",
        detail:
          "Abstracted storage behind an interface so Azure and GCP implementations are swappable with zero application code changes.",
      },
      {
        title: "PostgreSQL job queue over Redis",
        detail:
          "Needed durable, queryable job state with audit history — PostgreSQL gave us recovery and diagnostics out of the box.",
      },
      {
        title: "Streaming over in-memory buffering",
        detail:
          "For 100MB+ files, loading into memory caused OOM crashes. Streaming the rows directly to storage kept memory flat.",
      },
    ],
    github: "",
    live: "",
  },
  {
    id: "onboarding-portal",
    title: "Onboarding Portal",
    tagline: "GDPR-compliant, multi-tenant onboarding platform serving Walmart globally",
    company: "Dunnhumby",
    period: "Aug 2024 – Mar 2025",
    type: "Full Time",
    featured: true,
    category: ["frontend", "fullstack"],
    shortDesc:
      "Built a BFF-layer onboarding wizard with Next.js 14, micro-frontend architecture, distributed tracing across 7+ microservices, and Kubernetes deployments.",
    problem:
      "Dunnhumby needed a unified onboarding experience for Walmart and other global retail clients, supporting multi-language, multi-tenant configurations, GDPR consent flows, and a complex product hierarchy selection (L1–L5) — all while integrating with 7+ independently deployed microservices.",
    solution:
      "Designed a Backend-for-Frontend (BFF) proxy layer using Next.js 14 API routes and Istio service mesh, giving the frontend a single clean API surface. Built a multi-step onboarding wizard with React 18 Server/Client Components, Context API, and i18next for multilingual support. Enabled end-to-end distributed tracing with New Relic. Architected a micro-frontend widget for product hierarchy selection using Web Components and an EventBus communication library.",
    outcome: [
      { metric: "7+", label: "Microservices integrated" },
      { metric: "Multi-lang", label: "i18n support" },
      { metric: "GDPR", label: "Compliant flow" },
    ],
    techStack: ["Next.js 14", "React 18", "TypeScript", "Istio", "New Relic", "Kubernetes", "Helm", "ArgoRollouts", "i18next"],
    decisions: [
      {
        title: "BFF over direct microservice calls",
        detail:
          "Aggregating 7+ services from the client caused waterfall latency and CORS complexity. The BFF layer colocates data fetching and returns shaped responses.",
      },
      {
        title: "Web Components for micro-frontend",
        detail:
          "Product dimension widget needed to be embedded in other teams' products without coupling to their React version — Web Components gave true framework independence.",
      },
      {
        title: "ArgoRollouts for canary deploys",
        detail:
          "Zero-downtime releases with traffic shifting allowed safe rollout of onboarding changes without impacting active user sessions.",
      },
    ],
    github: "",
    live: "",
  },
  {
    id: "netflix-gpt",
    title: "Netflix GPT",
    tagline: "AI-powered movie discovery with GPT recommendations",
    company: "Personal Project",
    period: "Apr 2023 – Aug 2023",
    type: "Side Project",
    featured: false,
    category: ["frontend", "ai"],
    shortDesc:
      "Netflix clone with GPT-powered personalised movie recommendations, TMDb integration, multilingual support, and custom React hooks.",
    problem:
      "Standard streaming UIs surface the same trending titles for everyone. The goal was to build a smarter discovery experience where users describe what they want to watch in natural language and get personalised suggestions.",
    solution:
      "Built a Netflix-style UI with React and Redux Store. Integrated the TMDb API for movie data and the OpenAI API for natural language recommendation prompts. Added user authentication with sign-in/sign-out, custom hooks for fetching movie lists, and a multi-language feature using i18n.",
    outcome: [
      { metric: "GPT", label: "Powered recommendations" },
      { metric: "Multi-lang", label: "UI support" },
      { metric: "TMDb", label: "Live movie data" },
    ],
    techStack: ["React", "Redux", "OpenAI API", "TMDb API", "Tailwind CSS", "Firebase Auth"],
    decisions: [],
    github: "",
    live: "",
  },
  {
    id: "core-identity",
    title: "Core Identity",
    tagline: "One-stop access management platform for Microsoft enterprise",
    company: "Microsoft (via MAQ Software)",
    period: "Apr 2022 – Jul 2023",
    type: "Full Time",
    featured: false,
    category: ["fullstack", "enterprise"],
    shortDesc:
      "Full-stack access management application for Microsoft, with Blazor UI, Azure Active Directory integration, and comprehensive unit test coverage.",
    problem:
      "Microsoft needed a centralised internal application to manage access across the organisation and client companies, replacing a fragmented set of manual processes and disconnected tools.",
    solution:
      "Acted as full-stack developer building the UI in Blazor and the service layer in C#/.NET. Worked directly with Microsoft FTEs on requirements, planning, and delivery. Implemented comprehensive xUnit test suites and executed accessibility testing across web pages. Deployed via Azure DevOps pipelines.",
    outcome: [
      { metric: "1 app", label: "Unified access control" },
      { metric: "xUnit", label: "Full test coverage" },
      { metric: "Azure AD", label: "Integrated auth" },
    ],
    techStack: [".NET Framework", "C#", "Blazor", "xUnit", "Azure DevOps", "Azure Functions", "Azure Cosmos DB", "Azure Active Directory"],
    decisions: [],
    github: "",
    live: "",
  },
];