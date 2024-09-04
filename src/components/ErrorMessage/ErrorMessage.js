import classnames from './ErrorMessage.module.scss'

function ErrorMessage({ message }) {
  return <p className={classnames.error}>{message}</p>
}

export default ErrorMessage
