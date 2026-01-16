"use client";

import React, { useEffect, useState, useCallback } from "react";
import { JobCard } from "./components/job-card";
import { FilterState } from "./types";
import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { JobDetailPanel } from "./components/job-detail-panel";
import { useJobs } from "./hooks/useJobs";
import { DEFAULT_FILTERS } from "./constants";

export default function Home() {
    const [draftFilters, setDraftFilters] = useState<FilterState>(DEFAULT_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState<FilterState>(DEFAULT_FILTERS);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const [languages, setLanguages] = useState<{ code: string, name: string }[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const { jobs, totalJobs, loading, offset, setOffset, fetchJobs, size, setSize, search, loadMore } = useJobs();

    // Theme toggle
    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return newMode;
        });
    }, []);

    const updateDraftFilters = useCallback((newFilters: Partial<FilterState>) => {
        setDraftFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    // Initial fetch and Languages
    useEffect(() => {
        fetchJobs(appliedFilters, true);
        fetch('/api/languages')
            .then(res => res.json())
            .then(data => setLanguages(data))
            .catch(err => console.error('Failed to fetch languages:', err));
    }, []);

    // Search handler (Commits draft to applied and resets)
    const handleSearch = () => {
        setAppliedFilters(draftFilters);
        search(draftFilters);
    };

    // Load more handler
    const handleLoadMore = () => {
        loadMore(appliedFilters);
    };

    // Effect for infinite scroll/pagination (when offset changes)
    useEffect(() => {
        if (offset > 0) {
            fetchJobs(appliedFilters, false);
        }
    }, [offset, fetchJobs, appliedFilters]);

    // Refetch when size changes
    useEffect(() => {
        fetchJobs(appliedFilters, true);
    }, [size]);

    return (
        <div className="h-screen flex flex-col bg-gray-50 dark:bg-black transition-colors duration-300 overflow-hidden">
            <Header
                toggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
                toggleSidebar={() => setIsSidebarOpen(prev => !prev)}
                filters={draftFilters}
                setFilters={updateDraftFilters}
                onSearch={handleSearch}
                languages={languages}
                size={size}
                setSize={setSize}
            />
            {/* Mobile Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                filters={draftFilters}
                setFilters={updateDraftFilters}
                onSearch={handleSearch}
                languages={languages}
                size={size}
                setSize={setSize}
            />

            {/* Main Content Area - Split View */}
            <main className="grow flex overflow-hidden w-full max-w-480 mx-auto relative">
                {/* Left Sidebar - Job List */}
                <div className="w-full md:w-112.5 shrink-0 flex flex-col border-r border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-black/50 transition-all duration-300">
                    <div className="p-4 border-b border-gray-200 dark:border-white/5">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
                                Results
                            </h2>
                            <span className="text-xs text-zinc-500">{jobs.length} jobs found</span>
                            <span className="text-xs text-zinc-500">{totalJobs} total jobs</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {jobs.length === 0 && !loading && (
                            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                                No jobs found. Try adjusting your filters.
                            </div>
                        )}

                        <ul className="space-y-4">
                            {jobs.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    isSelected={selectedJobId === job.id}
                                    onClick={() => setSelectedJobId(job.id)}
                                />
                            ))}
                        </ul>

                        {jobs.length > 0 && (
                            <div className="mt-8 flex justify-center pb-8">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loading}
                                    className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-gray-700 dark:text-gray-200 font-medium disabled:opacity-50"
                                >
                                    {loading ? 'Loading...' : 'Load More Jobs'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Job Details (Desktop) */}
                <div className="hidden md:flex flex-1 min-w-0 bg-white dark:bg-black relative">
                    {selectedJobId ? (
                        <div className="absolute inset-0 z-10">
                            <JobDetailPanel
                                jobId={selectedJobId}
                                onClose={() => setSelectedJobId(null)}
                            />
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 p-8 text-center bg-gray-50/50 dark:bg-zinc-900/20">
                            <div className="w-24 h-24 mb-6 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center">
                                <span className="text-4xl">👈</span>
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-zinc-300 mb-2">Select a job to view details</h3>
                            <p className="max-w-md">Click on any job card from the list on the left to view the full description and requirements here.</p>
                        </div>
                    )}
                </div>

                {/* Mobile Job Detail Modal (Overlay) */}
                {selectedJobId && (
                    <div className="fixed inset-0 z-50 md:hidden bg-white dark:bg-black animate-in slide-in-from-bottom duration-300">
                        <JobDetailPanel
                            jobId={selectedJobId}
                            onClose={() => setSelectedJobId(null)}
                        />
                    </div>
                )}
            </main>
            <Footer />
        </div >
    );
}