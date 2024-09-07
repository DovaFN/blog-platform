import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RequireAuth({ children }) {
  const location = useLocation()
  const { username } = useSelector((state) => state.rootReducer.auth.user)
  const { slug } = useSelector((state) => state.rootReducer.articles.singleArticle)

  if (!username) {
    if (slug) {
      return <Navigate to={`/articles/${slug}`} />
    }
    return <Navigate to="/" />
  }

  return children
}

export default RequireAuth
