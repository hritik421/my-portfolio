import { Link } from "react-router-dom";
import { blogs } from "../data/blog";

const tagColors = {
  ".NET": "bg-purple-50 text-purple-700",
  "Azure": "bg-blue-50 text-blue-700",
  "GCP": "bg-orange-50 text-orange-700",
  "Design Patterns": "bg-teal-50 text-teal-700",
  "Next.js": "bg-gray-900 text-white",
  "Microservices": "bg-green-50 text-green-700",
  "Architecture": "bg-amber-50 text-amber-700",
  "Micro-Frontend": "bg-pink-50 text-pink-700",
  "Web Components": "bg-red-50 text-red-700",
  "React": "bg-cyan-50 text-cyan-700",
};

const thumbGradients = [
  "from-blue-900 to-indigo-800",
  "from-teal-900 to-emerald-800",
  "from-purple-900 to-violet-800",
];

export default function Blog() {
  const featured = blogs.find((b) => b.featured);
  const rest = blogs.filter((b) => !b.featured);

  return (
    <section id="blog" className="py-16 sm:py-24 bg-slate-100">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">Blog</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">Thoughts & tutorials</h2>
          </div>
          <Link
            to="/blog"
            className="text-sm font-medium text-blue-600 hover:underline self-start sm:self-end"
          >
            View all articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured — spans 2 cols */}
          {featured && (
            <Link
              to={`/blog/${featured.slug}`}
              className="lg:col-span-2 group border border-gray-200 bg-white rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-md transition-all duration-200"
            >
              <div className={`bg-gradient-to-br ${thumbGradients[0]} h-48 flex items-end p-6`}>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/20 text-white px-3 py-1 rounded-full">
                  ✦ Featured Article
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                  {featured.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {featured.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {featured.tags.map((tag) => (
                    <span key={tag} className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${tagColors[tag] || "bg-gray-100 text-gray-600"}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          )}

          {/* Right column — smaller cards */}
          <div className="flex flex-col gap-5">
            {rest.map((blog, i) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="group border border-gray-200 bg-white rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-md transition-all duration-200 flex-1"
              >
                <div className={`bg-gradient-to-br ${thumbGradients[i + 1]} h-24 flex items-end p-4`}>
                  <span className="text-white/70 text-xs font-medium">{blog.date}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1.5 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[tag] || "bg-gray-100 text-gray-600"}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{blog.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
