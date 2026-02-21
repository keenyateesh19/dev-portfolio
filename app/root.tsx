import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import PageBackground from "./components/PageBackground";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Audiowide&display=swap",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Yateesh S | Dev Blogs and Project Showcase" },
    {
      name: "description",
      content:
        "Welcome to my portfolio. I'm Yateesh S, a freelance Web Designer & Developer showcasing my projects and skills.",
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-950 text-white">
        <PageBackground fixed />
        <main className="*:max-w-7xl *:mx-auto *:px-6 ">{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  const title = is404 ? "404" : "Error";
  const headline = is404 ? "Page not found" : "Something went wrong";
  const description = is404
    ? "The page you're looking for doesn't exist or has been moved."
    : isRouteErrorResponse(error)
      ? error.statusText || "An unexpected error occurred."
      : import.meta.env.DEV && error instanceof Error
        ? error.message
        : "An unexpected error occurred.";

  const stack =
    !is404 && import.meta.env.DEV && error instanceof Error
      ? error.stack
      : undefined;

  return (
    <div className="relative h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center text-center px-6">
      {/* Decorative large number */}
      <span
        className="pointer-events-none absolute select-none font-display font-bold text-white/5 leading-none"
        style={{ fontSize: "clamp(12rem, 40vw, 28rem)" }}
        aria-hidden="true"
      >
        {title}
      </span>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Badge */}
        <span className="glass px-4 py-1 text-sm font-mono tracking-widest text-zinc-300 uppercase">
          {title}
        </span>

        {/* Heading */}
        <h1 className="font-display bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          {headline}
        </h1>

        {/* Description */}
        <p className="text-zinc-400 max-w-md">{description}</p>

        {/* Dev stack trace */}
        {stack && (
          <pre className="glass text-left text-xs text-zinc-400 w-full max-w-2xl p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}

        {/* CTA */}
        <Link to="/" className="btn-primary mt-2">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
