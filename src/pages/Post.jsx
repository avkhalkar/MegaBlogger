import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { getReadingTime } from "../utils/readingTime";

export default function Post() {
    const [post, setPost] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (!slug) { navigate("/"); return; }
        appwriteService.getPost(slug)
            .then(setPost)
            .catch(() => setNotFound(true));
    }, [slug, navigate]);

    const deletePost = () => {
        if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;
        appwriteService.deletePost(post.$id)
            .then(() => {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            })
            .catch((error) => console.error("Delete failed:", error));
    };

    if (notFound) {
        return (
            <div className="py-8">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[50vh] glass-panel bg-white/80 rounded-xl p-8 max-w-2xl mx-auto border border-gray-100 shadow-lg text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Post Not Found</h1>
                        <p className="text-slate-500 mb-6">This post doesn't exist or may have been removed.</p>
                        <Button onClick={() => navigate("/all-posts")}>Browse All Posts</Button>
                    </div>
                </Container>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="w-full py-6 sm:py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[50vh]">
                        <div className="loader mb-4"></div>
                        <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
                            Loading post...
                        </h1>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="py-4 sm:py-8">
            <Container>
                <div className='w-full mb-4 sm:mb-6 glass-panel p-2 sm:p-4 rounded-xl relative'>
                    <div className="w-full flex justify-center overflow-hidden rounded-xl aspect-video relative">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover object-center"
                        />
                        {isAuthor && (
                            <div className="absolute right-2 sm:right-4 top-2 sm:top-4 flex space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="hover:bg-green-600 transition-colors shadow-lg text-sm sm:text-base px-3 sm:px-6 py-1.5 sm:py-2.5">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" className="hover:bg-red-600 transition-colors shadow-lg text-sm sm:text-base px-3 sm:px-6 py-1.5 sm:py-2.5" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full mb-4 sm:mb-6 glass-panel bg-white/80 p-4 sm:p-8 rounded-xl border border-gray-100/50 shadow-md">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">{post.title}</h1>
                    <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
                        <p className="text-sm text-slate-500">
                            Posted by <span className="font-medium text-slate-700">{post.authorName || "Unknown Author"}</span>
                        </p>
                        <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
                            ⏱️ {getReadingTime(post.content)} min read
                        </span>
                    </div>
                    <div className="prose-content text-slate-700 text-base sm:text-lg">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    );
}

// {parse(post.content)} returnns react element converts HTML string to react element