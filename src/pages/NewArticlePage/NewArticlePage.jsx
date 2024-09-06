/* eslint-disable no-return-assign */
import { useMemo } from 'react'

import { NewArticlePageOptions as inputsOptions } from '../validatioRules/rules'
import { postArticle } from '../../reducers/articlesReducer'
import { createInput } from '../../utilities/functions'
import ArticleForm from '../../components/ArticleForm/ArticleForm'

function NewArticlePage() {
  const page = useMemo(
    () => ({
      inputArr: [
        createInput('title', 'Title', 'Title'),
        createInput('description', 'Title', 'Short description'),
        createInput('body', 'Text', 'Text', 'textarea'),
      ],
      header: 'Create new article',
      submitText: 'Send',
      inputsOptions,
      dispatchFn: postArticle,
      tagsArr: [{ value: '', name: `tag${0}` }],
    }),
    []
  )

  return <ArticleForm {...page} />
}

export default NewArticlePage
