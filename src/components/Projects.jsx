import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const categories = ["All", "Frontend", "Backend", "Cloud", "AI", "Enterprise"];

const colorMap = {
  "export-service": "from-blue-900 to-blue-700",
  "onboarding-portal": "from-teal-900 to-teal-700",
  "netflix-gpt": "from-red-900 to-red-700",
  "core-identity": "from-purple-900 to-purple-700",
};

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) =>
          p.category.some((c) => c.toLowerCase() === active.toLowerCase())
        );

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || p !== featured);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-slate-100">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Projects</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">Production work</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150 ${
                  active === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured project */}
        {featured && (
          <Link
            to={`/project/${featured.id}`}
            className="block group mb-6"
          >
            <div className={`relative bg-gradient-to-br ${colorMap[featured.id]} rounded-2xl overflow-hidden p-8 lg:p-10`}>
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/20 text-white px-3 py-1 rounded-full mb-6">
                ⭐ Featured Project
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                <div>
                  <div className="text-xs text-white/60 font-medium mb-2">{featured.company}</div>
                  <h3 className="text-2xl lg:text-3xl font-semibold text-white leading-tight mb-3">
                    {featured.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
                    {featured.shortDesc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {featured.techStack.slice(0, 5).map((t) => (
                      <span key={t} className="text-xs bg-white/15 text-white/90 px-2.5 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                    {featured.techStack.length > 5 && (
                      <span className="text-xs text-white/60 px-2.5 py-1">
                        +{featured.techStack.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Outcome stats */}
                <div className="flex gap-6 lg:justify-end">
                  {featured.outcome.map((o) => (
                    <div key={o.label} className="text-center">
                      <div className="text-2xl font-semibold text-white">{o.metric}</div>
                      <div className="text-xs text-white/60 mt-1">{o.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
          </Link>
        )}

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-md transition-all duration-200"
            >
              {/* Thumb */}
              <div className={`bg-gradient-to-br ${colorMap[project.id]} h-36 flex items-end p-5`}>
                <span className="text-white/80 text-xs font-medium">{project.company}</span>
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                  {project.shortDesc}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 4).map((t) => (
                    <span key={t} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs font-medium text-blue-600 group-hover:underline">
                    View Case Study →
                  </span>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-gray-400 hover:text-gray-700"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-gray-400 hover:text-gray-700"
                      >
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
