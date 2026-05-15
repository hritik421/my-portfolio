import { personal } from "../data/personal";
import { experience, education } from "../data/experience";

const traits = [
  { icon: "🧠", label: "System Design" },
  { icon: "☁️", label: "Cloud Native" },
  { icon: "⚡", label: "Performance Obsessed" },
  { icon: "🧪", label: "Test Driven" },
  { icon: "🤝", label: "Team Player" },
  { icon: "📐", label: "Clean Architecture" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">About Me</p>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900">Who I am</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — Bio + traits */}
          <div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              {personal.about.split("\n\n").map((para, i) => (
                <p key={i} className={i === 0 ? "text-lg" : "text-base"}>
                  {para}
                </p>
              ))}
            </div>

            {/* Trait chips */}
            <div className="flex flex-wrap gap-2 mt-8">
              {traits.map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-1.5 text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full"
                >
                  <span>{t.icon}</span>
                  {t.label}
                </span>
              ))}
            </div>

            {/* Links row */}
            <div className="flex gap-4 mt-8">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                LinkedIn ↗
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                GitHub ↗
              </a>
              <a
                href={personal.gfg}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                GeeksforGeeks ↗
              </a>
            </div>
          </div>

          {/* Right — Experience timeline */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
              Career Timeline
            </h3>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gray-200" />

              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <div key={exp.id} className="relative flex gap-5">
                    {/* Dot */}
                    <div
                      className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${
                        i === 0 ? "bg-blue-600" : i === 1 ? "bg-teal-500" : "bg-purple-500"
                      }`}
                    >
                      {exp.company.charAt(0)}
                    </div>

                    {/* Content */}
                    <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1 shadow-sm">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{exp.role}</div>
                          <div className="text-sm text-blue-600 font-medium">{exp.company}</div>
                        </div>
                        {i === 0 && (
                          <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full flex-shrink-0">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{exp.period} · {exp.duration}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {exp.stack.slice(0, 4).map((s) => (
                          <span key={s} className="text-xs bg-gray-50 text-gray-600 border border-gray-100 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Education */}
                {education.map((edu) => (
                  <div key={edu.degree} className="relative flex gap-5">
                    <div className="relative z-10 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold bg-amber-500">
                      🎓
                    </div>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1 shadow-sm">
                      <div className="text-sm font-semibold text-gray-900">{edu.degree}</div>
                      <div className="text-sm text-amber-600 font-medium">{edu.institution}</div>
                      <div className="text-xs text-gray-400 mt-1">{edu.period} · {edu.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
