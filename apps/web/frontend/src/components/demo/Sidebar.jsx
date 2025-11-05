import React, { useEffect } from 'react'
import { Header } from './Header'
import { ThemeSwitcher } from '../ThemeSwitcher'

/**
 * Sidebar component with navigation
 */
export const Sidebar = ({ activeTab, onTabChange, isOpen, onToggle }) => {
    const navItems = [
        { id: 'remove-bg', label: 'Remove Background', enabled: true },
        { id: 'generate-sticker', label: 'Generate Sticker', enabled: false },
        { id: 'shadow-generator', label: 'Shadow Generator', enabled: false }
    ]

    // Handle click on navigation items to close sidebar on mobile
    const handleNavClick = (itemId) => {
        onTabChange(itemId)
        // Close sidebar on mobile after selection
        if (window.innerWidth < 768) {
            onToggle()
        }
    }

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        if (!isOpen || window.innerWidth >= 768) return

        const handleClickOutside = (e) => {
            const sidebar = document.getElementById('sidebar')
            const toggleButton = document.getElementById('sidebar-toggle')
            if (sidebar && !sidebar.contains(e.target) && toggleButton && !toggleButton.contains(e.target)) {
                onToggle()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, onToggle])

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
                    onClick={onToggle}
                />
            )}

            {/* Collapse button for desktop - positioned on the border, outside sidebar */}
            {isOpen && (
                <button
                    onClick={onToggle}
                    className="hidden md:flex fixed top-20 left-64 -translate-x-1/2 p-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all shadow-lg items-center justify-center z-[60]"
                    aria-label="Collapse sidebar"
                    title="Collapse sidebar"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {/* Sidebar */}
            <div
                id="sidebar"
                className={`w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen fixed left-0 top-0 overflow-y-auto z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Close button for mobile */}
                <button
                    onClick={onToggle}
                    className="absolute top-4 right-4 md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    aria-label="Close sidebar"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6">
                    <Header />
                </div>

                <nav className="px-4 space-y-2">
                    {navItems.map((item) => {
                        const isDisabled = !item.enabled
                        return (
                            <button
                                key={item.id}
                                onClick={() => !isDisabled && handleNavClick(item.id)}
                                disabled={isDisabled}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${isDisabled
                                    ? 'cursor-not-allowed text-gray-500 dark:text-gray-500'
                                    : activeTab === item.id
                                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium">{item.label}</span>
                                    {isDisabled && (
                                        <span className="text-xs mt-0.5">In the next release</span>
                                    )}
                                </div>
                            </button>
                        )
                    })}
                </nav>

                <div className="mt-8 px-4">
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <div className="text-center">
                            <a
                                href="https://github.com/withoutbg/withoutbg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                            >
                                <span className="text-sm">View on GitHub</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 px-4 pb-6">
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex justify-center">
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

