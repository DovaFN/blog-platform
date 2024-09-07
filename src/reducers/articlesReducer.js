/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { current, createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

// const getInitialState = () => {
//   let storageSingleArticles = localStorage.getItem('singleArticle')
//   if (storageSingleArticles) {
//     storageSingleArticles = JSON.parse(storageSingleArticles)
//   }
//   return {
//     articles: [''],
//     loading: false,
//     totalPages: '',
//     hasError: false,
//     succeedMsg: ''
//     singleArticle: (storageSingleArticles.length && storageSingleArticles) || {
//   }
// }

// console.log(getInitialState())

const initState = {
  articles: '',
  loading: false,
  totalPages: '',
  hasError: false,
  singleArticle: localStorage.getItem('singleArticle')
    ? JSON.parse(localStorage.getItem('singleArticle'))
    : {
        author: { username: '', image: '' },
        body: '',
        createdAt: '',
        description: '',
        favorited: false,
        favoritesCount: 0,
        slug: '',
        tagList: [''],
        title: '',
      },
  succeedMsg: '',
  errorMsg: '',
}

const getArticles = createAsyncThunk('articles/getArticles', async (page) => {
  const apiKey = localStorage.getItem('token')
  if (page === null) {
    page = 1
  }
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${page * 5 - 5}`, {
      headers: {
        Authorization: `Token ${apiKey}`,
      },
    })
    if (response.ok) {
      const jsonResponse = await response.json()
      return jsonResponse
    }
    if (!response.ok) {
      throw new Error(`We have Error, Response Status >> ${response.status}`)
    }
  } catch (err) {
    throw new Error(err.message)
  }
})

const getSingleArticle = createAsyncThunk('articles/getSingleArticle', async (slug) => {
  const apiKey = localStorage.getItem('token')
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: {
        Authorization: `Token ${apiKey}`,
      },
    })
    if (response.ok) {
      const jsonResponse = await response.json()

      localStorage.setItem('singleArticle', JSON.stringify(jsonResponse.article))
      return jsonResponse
    }
    if (!response.ok) {
      throw new Error(`We have Error, Response Status >> ${response.status}`)
    }
  } catch (err) {
    throw new Error(err.message)
  }
})

const postArticle = createAsyncThunk('articles/postArticle', async (data) => {
  const { title, description, body, ...tagsObj } = data.payload

  const tagList = Object.values(tagsObj)
  const apiKey = localStorage.getItem('token')
  const requestBody = JSON.stringify({ article: { title, description, body, tagList } })

  try {
    const response = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${apiKey}`,
      },
      body: `${requestBody}`,
    })
    if (response.ok) {
      const jsonResponse = await response.json()
      return jsonResponse
    }
    if (!response.ok) {
      throw new Error(`We have Error, Response Status >> ${response.status}`)
    }
  } catch (err) {
    throw new Error(err.message)
  }
})

const deleteArticle = createAsyncThunk('articles/deleteArticle', async (slug) => {
  const apiKey = localStorage.getItem('token')

  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${apiKey}`,
      },
    })
    if (response.ok) {
      localStorage.removeItem('currentArticle')
    }
    if (!response.ok) {
      throw new Error(`We have Error, Response Status >> ${response.status}`)
    }
  } catch (err) {
    throw new Error(err.message)
  }
})

const updateArticle = createAsyncThunk('articles/updateArticle', async (data) => {
  const { payload, slug } = data
  const { body, title, description, ...tags } = payload
  const tagList = Object.values(tags)
  const apiKey = localStorage.getItem('token')

  const requestBody = JSON.stringify({ article: { title, description, body, tagList, slug } })

  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${apiKey}`,
      },
      body: `${requestBody}`,
    })
    if (response.ok) {
      const jsonResponse = await response.json()

      return jsonResponse
    }
    if (!response.ok) {
      throw new Error(`We have Error, Response Status >> ${response.status}`)
    }
  } catch (err) {
    throw new Error(err.message)
  }
})

const likeArticle = createAsyncThunk('articles/likeArticle', async (slug) => {
  const apiKey = localStorage.getItem('token')

  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
      },
    })
    if (response.ok) {
      const jsonResponse = await response.json()

      return jsonResponse
    }
    if (!response.ok) {
      throw new Error(`We have Error, Response Status >> ${response.status}`)
    }
  } catch (err) {
    throw new Error(err.message)
  }
})

