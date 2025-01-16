"use client";
import { useEffect, useState } from 'react';

export default function NavBar() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
            <span className="text-xl font-bold text-black dark:text-white">Footium Player Manager</span>
            <button
                className="rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-3 py-1"
                onClick={() => setIsDarkMode(!isDarkMode)}
            >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </nav>
    );
}