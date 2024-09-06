import ArticleForm from '../../components/ArticleForm/ArticleForm'
import useArticle from '../../hooks/useArticle'
import { EditArticlePageOptions as inputsOptions } from '../validatioRules/rules'
import { updateArticle } from '../../reducers/articlesReducer'
import { createInput, uniqName } from '../../utilities/functions'

function EditArticlePage() {
  const singleArticle = useArticle()

  const { title, description, body, tagList } = singleArticle
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

  return <ArticleForm {...page} />
}

export default EditArticlePage
