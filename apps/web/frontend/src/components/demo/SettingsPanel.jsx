import React, { useEffect, useState } from 'react'
import { Key } from 'lucide-react'

const STORAGE_KEY = 'withoutbg_api_key'

/**
 * SettingsPanel component for API key configuration
 * @param {Object} props
 * @param {'local' | 'api'} props.processingType - Processing type
 * @param {string} props.apiKey - API key value
 * @param {Function} props.onApiKeyChange - Callback when API key changes
 */
export const SettingsPanel = ({
    processingType,
    apiKey,
    onApiKeyChange
}) => {
    const [storageUpdateTrigger, setStorageUpdateTrigger] = useState(0)

    // Load stored API key whenever switching to API mode and field is empty
    useEffect(() => {
        if (processingType === 'api') {
            const storedKey = localStorage.getItem(STORAGE_KEY)
            // Load from storage if there's a stored key and current field is empty
            if (storedKey && !apiKey) {
                onApiKeyChange(storedKey)
            }
        }
    }, [processingType]) // Only depend on processingType to reload when switching tabs

    // Only show settings panel when in API mode
    if (processingType !== 'api') {
        return null
    }

    // Check if current key is stored in localStorage
    // Using storageUpdateTrigger to force re-render when storage changes
    const storedKey = localStorage.getItem(STORAGE_KEY)
    const isStored = storedKey === apiKey && apiKey !== '' && storageUpdateTrigger >= 0

    const handleRemember = () => {
        localStorage.setItem(STORAGE_KEY, apiKey)
        // Force a re-render by incrementing the trigger
        setStorageUpdateTrigger(prev => prev + 1)
    }

    const handleRemove = () => {
        localStorage.removeItem(STORAGE_KEY)
        onApiKeyChange('')
        // Force a re-render
        setStorageUpdateTrigger(prev => prev + 1)
    }

    // Show Remember button when: user has entered a key AND it's not stored
    const showRememberButton = apiKey && !isStored
    // Show Remove button when: key is stored
    const showRemoveButton = isStored

    return (
        <>
            <div className="mb-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        API Key <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => onApiKeyChange(e.target.value)}
                        placeholder="sk_..."
                        className="w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500"
                        required
                    />

                    {/* Remember and Remove buttons */}
                    {(showRememberButton || showRemoveButton) && (
                        <div className="mt-3 flex gap-2">
                            {showRememberButton && (
                                <button
                                    onClick={handleRemember}
                                    className="px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 bg-purple-50 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                                >
                                    Remember
                                </button>
                            )}
                            {showRemoveButton && (
                                <button
                                    onClick={handleRemove}
                                    className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                >
                                    Forget
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {!apiKey && (
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg">
                        <p className="text-sm text-yellow-900 dark:text-yellow-200 flex items-center gap-2">
                            <Key className="w-4 h-4 flex-shrink-0" />
                            <span>API key is required for API processing. Get yours at{' '}
                                <a href="https://withoutbg.com?utm_source=docker_app&utm_medium=web&utm_campaign=self_hosted&utm_content=settings_panel" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-700 dark:hover:text-yellow-300 font-medium">
                                    withoutbg.com
                                </a>
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

