import { combineSlices, configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articlesReducer'
import authSlice from './authReducer'

const rootReducer = combineSlices(authSlice, articlesSlice, {
  articles: articlesSlice.reducer,
  auth: authSlice.reducer,
})

export default rootReducer
