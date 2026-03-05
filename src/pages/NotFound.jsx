import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="py-8 w-full text-center px-4">
            <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
                <h1 className="text-7xl sm:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                    404
                </h1>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
                <p className="text-base sm:text-lg text-gray-500 mb-8">This url doesn't exist</p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 font-medium"
                >
                    Go back to Home
                </Link>
            </div>
        </div>
    )
}

export default NotFound
