import React from 'react'

/**
 * Header component for the application
 */
export const Header = () => {
    return (
        <header className="text-center mb-8">
            <img
                src="/logo.png"
                alt="withoutbg logo"
                className="h-8 mx-auto mb-2 dark:brightness-0 dark:invert"
            />
            <p className="text-xl text-gray-700 dark:text-gray-300">
                Background Remover
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                brought to you by{' '}
                <a
                    href="https://withoutbg.com?utm_source=docker_app&utm_medium=web&utm_campaign=self_hosted&utm_content=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
                >
                    withoutbg.com
                </a>
            </p>

        </header>
    )
}


