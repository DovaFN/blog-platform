import { adjectives, colors, animals, uniqueNamesGenerator } from 'unique-names-generator'

const config = {
  dictionaries: [adjectives, colors, animals],
  separator: '',
  length: 2,
}

const uniqName = uniqueNamesGenerator.bind(null, config)

const createInput = (inputName, placeholder, inputTitle, type = 'text') => ({
  inputName,
  placeholder,
  inputTitle,
  type,
})

export { createInput, uniqName }
