import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    if (userData && post.userId !== userData.$id) {
                        navigate("/", { state: { error: "You are not authorized to view this post." } });
                        return;
                    }
                    setPost(post);
                } else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate, userData]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className='w-full mb-6 glass-panel p-4 rounded-xl relative'>
                    <div className="w-full flex justify-center overflow-hidden rounded-xl aspect-video relative">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover object-center"
                        />
                        {isAuthor && (
                            <div className="absolute right-4 top-4 flex space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="hover:bg-green-600 transition-colors shadow-lg">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" className="hover:bg-red-600 transition-colors shadow-lg" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full mb-6 glass-panel bg-white/80 p-8 rounded-xl border border-gray-100/50 shadow-md">
                    <h1 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">{post.title}</h1>
                    <div className="browser-css text-slate-700 leading-relaxed text-lg">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}

// {parse(post.content)} returnns react element converts HTML string to react element