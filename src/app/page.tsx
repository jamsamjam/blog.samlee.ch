import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import BlogList from "@/components/BlogList";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mt-4 mb-1">Sam&apos;s Blog</h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          On dev, tech, and whatever else I find interesting
        </p>
      </header>

      <BlogList posts={posts} />

      <footer className="mt-3 pt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2025 <Link href="https://samlee.ch"><span className="underline hover:text-gray-700 dark:hover:text-gray-300">Sam Lee</span></Link>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
