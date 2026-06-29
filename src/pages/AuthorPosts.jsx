import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Container, PostCard, Button, Error } from '../components'
import { parseError } from '../utils/parseError'

const POSTS_PER_PAGE = 4

function AuthorPosts() {
    const { authorId } = useParams()
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPosts, setTotalPosts] = useState(0)
    const [authorName, setAuthorName] = useState('')
    const [error, setError] = useState('')

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

    useEffect(() => {
        setLoading(true)
        setError('')
        const offset = (page - 1) * POSTS_PER_PAGE
        appwriteService.getUserPosts(authorId, { limit: POSTS_PER_PAGE, offset })
            .then((result) => {
                setPosts(result.documents)
                setTotalPosts(result.total)
                if (result.documents.length > 0 && !authorName) {
                    setAuthorName(result.documents[0].authorName || 'Unknown Author')
                }
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setError(parseError(error))
                setLoading(false)
            })
    }, [authorId, page])

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

    if (error) {
        return (
            <Container>
                <Error message={error} onRetry={() => { setPage(1); setError('') }} />
            </Container>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-6 sm:py-8 mt-4 text-center px-4">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[40vh] sm:min-h-[50vh] glass-panel bg-white rounded-xl p-5 sm:p-8 max-w-2xl mx-auto border border-gray-100 shadow-lg">
                        <div className="text-5xl sm:text-6xl mb-4">📭</div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">No posts found</h1>
                        <p className="text-slate-500 text-sm sm:text-base">This author hasn't published any posts yet.</p>
                        <Button onClick={() => navigate('/all-posts')} className="mt-4">Browse All Posts</Button>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-6 sm:py-8'>
            <Container>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
                    Posts by <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">{authorName}</span>
                </h1>
                <p className="text-slate-500 text-sm mb-6 sm:mb-8">{totalPosts} post{totalPosts !== 1 ? 's' : ''} published</p>

                <div key={page} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
                    {posts.map((post, index) => (
                        <div key={post.$id} className='animate-slide-up' style={{ animationDelay: `${index * 100}ms` }}>
                            <PostCard {...post} showAuthor={false} />
                        </div>
                    ))}
                </div>

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
                        <span className="text-sm font-medium text-slate-600">Page {page} of {totalPages}</span>
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

export default AuthorPosts
