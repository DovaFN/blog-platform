import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { resetArticles } from '../../reducers/articlesReducer'
import { resetAuth } from '../../reducers/authReducer'

function Resetter({ children }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetAuth())
    dispatch(resetArticles())
  }, [children])
  return children
}

export default Resetter
