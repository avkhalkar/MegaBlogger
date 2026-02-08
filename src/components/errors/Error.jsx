function Error({ message = "Something went wrong", error, className = "", onRetry }) {
    console.error("Error Component Caught:", error || message);

    return (
        <div className={`w-full py-8 text-center ${className}`}>
            <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200 mx-auto max-w-2xl">
                <div className="text-red-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Error</h3>
                <p className="text-red-600 mb-6">{message}</p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    )
}

export default Error
