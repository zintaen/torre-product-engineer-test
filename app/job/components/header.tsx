import React from "react";

import { HeaderProps } from "../types";
import { SearchFilterBar } from "./search-filter-bar";

export const Header: React.FC<HeaderProps> = ({
    toggleTheme, isDarkMode, toggleSidebar,
    filters, setFilters, onSearch,
    languages,
    size, setSize
}) => {
    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 shrink-0">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
                        aria-label="Toggle Sidebar"
                    >
                        <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent hidden sm:block">
                        Torre Jobs
                    </h1>
                    <h1 className="text-xl font-bold bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent sm:hidden">
                        T
                    </h1>
                </div>

                {/* Central Search Bar */}
                <div className="flex-1 max-w-4xl mx-auto hidden md:block">
                    <SearchFilterBar
                        filters={filters}
                        setFilters={setFilters}
                        onSearch={onSearch}
                        languages={languages}
                        size={size}
                        setSize={setSize}
                        className="w-full bg-gray-100/50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors border border-gray-200 dark:border-white/5 rounded-full px-4 py-1.5 shadow-sm"
                    />
                </div>

                <button
                    onClick={toggleTheme}
                    className="p-2 shrink-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Toggle Theme"
                >
                    {isDarkMode ? (
                        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </button>
            </div>


        </header>
    );
};
