import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [])

    const visiblePosts = posts.filter((post) => post.userId === userData?.$id)

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[50vh]">
                        <div className="loader mb-4 border-t-blue-500"></div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
                            Loading posts...
                        </h1>
                    </div>
                </Container>
            </div>
        )
    }

    if (visiblePosts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[50vh] glass-panel bg-white/80 rounded-xl p-8 max-w-2xl mx-auto border border-gray-100 shadow-lg">
                        <div className="text-6xl mb-4">📭</div>
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">
                            No posts found
                        </h1>
                        <p className="text-slate-500">
                            Create a post to see it here!
                        </p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {visiblePosts.map((post, index) => (
                        <div
                            key={post.$id}
                            className='animate-slide-up'
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts