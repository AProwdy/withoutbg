import React from 'react'
import { Upload } from 'lucide-react'

/**
 * ImageUploadZone component for drag-and-drop file upload
 * @param {Object} props
 * @param {Object} props.getRootProps - react-dropzone root props
 * @param {Object} props.getInputProps - react-dropzone input props
 * @param {boolean} props.isDragActive - Whether drag is active
 * @param {number} props.maxUploads - Maximum number of files allowed
 */
export const ImageUploadZone = ({ getRootProps, getInputProps, isDragActive, maxUploads }) => {
    return (
        <div>
            <div
                {...getRootProps()}
                className={`border-4 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${isDragActive
                    ? 'border-purple-500 bg-purple-500/10 dark:bg-purple-500/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/50 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
            >
                <input {...getInputProps()} />
                <div className="mb-4">
                    <Upload className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
                </div>
                {isDragActive ? (
                    <p className="text-xl text-purple-600 dark:text-purple-400 font-medium">Drop your images here...</p>
                ) : (
                    <>
                        <p className="text-xl text-gray-900 dark:text-gray-200 font-medium mb-2">
                            Drag & drop images here
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            or click to select files (max {maxUploads})
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            Supported formats: PNG, JPEG, WebP
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}
