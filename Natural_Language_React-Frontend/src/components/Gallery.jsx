import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaPlusCircle,
  FaWaveSquare,
  FaClock,
  FaEye,
  FaChartLine,
  FaTrash,
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
  FaMusic,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

export default function Gallery() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const backendUrl = "http://localhost:8000";

  // Handle project actions
  const handleViewProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleVisualizeProject = (projectId) => {
    navigate(`/visualize/${projectId}`);
  };

  const handleDeleteProject = async (projectId, projectName) => {
    if (window.confirm(`Are you sure you want to delete "${projectName}"? This action cannot be undone.`)) {
      try {
        const res = await fetch(`${backendUrl}/api/projects/${projectId}/delete/`, {
          method: 'DELETE',
        });
        
        if (res.ok) {
          alert('Project deleted successfully!');
          fetchProjects(page); // Refresh the current page
        } else {
          alert('Failed to delete project. Please try again.');
        }
      } catch (err) {
        console.error('Error deleting project:', err);
        alert('An error occurred while deleting the project.');
      }
    }
  };

  // Fetch projects from API
  const fetchProjects = async (pageNum = 1) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`http://localhost:8000/api/projects/?page=${pageNum}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();

      setProjects(data.results || []);
      setTotalPages(data.total_pages || 1);
      setTotalProjects(data.total_projects || 0);
      setPage(pageNum);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Load projects when page changes
  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  // Auto-refresh processing projects every 5 seconds
  useEffect(() => {
    const hasProcessing = projects.some((p) => p.is_processing);
    if (hasProcessing) {
      const interval = setInterval(() => {
        fetchProjects(page);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [projects, page]);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl text-black flex items-center gap-2">
              <FaThLarge /> Project Gallery
            </h1>
            <p className="text-gray-400">Total projects: {totalProjects}</p>
          </div>
          <button
            className="bg-white border hover:bg-blue-600 text-black px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => navigate("/create")}
          >
            <FaPlusCircle /> Create New Project
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="text-center py-20 text-gray-400">
            <FaSpinner className="animate-spin mx-auto text-6xl mb-4" />
            <h3 className="text-2xl">Loading projects...</h3>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20 text-red-500">
            <h3 className="text-2xl mb-2">{error}</h3>
          </div>
        )}

        {/* Projects */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col"
              >
                {/* Card header */}
                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
                  <h6 className="text-blue-500 font-medium">{project.name}</h6>
                  {project.is_processing ? (
                    <span
                      className="animate-pulse text-yellow-400"
                      title="Processing..."
                    >
                      Processing...
                    </span>
                  ) : (
                    <FaCheckCircle className="text-green-500" />
                  )}
                </div>

                {/* Card body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="mb-3 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <FaWaveSquare /> {project.get_wave_type_display || project.wave_type}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <FaClock />{" "}
                      {new Date(project.created_at).toLocaleString()}
                    </div>
                  </div>

                  {project.description && (
                    <p className="text-gray-300 mb-3">
                      {project.description.split(" ").slice(0, 15).join(" ")}...
                    </p>
                  )}

                  <div className="mb-3">
                    <small className="text-gray-400 block mb-1">Colors:</small>
                    <span
                      className="inline-block w-5 h-5 mr-1 rounded"
                      style={{ backgroundColor: project.background_color }}
                    />
                    <span
                      className="inline-block w-5 h-5 mr-1 rounded"
                      style={{ backgroundColor: project.positive_color }}
                    />
                    <span
                      className="inline-block w-5 h-5 mr-1 rounded"
                      style={{ backgroundColor: project.negative_color }}
                    />
                  </div>

                  {project.final_drawing && (
                    <div className="text-center mb-3">
                      <img
                        src={`${backendUrl}${project.final_drawing}`}
                        alt="Wave visualization"
                        className="mx-auto max-h-24 object-contain cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => window.open(`${backendUrl}${project.final_drawing}`, '_blank')}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Card footer */}
                <div className="flex gap-2 px-4 py-2 border-t border-gray-700">
                  <button 
                    onClick={() => handleViewProject(project.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex-1 flex items-center justify-center gap-2 transition-colors"
                  >
                    <FaEye /> View
                  </button>
                  {!project.is_processing && (
                    <button 
                      onClick={() => handleVisualizeProject(project.id)}
                      className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 rounded flex-1 flex items-center justify-center gap-2 transition-colors"
                    >
                      <FaChartLine /> Visualize
                    </button>
                  )}
                  <button 
                    onClick={() => handleDeleteProject(project.id, project.name)}
                    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded flex-1 flex items-center justify-center gap-2 transition-colors"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No projects */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <FaMusic className="mx-auto text-6xl mb-4" />
            <h3 className="text-2xl mb-2">No projects yet</h3>
            <p className="mb-4">
              Create your first audio wave visualization project!
            </p>
            <button
              className="bg-white hover:bg-blue-500 text-black px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
              onClick={() => navigate("/create")}
            >
              <FaPlusCircle /> Create Your First Project
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {page > 1 && (
              <>
                <button
                  onClick={() => setPage(1)}
                  className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  <FaAngleDoubleLeft />
                </button>
                <button
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  <FaAngleLeft />
                </button>
              </>
            )}

            <span className="px-3 py-1 bg-white text-black rounded">
              {page}
            </span>

            {page < totalPages && (
              <>
                <button
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  <FaAngleRight />
                </button>
                <button
                  onClick={() => setPage(totalPages)}
                  className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  <FaAngleDoubleRight />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
