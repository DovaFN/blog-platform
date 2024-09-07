import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import Loader from '../components/Loader/Loader'
import { getArticles, selectArticlesState } from '../reducers/articlesReducer'
import { selectUsername } from '../reducers/authReducer'
import Articles from '../components/Articles/Articles'
import Paginate from '../components/Paginate/Paginate'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'

function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const userName = useSelector(selectUsername)
  const currentPage = searchParams.get('page')

  const dispatch = useDispatch()
  const { hasError, loading, articles, totalPages, errorMsg } = useSelector(selectArticlesState)

  const onSetPage = (page = 1) => {
    const params = {
      page,
    }
    setSearchParams(params)
  }

  const succeedLoaded = !loading && !hasError

  useEffect(() => {
    dispatch(getArticles(currentPage))
  }, [currentPage, userName])

  return (
    <>
      {(succeedLoaded && <Articles hasError={hasError} loading={loading} articles={articles} />) ||
        (loading && <Loader />) || <ErrorMessage message={errorMsg} />}
      <Paginate onSetPage={onSetPage} currentPage={currentPage} totalPages={totalPages} />
    </>
  )
}

export default ArticlesPage
