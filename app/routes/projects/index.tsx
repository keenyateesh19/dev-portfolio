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
  const [categorySelect, setCategorySelect] = useState("All");
  const { projects } = loaderData as { projects: Project[] };
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];
  const filteredProjects = categorySelect === 'All' ? projects : projects.filter((project) => project.category === categorySelect);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className="text-3xl text-white font-bold mb-8">🚀 Projects</h2>
      <div className="flex gap-2 my-4">
        {categories.map((category) => (
          <button
            className={`cursor-pointer py-2 px-4 rounded ${category === categorySelect ? "font-bold bg-blue-500 hover:bg-blue-600" : "bg-gray-800 hover:bg-gray-900"}`}
            onClick={() => {
              setCategorySelect(category);
              setCurrentPage(1);
            }}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentProjects.map((project) => (<ProjectCard project={project} key={project.id} />))}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default projectsPage;
