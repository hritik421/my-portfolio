import { skills } from "../data/skills";

const colorClass = {
  blue: "bg-blue-500",
  teal: "bg-teal-500",
  purple: "bg-purple-500",
  coral: "bg-orange-500",
  amber: "bg-amber-500",
  green: "bg-green-500",
};

const bgClass = {
  blue: "bg-blue-50 border-blue-100",
  teal: "bg-teal-50 border-teal-100",
  purple: "bg-purple-50 border-purple-100",
  coral: "bg-orange-50 border-orange-100",
  amber: "bg-amber-50 border-amber-100",
  green: "bg-green-50 border-green-100",
};

const labelClass = {
  blue: "text-blue-700",
  teal: "text-teal-700",
  purple: "text-purple-700",
  coral: "text-orange-700",
  amber: "text-amber-700",
  green: "text-green-700",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Skills</p>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900">Tech I work with</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group) => (
            <div
              key={group.category}
              className={`border rounded-2xl p-6 ${bgClass[group.color]}`}
            >
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-5 ${labelClass[group.color]}`}>
                {group.category}
              </h3>

              <div className="space-y-4">
                {group.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-xs text-gray-400">{skill.years}y exp</span>
                    </div>
                    <div className="h-1.5 bg-white/70 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${colorClass[group.color]} transition-all duration-700`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
