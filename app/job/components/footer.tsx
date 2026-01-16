import React from "react";

export const Footer = () => {
    return (
        <footer className="w-full py-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} Torre Jobs. All rights reserved.</p>
            </div>
        </footer>
    );
};
