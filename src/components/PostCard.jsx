import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <div className='w-full'>
      <Link to={`/post/${$id}`}>
        <div className='glass-panel bg-white/70 rounded-xl p-4 hover-lift h-full flex flex-col border border-gray-100/50 shadow-sm hover:shadow-xl transition-all duration-300'>
          <div className='w-full justify-center mb-4 overflow-hidden rounded-lg aspect-video'>
            <img
              src={appwriteService.getFileView(featuredImage)}
              alt={title}
              className='w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500'
            />
          </div>
          <h2 className='text-xl font-bold text-slate-800'>{title}</h2>
        </div>
      </Link>
    </div>
  )
}


export default PostCard