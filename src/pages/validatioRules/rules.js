/* eslint-disable no-useless-escape */
/* eslint-disable import/prefer-default-export */
const mailRegexp = /^([a-z0-9](?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
const urlRegexp =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/gm

const EditArticlePageOptions = {
  title: {
    required: {
      value: true,
      message: 'Required field',
    },
  },
  description: {
    required: {
      value: true,
      message: 'Required field',
    },
  },
  body: {
    required: {
      value: true,
      message: 'Required field',
    },
  },
}

const EditProfilePageOptions = {
  password: {
    minLength: {
      value: 6,
      message: 'Your password needs to be at least 6 characters.',
    },
    maxLength: {
      value: 40,
      message: 'Your password needs to be max 40 characters.',
    },
  },
  email: {
    pattern: {
      value: mailRegexp,
      message: 'Your email needs to be correct.',
    },
    required: {
      value: true,
      message: 'Required field',
    },
  },
  image: {
    pattern: {
      value: urlRegexp,
      message: 'Your url needs to be correct.',
    },
  },
  username: {
    minLength: {
      value: 3,
      message: 'Your username needs to be at least 3 characters.',
    },
    maxLength: {
      value: 20,
      message: 'Your username needs to be max 20 characters.',
    },
    required: {
      value: true,
      message: 'Required field',
    },
  },
}

const NewArticlePageOptions = {
  title: {
    required: {
      value: true,
      message: 'Required field',
    },
  },
  description: {
    required: {
      value: true,
      message: 'Required field',
    },
  },
  body: {
    required: {
      value: true,
      message: 'Required field',
    },
  },
}

const SignInPageOptions = {
  password: {
    required: {
      value: true,
      message: 'Required field',
    },
  },
  email: {
    pattern: {
      value: mailRegexp,
      message: 'Your email needs to be correct.',
    },
    required: {
      value: true,
      message: 'Required field',
    },
  },
}

const SignUpPageOptions = {
  password: {
    minLength: {
      value: 6,
      message: 'Your password needs to be at least 6 characters.',
    },
    maxLength: {
      value: 40,
      message: 'Your password needs to be max 40 characters.',
    },
    required: {
      value: true,
      message: 'Required field',
    },
  },
  email: {
    pattern: {
      value: mailRegexp,
      message: 'Your email needs to be correct.',
    },
    required: {
      value: true,
      message: 'Required field',
    },
  },
  username: {
    minLength: {
      value: 3,
      message: 'Your username needs to be at least 3 characters.',
    },
    maxLength: {
      value: 20,
      message: 'Your username needs to be max 20 characters.',
    },
    required: {
      value: true,
      message: 'Required field',
    },
  },
}

export { EditArticlePageOptions, EditProfilePageOptions, NewArticlePageOptions, SignInPageOptions, SignUpPageOptions }
