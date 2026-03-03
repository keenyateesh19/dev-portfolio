import type { PostMeta, StrapiPostMeta, StrapiResponse } from "~/types";
import type { Route } from "./+types/details";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import BackLink from "~/components/BackLink";
import { formatDate, readingTime } from "~/lib/utils";
import { fadeInUp } from "~/lib/motion";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?filters[slug][$eg]=${slug}&populate=image`,
  );
  if (!res.ok) throw new Error("Failed to fetch post meta data");
  const json: StrapiResponse<StrapiPostMeta> = await res.json();

  if (!json.data.length)
    throw new Response(
      "The blog you are looking for might be deleted or doesn't exist...",
      { status: 404 },
    );

  const item = json.data[0];

  const postMeta = {
    id: item.id,
    slug: item.slug,
    excerpt: item.excerpt,
    title: item.title,
    date: item.date,
    body: item.body,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : "/image/no-image.png",
  };

  return { postMeta };
}

interface BlogDetailsPageProps {
  loaderData: {
    postMeta: StrapiPostMeta;
    markdown: string;
  };
}

const BlogDetailsPage = ({ loaderData }: BlogDetailsPageProps) => {
  const { postMeta } = loaderData;

  const formattedDate = formatDate(postMeta.date);
  const mins = readingTime(postMeta.body);

  return (
    <section className="my-10 md:my-15">
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
            <ReactMarkdown>{postMeta.body}</ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogDetailsPage;
