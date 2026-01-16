'use client';

import React from 'react';

import { SearchFilterBarProps } from "../types";

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
    filters, setFilters, onSearch,
    languages,
    className,
    size, setSize
}) => {
    const { query, language, skill, status } = filters;

    const updateFilter = (key: keyof typeof filters, value: string) => {
        setFilters({ [key]: value });
    };
    return (
        <div className={`flex items-center gap-4 ${className || 'w-full bg-white/80 dark:bg-zinc-900/90 backdrop-blur-md border border-gray-200 dark:border-zinc-700/50 rounded-full p-2 pl-6 shadow-xl mb-8'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-zinc-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>

            {/* Main Search Input */}
            <input
                type="text"
                value={query}
                onChange={(e) => updateFilter('query', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                placeholder="Search by keyword"
                className="bg-transparent border-none outline-none text-gray-900 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-500 w-full md:w-32 text-sm"
            />

            <div className="h-6 w-px bg-gray-200 dark:bg-zinc-700 mx-1 hidden md:block"></div>
            <div className="flex-1 flex items-center gap-3 overflow-x-auto no-scrollbar mask-gradient pr-4">
                {/* Language Filter */}
                <div className="relative group shrink-0">
                    <input
                        list="languages-list-bar"
                        style={{}}
                        className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-xs px-4 py-2 rounded-full border border-gray-200 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-500 outline-none focus:border-yellow-500/50 focus:text-gray-900 dark:focus:text-white transition-all w-32 placeholder-gray-500 dark:placeholder-zinc-500"
                        placeholder="Language"
                        value={language}
                        onChange={(e) => {
                            updateFilter('language', e.target.value);
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                    />
                    <datalist id="languages-list-bar">
                        {languages?.map((lang) => (
                            <option key={lang.code} value={lang.name} />
                        ))}
                    </datalist>
                </div>

                {/* Skill Filter */}
                <div className="shrink-0 relative group">
                    <input
                        list="skills-list-bar"
                        style={{}}
                        className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-xs px-4 py-2 rounded-full border border-gray-200 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-500 outline-none focus:border-yellow-500/50 focus:text-gray-900 dark:focus:text-white transition-all w-32 placeholder-gray-500 dark:placeholder-zinc-500"
                        placeholder="Skill"
                        value={skill}
                        onChange={(e) => updateFilter('skill', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                    />
                    <datalist id="skills-list-bar">
                        <option value="Java" />
                        <option value="Python" />
                        <option value="JavaScript" />
                        <option value="React" />
                        <option value="Node.js" />
                        <option value="Design" />
                        <option value="Product" />
                        <option value="Communication" />
                    </datalist>
                </div>

                {/* Status Filter */}
                <div className="shrink-0 relative">
                    <select
                        value={status}
                        onChange={(e) => {
                            updateFilter('status', e.target.value);
                            onSearch();
                        }}
                        style={{}}
                        className="appearance-none bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-xs px-4 py-2 pr-8 rounded-full border border-gray-200 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-500 outline-none focus:border-yellow-500/50 focus:text-gray-900 dark:focus:text-white transition-all cursor-pointer"
                    >
                        <option value="open">Status: Open</option>
                        <option value="closed">Status: Closed</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none text-xs">▼</span>
                </div>


            </div>

            {/* Page Size Filter - Moved outside scrollable container */}
            <div className="shrink-0 relative hidden lg:block border-l border-gray-200 dark:border-zinc-700 pl-4 mr-2">
                <select
                    value={size}
                    onChange={(e) => {
                        setSize(Number(e.target.value));
                    }}
                    style={{}}
                    className="appearance-none bg-transparent text-gray-700 dark:text-zinc-300 text-xs px-2 py-1 pr-6 hover:text-gray-900 dark:hover:text-white outline-none cursor-pointer font-medium"
                    aria-label="Items per page"
                >
                    <option value="5">5 / page</option>
                    <option value="10">10 / page</option>
                    <option value="20">20 / page</option>
                </select>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none text-xs">▼</span>
            </div>

            <button
                onClick={onSearch}
                className="mr-2 p-2 bg-yellow-400 hover:bg-yellow-300 rounded-full text-zinc-900 shadow-lg shadow-yellow-500/20 transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </button>
        </div>
    );
}
