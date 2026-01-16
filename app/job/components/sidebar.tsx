import React, { useState, useRef, useEffect } from "react";

import { SidebarProps } from "../types";

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, filters, setFilters, languages, onSearch, size, setSize }) => {
    const [showLanguageSuggestions, setShowLanguageSuggestions] = useState(false);
    const languageWrapperRef = useRef<HTMLDivElement>(null);
    const { query, language, skill, status } = filters;

    const updateFilter = (key: keyof typeof filters, value: string) => {
        setFilters({ [key]: value });
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (languageWrapperRef.current && !languageWrapperRef.current.contains(event.target as Node)) {
                setShowLanguageSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredLanguages = languages?.filter(lang =>
        lang.name.toLowerCase().includes((language || '').toLowerCase())
    ) || [];

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Sidebar Panel */}
            <aside
                className={`fixed top-0 z-50 h-[calc(100vh-4rem)] mt-16 w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-800 transition-[left] duration-300 overflow-y-auto ${isOpen ? "left-0" : "-left-64"
                    } md:hidden`}
            >
                <div className="p-6 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Filters</h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Keyword
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    value={query}
                                    onChange={(e) => updateFilter('query', e.target.value)}
                                    placeholder="e.g. Designer"
                                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:text-white mb-4"
                                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                                />

                                <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Language
                                </label>
                                <div className="relative mb-4" ref={languageWrapperRef}>
                                    <input
                                        type="text"
                                        id="language"
                                        value={language || ''}
                                        onChange={(e) => {
                                            updateFilter('language', e.target.value);
                                            setShowLanguageSuggestions(true);
                                        }}
                                        onFocus={() => setShowLanguageSuggestions(true)}
                                        placeholder="Type to search language..."
                                        className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:text-white"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                setShowLanguageSuggestions(false);
                                                onSearch();
                                            }
                                        }}
                                        autoComplete="off"
                                    />
                                    {showLanguageSuggestions && (
                                        <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                                            {filteredLanguages.length > 0 ? (
                                                filteredLanguages.map((lang) => (
                                                    <button
                                                        key={lang.code}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                                                        onClick={() => {
                                                            updateFilter('language', lang.name);
                                                            setShowLanguageSuggestions(false);
                                                        }}
                                                    >
                                                        {lang.name}
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                    No languages found
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <label htmlFor="skill" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Skill/Role
                                </label>
                                <input
                                    type="text"
                                    id="skill"
                                    value={skill || ''}
                                    onChange={(e) => updateFilter('skill', e.target.value)}
                                    placeholder="e.g. Design systems"
                                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:text-white mb-4"
                                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                                />

                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => updateFilter('status', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:text-white"
                                >
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </select>

                                <label htmlFor="pageSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 mt-4">
                                    Items per page
                                </label>
                                <select
                                    id="pageSize"
                                    value={size}
                                    onChange={(e) => setSize(Number(e.target.value))}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:text-white"
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>

                            <button
                                onClick={onSearch}
                                className="w-full py-2 px-4 bg-linear-to-r from-orange-500 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};
