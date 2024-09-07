import { useLocation, Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectUsername } from '../../reducers/authReducer'

function RequireAuth({ children }) {
  const userName = useSelector(selectUsername)
  const { slug } = useParams()

  if (!userName) {
    if (slug) {
      return <Navigate to={`/articles/${slug}`} />
    }
    return <Navigate to="/" />
  }

  return children
}

export default RequireAuth
