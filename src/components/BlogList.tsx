"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import type { PostData } from "@/lib/posts";

interface BlogListProps {
  posts: PostData[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
      }
    });
    return counts;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter(post => post.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  const totalPosts = posts.length;

  return (
    <>
      <nav className="mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={() => setSelectedTag(null)}
            className={`text-sm px-3 py-2 rounded-lg transition-colors ${
              selectedTag === null 
                ? 'bg-blue-200 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All ({totalPosts})
          </button>
          
          {Object.entries(tagCounts)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([tag, count]) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                  selectedTag === tag 
                    ? 'bg-blue-200 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tag} ({count})
              </button>
            ))}
        </div>
      </nav>

      <main>
        <section>
          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-5">
                <Link 
                  href={`/posts/${post.slug}`}
                  className="group"
                >
                  <h2 className="text-xl font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <time>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                  </time>
                </div>
                
                {post.description && (
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {post.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
