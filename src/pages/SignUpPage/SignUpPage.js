import { useMemo } from 'react'

import { createUser } from '../../reducers/authReducer'
import { SignUpPageOptions as inputsOptions } from '../validatioRules/rules'
import Form from '../../components/Form/Form'
import { createInput } from '../../utilities/functions'

function SignUpPage() {
  const page = useMemo(
    () => ({
      inputArr: [
        createInput('username', 'Username', 'Username'),
        createInput('email', 'Email address', 'Email address'),
        createInput('password', 'Password', 'Password', 'password'),
        createInput('repeatPass', 'Repeat Password', 'Repeat Password', 'password'),
      ],
      link: {
        to: '/sign-in',
        linkText: 'Sign In',
        linkDescription: 'Already have an account?',
      },
      header: 'Create a new account',
      submitText: 'Create',
      inputsOptions,
      dispatchFn: createUser,
    }),
    []
  )

  return <Form {...page} />
}

export default SignUpPage
