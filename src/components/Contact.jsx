import { useState } from "react";
import { personal } from "../data/personal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens default mail client with pre-filled fields
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`);
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Contact</p>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900">Let's build something great.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — Info */}
          <div>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Open to full-time roles, contract work, and interesting collaborations. Whether you have a position to discuss or just want to connect — I respond within 24 hours.
            </p>

            <div className="space-y-4 mb-10">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: personal.email,
                  href: `mailto:${personal.email}`,
                },
                {
                  icon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                  label: "linkedin.com/in/hritik-gupta-50a895194",
                  href: personal.linkedin,
                },
                {
                  icon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  ),
                  label: "github.com/hritik421",
                  href: personal.github,
                },
                {
                  icon: <span className="text-lg">📍</span>,
                  label: personal.location,
                  href: null,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                    {item.icon}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-600">{item.label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Notice period */}
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-4 py-2.5 rounded-xl">
              <span>⏱</span>
              Notice period: {personal.availabilityNote}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-2xl mb-4">
                  ✓
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Message sent!</h3>
                <p className="text-sm text-gray-500">Your mail client should have opened. I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm text-blue-600 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Your name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Email address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about the role or project..."
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-gray-50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3.5 rounded-xl transition-colors duration-200"
                >
                  Send Message →
                </button>
                <p className="text-xs text-gray-400 text-center">
                  This will open your mail client. Or email directly at{" "}
                  <a href={`mailto:${personal.email}`} className="text-blue-500 hover:underline">
                    {personal.email}
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6 mt-24 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-gray-400">© 2025 Hritik Gupta. Built with React + Tailwind.</span>
        <div className="flex gap-6">
          <a href={personal.github} target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">GitHub</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">LinkedIn</a>
          <a href={`mailto:${personal.email}`} className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Email</a>
        </div>
      </div>
    </section>
  );
}
