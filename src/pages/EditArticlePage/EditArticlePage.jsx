import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import ArticleForm from '../../components/ArticleForm/ArticleForm'
import useArticle from '../../hooks/useArticle'
import { EditArticlePageOptions as inputsOptions } from '../validatioRules/rules'
import { updateArticle } from '../../reducers/articlesReducer'
import { selectUsername } from '../../reducers/authReducer'
import { createInput, uniqName } from '../../utilities/functions'

function EditArticlePage() {
  const singleArticle = useArticle()

  const currentUser = useSelector(selectUsername)
  const { slug } = useParams()

  const { title, description, body, tagList, author } = singleArticle

  const { username } = author

  const defaultInputs = { title, description, body }

  const tagsArr =
    tagList && tagList.length
      ? tagList.map((el) => ({ value: el, name: `tag${uniqName()}` }))
      : [{ value: '', name: `tag${uniqName()}` }]

  const defaultTags = tagsArr.reduce((acc, dec) => {
    acc[dec.name] = dec.value
    return acc
  }, {})

  const defaultValues = { ...defaultInputs, ...defaultTags } || null

  const page = {
    inputArr: [
      createInput('title', 'Title', 'Title'),
      createInput('description', 'Title', 'Short description'),
      createInput('body', 'Text', 'Text', 'textarea'),
    ],
    header: 'Edit article',
    submitText: 'Send',
    inputsOptions,
    dispatchFn: updateArticle,
    defaultValues,
    tagsArr,
  }

  if (currentUser !== username) {
    return <Navigate to={`/articles/${slug}`} />
  }

  return <ArticleForm {...page} />
}

export default EditArticlePage
