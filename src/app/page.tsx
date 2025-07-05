import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-12">
        <h1 className="text-6xl font-bold mt-4 mb-4">Sam's Blog</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400">
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
                  <h2 className="text-3xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                
                <div className="flex items-center gap-4 text-lg text-gray-500 dark:text-gray-400 mb-3">
                  <time>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                  </time>
                </div>
                
                {post.description && (
                  <p className="text-2xl text-gray-700 dark:text-gray-300">
                    {post.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-16 pt-8 text-center">
        <p className="text-xl text-gray-500 dark:text-gray-400">
          © 2025 <Link href="https://samlee.ch"><span className="underline hover:text-gray-700 dark:hover:text-gray-300">Sam Lee</span></Link>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
