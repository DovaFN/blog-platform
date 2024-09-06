import { useMemo } from 'react'

import Form from '../../components/Form/Form'
import { loginUser } from '../../reducers/authReducer'
import { SignInPageOptions as inputsOptions } from '../validatioRules/rules'
import { createInput } from '../../utilities/functions'

function SignInPage() {
  const page = useMemo(
    () => ({
      inputArr: [
        createInput('email', 'Email address', 'Email address'),
        createInput('password', 'Password', 'Password', 'password'),
      ],
      onSubmit: () => {},
      link: { to: '/sign-up', linkText: 'Sign Up.', linkDescription: 'Don’t have an account?' },
      header: 'Sign In',
      submitText: 'Login',
      inputsOptions,
      dispatchFn: loginUser,
    }),
    []
  )

  return <Form {...page} />
}

export default SignInPage
