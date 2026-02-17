import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { Route } from "./+types/details";
import type { Project } from "~/types";
import { Link } from "react-router";

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs): Promise<Project> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${params.id}`);
  const project = await res.json();
  return project;
}

export function HydrateFallback() {
  return <div className="mx-auto">Loading Please wait...</div>;
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData;
  

  return (
    <>
      <Link to="/projects" className="inline-flex items-center text-blue-400 hover:text-blue-500 mb-6 transition">
        <FaArrowLeft className="mr-2" /> Go Back
      </Link>
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <img src={project.image} alt={project.title} />
        <div>
        <h1 className="text-3xl font-bold text-blue-400 mt-4">{project.title}</h1>
        <p className="text-gray-300 text-sm mb-4">
          {new Date(project.date).toLocaleString()} · {project.category}
        </p>
        <p className="text-gray-200 mb-6">{project.description}</p>

        <a href={project.url} target="_blank" className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition">View Live Site <FaArrowRight className="ml-2" /></a>
      </div>
      </div>
      
    </>
  );
};

export default ProjectDetailsPage;
