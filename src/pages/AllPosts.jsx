import { useState, useEffect } from 'react'
import { Container, PostCard, Button, Error } from '../components'
import appwriteService from "../appwrite/config";
import { parseError } from "../utils/parseError";

const POSTS_PER_PAGE = 4

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPosts, setTotalPosts] = useState(0)
    const [error, setError] = useState('')

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

    useEffect(() => {
        setLoading(true)
        setError('')
        const offset = (page - 1) * POSTS_PER_PAGE
        appwriteService.getPosts({ limit: POSTS_PER_PAGE, offset })
            .then((result) => {
                setPosts(result.documents)
                setTotalPosts(result.total)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setError(parseError(error))
                setLoading(false)
            })
    }, [page])

    if (error) {
        return (
            <Container>
                <Error message={error} onRetry={() => { setPage(1); setError('') }} />
            </Container>
        )
    }

    if (loading) {
        return (
            <div className="w-full py-6 sm:py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[40vh] sm:min-h-[50vh]">
                        <div className="loader mb-4"></div>
                        <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
                            Loading posts...
                        </h1>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-6 sm:py-8 mt-4 text-center px-4">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[40vh] sm:min-h-[50vh] glass-panel bg-white rounded-xl p-5 sm:p-8 max-w-2xl mx-auto border border-gray-100 shadow-lg">
                        <div className="text-5xl sm:text-6xl mb-4">📭</div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                            No posts found
                        </h1>
                        <p className="text-slate-500 text-sm sm:text-base">
                            Create a post to see it here!
                        </p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-6 sm:py-8'>
            <Container>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 sm:mb-8">All Posts</h1>
                <div key={page} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                    {posts.map((post, index) => (
                        <div
                            key={post.$id}
                            className='animate-slide-up'
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
                        <Button
                            onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                            disabled={page === 1}
                            className={`px-4 py-2 text-sm ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            bgColor="bg-gray-200"
                            textColor="text-slate-700"
                        >
                            ← Previous
                        </Button>
                        <span className="text-sm font-medium text-slate-600">
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                            disabled={page === totalPages}
                            className={`px-4 py-2 text-sm ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            bgColor="bg-gray-200"
                            textColor="text-slate-700"
                        >
                            Next →
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts