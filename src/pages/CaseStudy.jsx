import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";

const colorMap = {
  "export-service": "from-blue-900 to-blue-700",
  "onboarding-portal": "from-teal-900 to-teal-700",
  "netflix-gpt": "from-red-900 to-red-700",
  "core-identity": "from-purple-900 to-purple-700",
};

export default function CaseStudy() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const currentIndex = projects.findIndex((p) => p.id === id);
  const prev = projects[currentIndex - 1];
  const next = projects[currentIndex + 1];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Project not found</h1>
          <Link to="/" className="text-blue-600 hover:underline">← Back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">

      {/* Hero banner */}
      <div className={`bg-gradient-to-br ${colorMap[project.id]} px-6 py-16`}>
        <div className="max-w-5xl mx-auto">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-white/60 text-sm hover:text-white mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>

          <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">Case Study</div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
            {project.title}
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-2xl">{project.tagline}</p>

          <div className="flex flex-wrap gap-8 mb-8">
            {[
              { label: "Company", value: project.company },
              { label: "Period", value: project.period },
              { label: "Type", value: project.type },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-white/50 text-xs font-medium uppercase tracking-wider">{item.label}</div>
                <div className="text-white font-medium text-sm mt-1">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span key={t} className="text-xs bg-white/15 text-white/90 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-16">

          {/* Main content */}
          <div className="space-y-14">

            {/* Problem */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-base">🔴</div>
                <h2 className="text-xl font-semibold text-gray-900">The Problem</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">{project.problem}</p>
            </div>

            {/* Solution */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center text-base">💡</div>
                <h2 className="text-xl font-semibold text-gray-900">The Solution</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">{project.solution}</p>
            </div>

            {/* Architecture */}
            {project.decisions.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-base">🏗</div>
                  <h2 className="text-xl font-semibold text-gray-900">Architecture & Decisions</h2>
                </div>
                <div className="space-y-4">
                  {project.decisions.map((d, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">{d.title}</div>
                        <div className="text-sm text-gray-600 leading-relaxed">{d.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outcome */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-base">🏆</div>
                <h2 className="text-xl font-semibold text-gray-900">Outcome</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {project.outcome.map((o) => (
                  <div key={o.label} className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-center">
                    <div className="text-2xl font-semibold text-blue-600 mb-1">{o.metric}</div>
                    <div className="text-xs text-gray-400">{o.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Links */}
            {(project.live || project.github) && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Links</h3>
                <div className="space-y-2">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 border border-gray-200 rounded-xl px-4 py-2.5 hover:border-blue-300 hover:bg-blue-50 transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-xl px-4 py-2.5 hover:border-gray-400 hover:bg-gray-50 transition-all">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      GitHub Repo
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Stack */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((t) => (
                  <span key={t} className="text-xs border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Info</h3>
              <div className="space-y-2.5">
                {[
                  { label: "Company", value: project.company },
                  { label: "Period", value: project.period },
                  { label: "Category", value: project.category.join(", ") },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-gray-700 font-medium text-right max-w-32">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="flex justify-between mt-20 pt-8 border-t border-gray-100">
          {prev ? (
            <Link to={`/project/${prev.id}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {prev.title}
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/project/${next.id}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              {next.title}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
