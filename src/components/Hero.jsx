import { personal } from "../data/personal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/40"
    >
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-16 sm:pt-12 sm:pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Text */}
          <div className="order-2 lg:order-1">
            {/* Availability badge */}
            {personal.available && (
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6 sm:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Available · {personal.availabilityNote}
              </div>
            )}

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.1] mb-5 sm:mb-6">
              {personal.heroHeadline.map((line, i) => (
                <span key={i} className={`block ${i === 1 ? "text-blue-600" : ""}`}>
                  {line}
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-10 max-w-lg">
              {personal.heroSub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10 sm:mb-14">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-blue-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-sm shadow-blue-200"
              >
                View Projects
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-6 py-3 rounded-lg hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50 active:scale-95 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-6 py-3 rounded-lg hover:border-blue-200 hover:text-blue-700 hover:bg-blue-50/60 active:scale-95 transition-all duration-200"
              >
                <svg className="w-4 h-4 text-blue-600 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-10 pt-6 sm:pt-8 border-t border-gray-100">
              {personal.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-2xl font-semibold text-gray-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Photo */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            {/* Outer padding gives floating badges room to breathe on all screens */}
            <div className="relative mt-6 mb-6 mx-6 sm:mt-5 sm:mb-5 sm:mx-5 lg:mt-4 lg:mb-4 lg:mx-4">
              {/* Decorative layers */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 translate-x-3 translate-y-3 opacity-15 blur-sm" />
              <div className="absolute inset-0 rounded-2xl border-2 border-blue-200/70 translate-x-1.5 translate-y-1.5" />

              {/* Photo */}
              <img
                src={personal.photo}
                alt="Hritik Gupta"
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover object-top rounded-2xl border border-gray-100 shadow-2xl"
              />

              {/* Tech stack badge — bottom-left */}
              <div className="absolute -bottom-5 -left-5 bg-white border border-gray-100 shadow-xl rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-900 leading-tight">.NET + React</div>
                  <div className="text-xs text-gray-400 leading-tight">Full Stack</div>
                </div>
              </div>

              {/* Location badge — top-right */}
              <div className="absolute -top-5 -right-5 bg-white border border-gray-100 shadow-xl rounded-xl px-3 py-2 flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-red-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{personal.location}</span>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
