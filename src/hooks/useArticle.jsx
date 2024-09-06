import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getSingleArticle } from '../reducers/articlesReducer'

export default function useArticle() {
  const dispatch = useDispatch()
  const { singleArticle } = useSelector((state) => state.rootReducer.articles)
  const { username } = useSelector((state) => state.rootReducer.auth.user)
  const { slug } = useParams()
  useEffect(() => {
    dispatch(getSingleArticle(slug))
  }, [slug, username])

  return singleArticle
}
