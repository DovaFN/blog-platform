import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { ConfigProvider, Button } from 'antd'
import classNames from 'classnames'

import { uniqName } from '../../utilities/functions'
import Loader from '../Loader/Loader'
import { clearSucceedMsg } from '../../reducers/articlesReducer'

import classnames from './ArticleForm.module.scss'

function ArticleForm({ header, submitText, inputArr, dispatchFn, defaultValues, inputsOptions, tagsArr }) {
  const dispatch = useDispatch()

  const [tagsArray, setTagsArray] = useState(tagsArr)
  const { errorMsg, loading, succeedMsg } = useSelector((state) => state.rootReducer.articles)

  const { slug } = useParams()

  useEffect(() => {
    setTimeout(() => dispatch(clearSucceedMsg()), 5000)
  }, [succeedMsg])

  const {
    register,
    handleSubmit,
    formState: { errors },
    unregister,
  } = useForm({ mode: 'onChange', reValidateMode: 'onChange', defaultValues })

  const onSubmit = (data) => {
    dispatch(dispatchFn({ payload: data, slug }))
  }

  const handleDelete = (name) => {
    if (tagsArray.length !== 1) {
      unregister(name)
      setTagsArray(() => tagsArray.filter((item) => item.name !== name))
    }
  }

  const handleAddTag = () => {
    const tagsCopy = tagsArray.slice()
    tagsCopy.push({ name: `${uniqName()}`, value: '' })
    setTagsArray(tagsCopy)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className={classnames.container}>
      <header className={classnames.header}>{header}</header>
      <form id={submitText} onSubmit={handleSubmit(onSubmit)} className={classnames.form}>
        {errorMsg && <p className={classnames.error}>{errorMsg}</p>}
        {succeedMsg && <p className={classnames.succeed}>{succeedMsg}</p>}
        {inputArr.map((item) => {
          const { inputName } = item
          return (
            <InputArticle register={register} key={inputName} errors={errors} inputsOptions={inputsOptions} {...item} />
          )
        })}
      </form>
      <div className={classnames.tags}>
        <p>Tags</p>
        {tagsArray.map((item) => (
          <Tag register={register} key={item.name} {...item} handleDelete={handleDelete} />
        ))}
        <button className={classnames.addTag} onClick={handleAddTag} type="button">
          Add tag
        </button>
      </div>
      <div className={classnames.footer}>
        <SubmitButton onSubmit={onSubmit} handleSubmit={handleSubmit} submitText={submitText} />
      </div>
    </div>
  )
}

function Tag({ name, handleDelete, register }) {
  return (
    <div className={classnames.tagContainer}>
      <input name={name} type="text" placeholder="Tag" className={classnames.tag} {...register(name)} />
      <button onClick={() => handleDelete(name)} className={classnames.deleTag} type="button">
        Delete
      </button>
    </div>
  )
}

function SubmitButton({ handleSubmit, onSubmit, submitText }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            contentFontSize: '16px',
            paddingBlock: '8px 141px',
            contentLineHeight: '24px',
          },
        },
      }}
    >
      <Button onClick={handleSubmit(onSubmit)} size="large" type="primary">
        <div className={classnames.submit}>{submitText}</div>
      </Button>
    </ConfigProvider>
  )
}

function InputArticle({ placeholder, inputName, inputTitle, errors, register, type, inputsOptions }) {
  const inputClass = classNames({
    [classnames.input]: true,
    [classnames['input-text']]: inputName === 'body',
  })

  const containerClass = classNames({
    [classnames.inputContainer]: inputName !== 'body',
    [classnames['inputContainer-text']]: inputName === 'body',
  })

  return (
    <label className={containerClass}>
      <p>{inputTitle}</p>
      {(inputName !== 'body' && (
        <input
          placeholder={placeholder}
          className={inputClass}
          type={type}
          name={inputName}
          {...register(inputName, inputsOptions[inputName])}
        />
      )) || (
        <textarea
          name={inputName}
          placeholder={placeholder}
          className={inputClass}
          {...register(inputName, inputsOptions[inputName])}
        />
      )}
      {errors[inputName] && <p className={classnames.error}>{errors[inputName].message}</p>}
    </label>
  )
}

export default ArticleForm
