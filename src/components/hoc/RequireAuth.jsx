import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RequireAuth({ children }) {
  const location = useLocation()
  const { username } = useSelector((state) => state.rootReducer.auth.user)

  if (!username) {
    return <Navigate to="/" />
  }

  return children
}

export default RequireAuth
