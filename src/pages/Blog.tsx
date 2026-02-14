import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";
import { getData, defaultBlogPosts, KEYS, type BlogPost } from "@/data/mock-data";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Blog = () => {
  const posts = getData<BlogPost>(KEYS.blog, defaultBlogPosts);

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-primary font-mono text-sm mb-2">{"// Blog"}</motion.p>
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-4xl sm:text-5xl font-display font-bold mb-12">
          Articles <span className="gradient-text">& réflexions</span>
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <motion.article key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-6 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString("fr-FR")}</span>
              </div>
              <h2 className="text-lg font-display font-semibold mb-2 hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                    <Tag className="w-2.5 h-2.5" />{tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
