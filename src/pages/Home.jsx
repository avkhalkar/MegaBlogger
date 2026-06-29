import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import appwriteService from "../appwrite/config";
import { Container, PostCard, Error, Button } from '../components'
import { parseError } from '../utils/parseError'

const POSTS_PER_PAGE = 4

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPosts, setTotalPosts] = useState(0)
    const [activeTab, setActiveTab] = useState('published')
    const [error, setError] = useState('')

    const userData = useSelector((state) => state.auth.userData)
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

    useEffect(() => {
        if (authStatus && userData) {
            setLoading(true)
            setError('')
            const offset = (page - 1) * POSTS_PER_PAGE
            const status = activeTab === 'published' ? 'active' : 'inactive'
            appwriteService.getUserPosts(userData.$id, { limit: POSTS_PER_PAGE, offset, status })
                .then((result) => {
                    setPosts(result.documents)
                    setTotalPosts(result.total)
                    setLoading(false)
                })
                .catch((err) => {
                    console.error(err)
                    setError(parseError(err))
                    setLoading(false)
                })
        } else {
            setPosts([])
            setTotalPosts(0)
            setLoading(false)
        }
    }, [authStatus, userData, page, activeTab])

    const switchTab = (tab) => {
        setActiveTab(tab)
        setPage(1)
    }

    const handleStatusToggle = (postId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
        appwriteService.updatePost(postId, { status: newStatus })
            .then(() => setPosts((prev) => prev.filter((p) => p.$id !== postId)))
            .catch((err) => console.error(err))
    }

    if (!authStatus) {
        return (
            <div className="w-full py-6 sm:py-8 mt-4 text-center px-4">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[40vh] sm:min-h-[50vh] glass-panel bg-white rounded-xl p-5 sm:p-8 max-w-2xl mx-auto border border-gray-100 shadow-lg">
                        <div className="text-5xl sm:text-6xl mb-4">🔒</div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                            Please login to view your posts
                        </h1>
                        <Button
                            onClick={() => navigate("/login")}
                            className="mt-4"
                        >
                            Login
                        </Button>
                        <p className="text-slate-500 my-5 text-sm sm:text-base">
                            You need to be logged in to see your personalized feed.
                        </p>
                    </div>
                </Container>
            </div>
        )
    }

    if (error) {
        return (
            <Container>
                <Error message={error} onRetry={() => { setError(''); setPage(1) }} />
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

    return (
        <div className='w-full py-6 sm:py-8'>
            <Container>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 sm:mb-6">Your Posts</h1>

                {/* Tab Switcher */}
                <div className="flex gap-2 mb-6 sm:mb-8 p-1 bg-gray-100 rounded-lg w-fit">
                    <button
                        onClick={() => switchTab('published')}
                        className={`px-5 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${activeTab === 'published' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Published
                    </button>
                    <button
                        onClick={() => switchTab('drafts')}
                        className={`px-5 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${activeTab === 'drafts' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Drafts
                    </button>
                </div>

                {posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[30vh] glass-panel bg-white rounded-xl p-5 sm:p-8 max-w-2xl mx-auto border border-gray-100 shadow-lg text-center">
                        <div className="text-5xl sm:text-6xl mb-4">{activeTab === 'published' ? '📝' : '🗒️'}</div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                            {activeTab === 'published' ? 'No published posts yet' : 'No drafts yet'}
                        </h2>
                        <p className="text-slate-500 text-sm sm:text-base">
                            {activeTab === 'published' ? 'Be the first to create a post!' : 'Save a post as inactive to see it here.'}
                        </p>
                    </div>
                ) : (
                    <div key={`${activeTab}-${page}`} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
                        {posts.map((post, index) => (
                            <div
                                key={post.$id}
                                className='animate-slide-up'
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <PostCard {...post} showAuthor={false} onStatusToggle={handleStatusToggle} />
                            </div>
                        ))}
                    </div>
                )}

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

export default Home