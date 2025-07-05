import { notFound } from 'next/navigation'
import { getPostData, getAllPostSlugs } from '@/lib/posts'
import Link from 'next/link'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug: slug.params.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  
  try {
    const post = await getPostData(slug)

    return (
      <div className="max-w-6xl mx-auto p-8">
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            ← back to home
          </Link>
        </nav>

        <article>
          <header className="mb-8">
            <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-lg text-gray-500 dark:text-gray-400 mb-4">
              <time>
                {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
              </time>
              {post.tags && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {post.description && (
              <p className="text-2xl text-gray-600 dark:text-gray-400 border-l-4 border-blue-500 pl-4">
                {post.description}
              </p>
            )}
          </header>

          <div 
            className="prose prose-2xl dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    )
  } catch {
    notFound()
  }
}
