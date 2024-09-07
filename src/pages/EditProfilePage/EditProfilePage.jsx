import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { EditProfilePageOptions as inputsOptions } from '../validatioRules/rules'
import { updateUser, selectCurrentUser } from '../../reducers/authReducer'
import { createInput } from '../../utilities/functions'
import Form from '../../components/Form/Form'

function EditProfilePage() {
  const { username, email, image } = useSelector(selectCurrentUser)

  const page = useMemo(
    () => ({
      inputArr: [
        createInput('username', 'Username', 'Username'),
        createInput('email', 'Email address', 'Email address'),
        createInput('password', 'New Password', 'New Password', 'password'),
        createInput('image', 'Avatar image', 'Avatar image (url)'),
      ],
      onSubmit: () => {},
      header: 'Edit Profile',
      submitText: 'Save',
      inputsOptions,
      dispatchFn: updateUser,
      defaultValues: {
        username,
        email,
        image: image || null,
      },
    }),
    []
  )

  return <Form {...page} />
}

export default EditProfilePage
