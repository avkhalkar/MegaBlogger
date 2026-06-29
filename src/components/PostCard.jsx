import appwriteService from "../appwrite/config"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getReadingTime } from '../utils/readingTime'

function PostCard({ $id, title, featuredImage, authorName, userId, content, status, showAuthor = true, onStatusToggle }) {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const isAuthor = userData ? userData.$id === userId : false;

  return (
    <div className='w-full'>
      <Link to={`/post/${$id}`}>
        <div className='glass-panel bg-white/70 rounded-xl p-3 sm:p-4 hover-lift h-full flex flex-col border border-gray-100/50 shadow-sm hover:shadow-xl transition-all duration-300 relative'>

          <div className='w-full justify-center mb-3 sm:mb-4 overflow-hidden rounded-lg aspect-video'>
            <img
              src={appwriteService.getFileView(featuredImage)}
              alt={title}
              className='w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500'
            />
          </div>
          <h2 className='text-lg sm:text-xl font-bold text-slate-800 line-clamp-2'>{title}</h2>
          <div className='mt-2 flex items-center justify-between gap-2 flex-wrap'>
            {showAuthor && (
              <div className='flex items-center gap-2 flex-wrap'>
                <p className='text-sm text-slate-500'>
                  Posted by{' '}
                  <span
                    className='font-medium text-slate-700 hover:text-blue-600 transition-colors'
                    onClick={(e) => { e.preventDefault(); navigate(`/author/${userId}`) }}
                  >
                    {authorName || "Unknown Author"}
                  </span>
                </p>
                {isAuthor && (
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 shadow-sm whitespace-nowrap">
                    🌟 You
                  </span>
                )}
              </div>
            )}
            <span className="text-[10px] bg-blue-50 text-blue-500 border border-blue-100 px-2 py-0.5 rounded-full font-medium whitespace-nowrap ml-auto">
              ⏱️ {getReadingTime(content)} min read
            </span>
          </div>
        {onStatusToggle && (
          <button
            onClick={(e) => { e.preventDefault(); onStatusToggle($id, status) }}
            className={`mt-3 w-full text-xs font-medium py-1.5 rounded-lg border transition-all duration-200 ${
              status === 'active'
                ? 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
            }`}
          >
            {status === 'active' ? '📥 Move to Drafts' : '🚀 Publish'}
          </button>
        )}
        </div>
      </Link>
    </div>
  )
}

export default PostCard