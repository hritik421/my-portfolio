import { experience, education } from "../data/experience";

const dotColor = ["bg-blue-600", "bg-teal-500", "bg-purple-500"];
const borderColor = ["border-blue-100", "border-teal-100", "border-purple-100"];
const badgeColor = ["bg-blue-50 text-blue-700", "bg-teal-50 text-teal-700", "bg-purple-50 text-purple-700"];

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Experience</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">Work history</h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-48 top-0 bottom-0 w-px bg-gray-300" />

          <div className="space-y-12">
            {experience.map((exp, i) => (
              <div key={exp.id} className="grid grid-cols-1 lg:grid-cols-[192px_1fr] gap-6 lg:gap-10">

                {/* Date column */}
                <div className="lg:text-right">
                  <div className="lg:pr-6">
                    <div className="text-sm font-semibold text-gray-900">{exp.period}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{exp.duration}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{exp.location}</div>
                  </div>

                  {/* Hidden on mobile — dot sits on the line */}
                  <div className="hidden lg:flex justify-end mt-4">
                    <div className={`relative`}>
                      <div className={`w-3 h-3 rounded-full ${dotColor[i]} translate-x-[calc(2rem+0.5px)]`} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`border ${borderColor[i]} rounded-2xl p-6 lg:p-8 bg-gray-50/50`}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                      <div className="text-blue-600 font-medium text-sm mt-0.5">{exp.company}</div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {i === 0 && (
                        <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-medium">
                          Current Role
                        </span>
                      )}
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badgeColor[i]}`}>
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                        <span className="text-blue-400 mt-1 flex-shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                    {exp.stack.map((s) => (
                      <span key={s} className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Education */}
            {education.map((edu) => (
              <div key={edu.degree} className="grid grid-cols-1 lg:grid-cols-[192px_1fr] gap-6 lg:gap-10">
                <div className="lg:text-right">
                  <div className="lg:pr-6">
                    <div className="text-sm font-semibold text-gray-900">{edu.period}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{edu.location}</div>
                  </div>
                  <div className="hidden lg:flex justify-end mt-4">
                    <div className="w-3 h-3 rounded-full bg-amber-400 translate-x-[calc(2rem+0.5px)]" />
                  </div>
                </div>
                <div className="border border-amber-100 rounded-2xl p-6 lg:p-8 bg-amber-50/30">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xl">🎓</span>
                    <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                  </div>
                  <div className="text-amber-700 font-medium text-sm ml-8">{edu.institution}</div>
                  <div className="text-xs text-gray-400 ml-8 mt-1">{edu.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
