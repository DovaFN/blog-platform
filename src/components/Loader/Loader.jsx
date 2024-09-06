import { Oval } from 'react-loader-spinner'

import classnames from './Loader.module.scss'

function Loader() {
  return (
    <div className={classnames.loader}>
      <Oval
        visible
        height="80"
        width="80"
        color="#1890ff"
        secondaryColor="03325e"
        ariaLabel="oval-loading"
        wrapperStyle={{ margin: '0 auto' }}
        wrapperClass=""
      />
    </div>
  )
}

export default Loader
