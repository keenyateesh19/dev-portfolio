import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home/index.tsx"),
    route("about", "routes/about/index.tsx"),
    route("contact", "routes/contact/index.tsx"),
    route("projects", "routes/projects/index.tsx"),
    route("blogs", "routes/blogs/index.tsx")
] satisfies RouteConfig;
