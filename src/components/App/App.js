import { Route, Routes, Navigate } from 'react-router-dom'

import ArticlesPage from '../../pages/ArticlesPage'
import EditArticlePage from '../../pages/EditArticlePage/EditArticlePage'
import EditProfilePage from '../../pages/EditProfilePage/EditProfilePage'
import Layout from '../Layout/Layout'
import NewArticlePage from '../../pages/NewArticlePage/NewArticlePage'
import SingleArticlePage from '../../pages/SingleArticlePage/SingleArticlePage'
import SignUpPage from '../../pages/SignUpPage/SignUpPage'
import SignInPage from '../../pages/SignInPage/SignInPage'
import RequireAuth from '../hoc/RequireAuth'
import Resetter from '../hoc/Resetter'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/articles" replace />} />
        <Route
          path="articles"
          element={
            <Resetter>
              <ArticlesPage />
            </Resetter>
          }
        />
        <Route
          path="new-article"
          element={
            <RequireAuth>
              <Resetter>
                <NewArticlePage />
              </Resetter>
            </RequireAuth>
          }
        />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <Resetter>
                <EditProfilePage />
              </Resetter>
            </RequireAuth>
          }
        />
        <Route
          path="articles/:slug/edit"
          element={
            <RequireAuth>
              <Resetter>
                <EditArticlePage />
              </Resetter>
            </RequireAuth>
          }
        />
        <Route
          path="sign-up"
          element={
            <Resetter>
              <SignUpPage />
            </Resetter>
          }
        />
        <Route
          path="sign-in"
          element={
            <Resetter>
              <SignInPage />
            </Resetter>
          }
        />
        <Route
          path="articles/:slug"
          element={
            <Resetter>
              <SingleArticlePage />
            </Resetter>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
