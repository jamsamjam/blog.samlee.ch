import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Sam Lee's Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          On dev, tech, and whatever else I find interesting
        </p>
      </header>

      <main>
        <section>
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-8">
                <Link 
                  href={`/posts/${post.slug}`}
                  className="group"
                >
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                
                <div className="flex items-center gap-4 text-base text-gray-500 dark:text-gray-400 mb-3">
                  <time>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                  </time>
                </div>
                
                {post.description && (
                  <p className="text-xl text-gray-700 dark:text-gray-300">
                    {post.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
