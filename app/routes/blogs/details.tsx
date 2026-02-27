import type { PostMeta } from "~/types";
import type { Route } from "./+types/details";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import BackLink from "~/components/BackLink";
import PageBackground from "~/components/PageBackground";
import { formatDate, readingTime } from "~/lib/utils";
import { fadeInUp } from "~/lib/motion";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const res = await fetch(`${import.meta.env.VITE_API_URL}/post-meta`);
  if (!res.ok) throw new Error("Failed to fetch post meta data");
  const metaData = await res.json();
  const postMeta = metaData.find((post: PostMeta) => post.slug === slug);

  if (!postMeta) throw new Response("Post doesn't exist...", { status: 404 });

  const markdown = await import(`../../posts/${slug}.md?raw`);

  return {
    postMeta,
    markdown: markdown.default as string,
  };
}

interface BlogDetailsPageProps {
  loaderData: {
    postMeta: PostMeta;
    markdown: string;
  };
}

const BlogDetailsPage = ({ loaderData }: BlogDetailsPageProps) => {
  const { postMeta, markdown } = loaderData;

  const formattedDate = formatDate(postMeta.date);
  const mins = readingTime(markdown);

  return (
    <section className="page-section">
      <PageBackground />

      <div className="max-w-3xl mx-auto relative z-10 pt-16">
        <BackLink to="/blogs" label="Back to Blog" />

        {/* Header */}
        <motion.div
          className="mb-10"
          {...fadeInUp}
          transition={{ duration: 0.5 }}
        >
          {/* Title */}
          <h1 className="font-display text-white leading-tight mb-6">
            {postMeta.title}
          </h1>

          {/* Excerpt */}
          <p className="text-zinc-400 leading-relaxed mb-8 max-w-none">
            {postMeta.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-400/70" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-2">
              <FaClock className="text-blue-400/70" />
              {mins} min read
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="gradient-divider mb-10" />

        {/* Markdown body */}
        <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.6 }}>
          <div className="prose-content">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogDetailsPage;
