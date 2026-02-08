import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    if (userData && post.userId !== userData.$id) {
                        navigate("/", { state: { error: "You are not authorized to edit this post." } });
                        return;
                    }
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate, userData])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost