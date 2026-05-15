import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../lib/auth-store';
import { projectsApi, initializeApi } from '../lib/api';

interface Project {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { user, token, clearAuth } = useAuthStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    initializeApi();
    if (!token) {
      router.push('/auth/login');
      return;
    }
    loadProjects();
  }, [token]);

  const loadProjects = async () => {
    try {
      const response = await projectsApi.list();
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    setCreating(true);
    try {
      const response = await projectsApi.create(newProjectName);
      setProjects([response.data, ...projects]);
      setNewProjectName('');
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    router.push('/auth/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">socialCOPE</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-2 text-sm bg-gray-200 text-gray-900 rounded hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Projects</h2>

        <form onSubmit={handleCreateProject} className="mb-8 p-4 bg-gray-50 rounded border border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="New project name..."
              disabled={creating}
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-gray-900"
            />
            <button
              type="submit"
              disabled={creating}
              className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 disabled:bg-gray-500"
            >
              {creating ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>

        {projects.length === 0 ? (
          <div className="p-6 bg-gray-50 rounded border border-gray-200 text-center">
            <p className="text-gray-600">No projects yet. Create one to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="p-4 border border-gray-200 rounded hover:shadow-lg cursor-pointer">
                <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                {project.description && (
                  <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                )}
                <p className="text-xs text-gray-500">Created {new Date(project.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
