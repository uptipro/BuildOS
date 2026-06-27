import type { Project } from "./types";

// A tiny in-memory store for construction projects fetched from the backend.
// It lets the synchronous `getProjectById` helper (used widely across the
// construction pages) return real, backend-sourced projects without every page
// having to fetch independently. The project list/detail pages populate this
// store after fetching; consumers read from it.
let cache: Project[] = [];

export function setProjectsCache(projects: Project[]): void {
  cache = projects;
}

export function upsertProjectCache(project: Project): void {
  const index = cache.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    cache = [...cache.slice(0, index), project, ...cache.slice(index + 1)];
  } else {
    cache = [...cache, project];
  }
}

export function getCachedProject(id: string): Project | undefined {
  return cache.find((p) => p.id === id);
}

export function getCachedProjects(): Project[] {
  return cache;
}
