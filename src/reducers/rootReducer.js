import { combineSlices, configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articlesReducer'
import authSlice from './authReducer'

const rootReducer = combineSlices({
  articles: articlesSlice.reducer,
  auth: authSlice.reducer,
})

export default rootReducer
