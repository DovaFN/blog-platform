/* eslint-disable no-alert */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uniqid from 'uniqid'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import heartIcon from '../../icons/Vector.svg'
import redHeartIcon from '../../icons/path4.svg'
import profileImg from '../../icons/Rectangle 1.svg'
import { likeArticle, dislikeArticle } from '../../reducers/articlesReducer'

import classnames from './ArticlesItem.module.scss'

function ArticlesItem(props) {
  const { username: currentUser } = useSelector((state) => state.rootReducer.auth.user)

  const dispatch = useDispatch()
  const { title, description, author, tagList, createdAt, slug, disabled, favorited, favoritesCount } = props
  const { username, image } = author
  const [redirect, setRedirect] = useState(false)
  const [like, setLike] = useState(favorited)

  const likesCounter = favoritesCount || 0

  const isDisabledLikes = !currentUser
  const handleLike = () => {
    if (isDisabledLikes) {
      alert('You have to login first')
    } else {
      setLike(() => !like)

      if (!like) {
        dispatch(likeArticle(slug))
      }
      if (like) {
        dispatch(dislikeArticle(slug))
      }
    }
  }

  const tags = tagList.map((item) => (
    <li className={classnames.wrap} key={uniqid()}>
      <span className={classnames.tag}>{item}</span>
    </li>
  ))

  const date = format(new Date(Date.parse(createdAt)), 'MMMM dd, yyyy')

  return (
    <div className={classnames.item}>
      <div className={classnames.left}>
        <header className={classnames.header}>
          {(!disabled && (
            <Link className={classnames.title} to={`${slug}`}>
              {title}
            </Link>
          )) || <p className={classnames.title}>{title}</p>}
          <button className={classnames.btn} onClick={handleLike} type="button">
            <img src={like ? redHeartIcon : heartIcon} alt="like icon" />
            {likesCounter}
          </button>
        </header>
        <ul className={classnames.tagsList}>{tags}</ul>
        <p className={classnames.description}>{description}</p>
      </div>
      <div className={classnames.right}>
        <div>
          <header className={classnames.name}>{username}</header>
          <span className={classnames.date}>{date}</span>
        </div>
        <img className={classnames.avatar} src={image || profileImg} alt="" />
      </div>
    </div>
  )
}

export default ArticlesItem
