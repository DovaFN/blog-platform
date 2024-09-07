import { Outlet, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import profileImg from '../../icons/Rectangle 1.svg'
import { logOut, selectAvatar, selectUsername } from '../../reducers/authReducer'

import classnames from './Layout.module.scss'

function Layout() {
  const username = useSelector(selectUsername)
  const image = useSelector(selectAvatar)

  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <>
      <header className={classnames.header}>
        <Link className={classnames.title} to="/">
          Realworld Blog
        </Link>
        {!username && (
          <>
            <Link className={classnames.signIn} to="/sign-in">
              <span>Sign In</span>
            </Link>
            <Link className={classnames.signUp} to="/sign-up">
              <span>Sign Up</span>
            </Link>
          </>
        )}
        {username && (
          <>
            <Link className={classnames.newArticle} to="new-article">
              Create article
            </Link>
            <Link className={classnames.profile} to="profile">
              <header>{username}</header>
              <img className={classnames.avatar} src={image || profileImg} alt="" />
            </Link>
            <button onClick={handleLogOut} type="button" className={classnames.logOut}>
              <span>Log out</span>
            </button>
          </>
        )}
      </header>
      <Outlet />
    </>
  )
}

export default Layout
