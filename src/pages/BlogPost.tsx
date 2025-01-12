import { useParams } from 'react-router-dom';
import { BLOG_POSTS } from '@/pages/Blog';
import { PropertyHero } from '@/components/PropertyHero';
import { motion } from 'framer-motion';

export function BlogPost() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.id === Number(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <PropertyHero
        title={post.title}
        subtitle={post.excerpt}
        imageUrl={post.imageUrl}
      />

      <motion.div 
        className="max-w-4xl mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-navy-800/50 rounded-lg border border-gold-500/20 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="text-white font-medium">{post.author.name}</div>
                <div className="text-sm text-gray-400">{post.author.role}</div>
              </div>
              <div className="ml-auto text-sm text-gray-400">
                {post.date} · {post.readTime}
              </div>
            </div>

            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}