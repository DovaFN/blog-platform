import uniqid from 'uniqid'

import ArticlesItem from '../ArticlesItem/ArticlesItem'
import Loader from '../Loader/Loader'

import classnames from './Articles.module.scss'

function Articles({ articles }) {
  const content =
    articles.length &&
    articles.map((item) => (
      <li className={classnames['list-item']} key={uniqid()}>
        <ArticlesItem {...item} />
      </li>
    ))

  return <ul className={classnames.list}>{content}</ul>
}

export default Articles
