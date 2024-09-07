import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getSingleArticle, selectSingleArticle } from '../reducers/articlesReducer'
import { selectUsername } from '../reducers/authReducer'

export default function useArticle() {
  const dispatch = useDispatch()
  const singleArticle = useSelector(selectSingleArticle)
  const username = useSelector(selectUsername)
  const { slug } = useParams()

  useEffect(() => {
    dispatch(getSingleArticle(slug))
  }, [slug, username])

  return singleArticle
}
