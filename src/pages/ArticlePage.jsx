import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blog";

export default function ArticlePage() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Article not found</h1>
          <Link to="/" className="text-blue-600 hover:underline">← Back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/#blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 mb-10 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
          <span>{blog.date}</span>
          <span>·</span>
          <span>{blog.readTime}</span>
        </div>

        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight leading-tight mb-4">
          {blog.title}
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-8">{blog.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-gray-100">
          {blog.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Article content placeholder */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
            <div className="text-2xl mb-3">✍️</div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Full article coming soon</h3>
            <p className="text-sm text-gray-500">
              This article is being written. Check back soon, or{" "}
              <a href="mailto:hritikgupta211@gmail.com" className="text-blue-600 hover:underline">
                subscribe via email
              </a>{" "}
              to be notified when it's published.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
