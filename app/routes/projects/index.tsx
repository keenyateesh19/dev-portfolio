import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/index";
import type { Project } from "~/types";
import { useState } from "react";
import Pagination from "~/components/Pagination";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch("http://localhost:8000/projects");
  const projects = await res.json();

  return { projects };
}

const projectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);


  return (
    <>
      <h2 className="text-3xl text-white font-bold mb-8">🚀 Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentProjects.map((project) => (
          <ProjectCard project={project} key={project.id}/>
        ))}
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />}
    </>
  );
};

export default projectsPage;
