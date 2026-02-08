import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="py-8 w-full text-center">
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
                <p className="text-lg text-gray-500 mb-8">This url doesn't exist</p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Go back to Home
                </Link>
            </div>
        </div>
    )
}

export default NotFound
