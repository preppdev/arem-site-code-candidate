import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { posts, getPost } from "../../blog-data";
import { company } from "../../site-data";
import { Markdown } from "../../_components/markdown";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: company.name },
    publisher: { "@type": "Organization", name: company.name },
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8 lg:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>

        <div className="mt-6 flex items-center gap-3 text-xs">
          <span className="rounded-full bg-brand-soft px-3 py-1 font-medium text-brand-ink">
            {post.category}
          </span>
          <span className="text-muted">
            {fmtDate(post.date)} · {post.readMins} min read · {post.author}
          </span>
        </div>

        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">{post.excerpt}</p>

        <div
          className="my-8 rounded-xl border border-line"
          style={{
            minHeight: 200,
            background: "linear-gradient(135deg, var(--color-brand-soft), var(--color-paper-2))",
          }}
        />

        <div className="mt-8">
          <Markdown content={post.body} />
        </div>

        {/* inline CTA */}
        <div className="mt-12 rounded-[var(--radius-card)] border border-line bg-paper-2 p-6">
          <p className="text-base font-semibold text-ink">Need this shot on your next listing?</p>
          <p className="mt-1.5 text-sm text-ink-2">
            Photography, video, drone, 3D, twilight and more — delivered next day across
            Hampton Roads &amp; NE North Carolina.
          </p>
          <a
            href={company.bookingUrl}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Book a shoot <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </article>

      {/* related */}
      <section className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <h2 className="text-xl font-semibold tracking-tight text-ink">Keep reading</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-[var(--radius-card)] border border-line bg-paper p-5 transition-shadow hover:shadow-soft"
              >
                <span className="text-xs font-medium text-brand">{p.category}</span>
                <h3 className="mt-2 text-base font-semibold leading-snug text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
