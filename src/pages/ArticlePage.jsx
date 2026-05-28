import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blog";
import { blogDetails } from "../data/blogContent";

function ArticleSection({ section }) {
  return (
    <section className="mb-12 last:mb-0">
      <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-4">{section.title}</h2>

      {section.paragraphs?.map((text) => (
        <p key={text} className="text-gray-700 leading-8 mb-4">{text}</p>
      ))}

      {section.listGroups?.map((group) => (
        <div key={group.label} className="mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">{group.label}</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-7">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      {section.numbered?.length > 0 && (
        <ol className="list-decimal pl-6 space-y-2 text-gray-700 leading-7 mb-4">
          {section.numbered.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      )}

      {section.decisionCards?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {section.decisionCards.map((card) => (
            <div key={card.title} className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{card.title}</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 leading-6">
                {card.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {section.codeBlocks?.map((block) => (
        <div key={`${section.title}-${block.label || "code"}-${block.code.slice(0, 24)}`} className="mb-4">
          {block.label && (
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{block.label}</div>
          )}
          <pre className="bg-slate-900 text-slate-100 text-sm leading-6 rounded-2xl p-5 overflow-x-auto">
            <code>{block.code}</code>
          </pre>
        </div>
      ))}

      {section.paragraphsAfter?.map((text) => (
        <p key={text} className="text-gray-700 leading-8 mb-4">{text}</p>
      ))}

      {section.table && (
        <div className="overflow-x-auto border border-gray-200 rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                {section.table.headers.map((header) => (
                  <th key={header} className="text-left font-semibold px-4 py-3 border-b border-gray-200">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row.join("-")} className="border-b border-gray-100 last:border-b-0">
                  {row.map((cell) => (
                    <td key={cell} className="px-4 py-3 text-gray-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);
  const details = blogDetails[slug];

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

        {details ? (
          <article>
            {details.lead?.map((text) => (
              <p key={text} className="text-gray-700 text-lg leading-8 mb-5">
                {text}
              </p>
            ))}

            <div className="border-t border-gray-100 my-10" />

            {details.sections.map((section) => (
              <ArticleSection key={section.title} section={section} />
            ))}

            {details.closing?.length > 0 && (
              <div className="mt-12 border-t border-gray-100 pt-8 space-y-3">
                {details.closing.map((text) => (
                  <p key={text} className="text-gray-600 italic leading-7">
                    {text}
                  </p>
                ))}
              </div>
            )}
          </article>
        ) : (
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
        )}
      </div>
    </div>
  );
}