const dislikeArticle = createAsyncThunk('articles/dislikeArticle', async (slug) => {
  const apiKey = localStorage.getItem('token')

  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${apiKey}`,
      },
    })
    if (response.ok) {
      const jsonResponse = await response.json()

      return jsonResponse
    }
    if (!response.ok) {
      throw new Error(`We have Error, Response Status >> ${response.status}`)
    }
  } catch (err) {
    throw new Error(err.message)
  }
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState: initState,
  reducers: {
    clearSucceedMsg: (state, action) => {
      state.succeedMsg = ''
    },
    resetArticles: (state, action) => {
      state.hasError = false
      state.errorMsg = ''
      state.succeedMsg = ''
    },
    resetSingleArticle: (state, action) => {
      localStorage.removeItem('singleArticle')
      state.singleArticle = initState.singleArticle
    },
  },
  selectors: {
    selectSuccedMsg: createSelector((state) => state.succeedMsg),
  },
  extraReducers: (builder) => {
    builder.addCase(getArticles.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getArticles.fulfilled, (state, action) => {
      state.articles = action.payload.articles
      state.loading = false
      if (!state.totalPages) {
        state.totalPages = action.payload.articlesCount
      }
    })
    builder.addCase(getArticles.rejected, (state, action) => {
      state.loading = false
      state.errorMsg = action.error.message
      state.hasError = true
    })
    builder.addCase(updateArticle.pending, (state, action) => {
      localStorage.removeItem('singleArticle')
      state.singleArticle = initState.singleArticle
      state.loading = true
    })
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.singleArticle = action.payload.article
      localStorage.setItem('singleArticle', JSON.stringify(action.payload.article))
      state.succeedMsg = 'Successfully Updated'
      state.loading = false
    })
    builder.addCase(updateArticle.rejected, (state, action) => {
      state.loading = false
      state.succeedMsg = 'Successfully updated an Article'
      state.hasError = true
    })
    builder.addCase(getSingleArticle.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getSingleArticle.fulfilled, (state, action) => {
      state.singleArticle = action.payload.article
      state.loading = false
    })
    builder.addCase(getSingleArticle.rejected, (state, action) => {
      state.loading = false
      state.hasError = true
    })
    builder.addCase(postArticle.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(postArticle.fulfilled, (state, action) => {
      const { article } = action.payload
      state.succeedMsg = 'Successfully Created'
      state.singleArticle = article
      state.loading = false
    })
    builder.addCase(postArticle.rejected, (state, action) => {
      state.loading = false

      state.errorMsg = action.error.message
      state.hasError = true
    })
    builder.addCase(deleteArticle.pending, (state, action) => {
      state.singleArticle = ''
      state.loading = true
    })
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      state.singleArticle = initState.singleArticle
      state.loading = false
    })
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.loading = false
      state.errorMsg = action.error.message
      state.hasError = true
    })

    builder.addCase(likeArticle.fulfilled, (state, action) => {
      const { article } = action.payload
      const { articles } = state

      const idx = articles.findIndex((el) => el.slug === article.slug)

      state.singleArticle = article
      state.articles = [...articles.slice(0, idx), article, ...articles.slice(idx + 1)]
    })
    builder.addCase(likeArticle.rejected, (state, action) => {
      state.loading = false
      state.errorMsg = action.error.message
      state.hasError = true
    })
    builder.addCase(dislikeArticle.fulfilled, (state, action) => {
      const { article } = action.payload
      const { articles } = state

      const idx = articles.findIndex((el) => el.slug === article.slug)

      state.singleArticle = article
      state.articles = [...articles.slice(0, idx), article, ...articles.slice(idx + 1)]
    })
    builder.addCase(dislikeArticle.rejected, (state, action) => {
      state.loading = false
      state.errorMsg = action.error.message
      state.hasError = true
    })
  },
})

const { clearSucceedMsg, resetArticles, resetSingleArticle } = articlesSlice.actions

export {
  getArticles,
  getSingleArticle,
  postArticle,
  updateArticle,
  clearSucceedMsg,
  deleteArticle,
  resetArticles,
  likeArticle,
  dislikeArticle,
  resetSingleArticle,
}

export const selectArticlesState = (state) => state.rootReducer.articles
export const selectAuthorName = (state) => state.rootReducer.articles.singleArticle.author.username
export const selectSlug = (state) => state.rootReducer.articles.singleArticle.slug

export default articlesSlice
