import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Popconfirm } from 'antd'
import Markdown from 'markdown-to-jsx'

import { deleteArticle } from '../../reducers/articlesReducer'
import Loader from '../../components/Loader/Loader'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import useArticle from '../../hooks/useArticle'
import ArticlesItem from '../../components/ArticlesItem/ArticlesItem'

import classnames from './SingleArticlePage.module.scss'

function SingleArticlePage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { username: currentUsername } = useSelector((state) => state.rootReducer.auth.user)
  const { loading, hasError, errorMsg } = useSelector((state) => state.rootReducer.articles)

  const singleArticle = useArticle()

  const succeedLoaded = !loading && !hasError

  const handleDelete = () => {
    dispatch(deleteArticle(slug))
  }

  if (singleArticle) {
    const { body, ...itemProps } = singleArticle

    const { username } = singleArticle.author
    const markdown = <Markdown>{body}</Markdown>

    return (
      <div className={classnames.container}>
        <div>
          {succeedLoaded && username === currentUsername && <EditBtn />}
          {succeedLoaded && username === currentUsername && <DeleteBtn handleDelete={handleDelete} />}

          {(succeedLoaded && <ArticlesItem disabled {...itemProps} />) || (loading && <Loader />) || (
            <ErrorMessage message={errorMsg} />
          )}
        </div>
        {succeedLoaded && <ArticleBody markdown={markdown} />}
      </div>
    )
  }
  if (!singleArticle) {
    return <Navigate to="/" />
  }
}

function EditBtn() {
  return (
    <Link to="edit">
      <button type="button" className={classnames.edit}>
        Edit
      </button>
    </Link>
  )
}

function DeleteBtn({ handleDelete }) {
  const title = 'Are you sure to delete this article?'

  return (
    <Popconfirm placement="rightTop" title={title} okText="Yes" cancelText="No" onConfirm={handleDelete}>
      <button type="button" className={classnames.delete}>
        Delete
      </button>
    </Popconfirm>
  )
}

function ArticleBody({ markdown }) {
  return <div className={classnames.body}>{markdown}</div>
}

export default SingleArticlePage
