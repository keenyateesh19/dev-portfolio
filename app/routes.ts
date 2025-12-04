import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/layouts/main.tsx", [
    index("routes/home/index.tsx"),
    route("about", "routes/about/index.tsx"),
    route("contact", "routes/contact/index.tsx"),
    route("projects", "routes/projects/index.tsx"),
    route("blogs", "routes/blogs/index.tsx"),
  ]),
] satisfies RouteConfig;
