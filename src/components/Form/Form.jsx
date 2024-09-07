/* eslint-disable no-unused-expressions */
import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Checkbox, Button, ConfigProvider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { clearSucceedMsg, selectAuthState, selectUsername } from '../../reducers/authReducer'
import Loader from '../Loader/Loader'

import classnames from './Form.module.scss'

function Form({ inputArr, link = {}, header, submitText, inputsOptions, dispatchFn, defaultValues }) {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(true)

  const { errorMessage, succeedMsg, serverErrors, loading } = useSelector(selectAuthState)
  const username = useSelector(selectUsername)

  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({ mode: 'onChange', reValidateMode: 'onChange', defaultValues })

  const onSubmit = (data) => {
    if (checked) {
      dispatch(dispatchFn(data))
    }
  }

  useEffect(() => {
    const entries = Object.entries(serverErrors)
    entries.forEach((el) => {
      setError(el[0], { message: el[1] })
    })
  }, [serverErrors])

  useEffect(() => {
    setTimeout(() => dispatch(clearSucceedMsg()), 3000)
  }, [succeedMsg])

  if (loading) {
    return <Loader />
  }

  if (username && location.pathname !== '/profile') {
    return <Navigate to="/" />
  }

  return (
    <div className={classnames.container}>
      <header className={classnames.header}>{header}</header>
      <form id={submitText} onSubmit={handleSubmit(onSubmit)} className={classnames.form}>
        {errorMessage && <p className={classnames.failedError}>{errorMessage}</p>}
        {succeedMsg && <p className={classnames.succeed}>{succeedMsg}</p>}
        {inputArr.map((item) => {
          const { inputName } = item
          return (
            <InputAuth
              register={register}
              inputsOptions={inputsOptions}
              getValues={getValues}
              key={inputName}
              errors={errors}
              {...item}
            />
          )
        })}
        <input type="submit" style={{ display: 'none' }} />
        {submitText === 'Create' && <AgreeCheckbox checked={checked} setChecked={setChecked} />}
      </form>
      <div className={classnames.footer}>
        <SubmitButton onSubmit={onSubmit} handleSubmit={handleSubmit} submitText={submitText} />
        {link && <RedirectLink link={link} />}
      </div>
    </div>
  )
}

function InputAuth({ placeholder, inputName, inputTitle, type, getValues, errors, register, inputsOptions }) {
  return (
    <label className={classnames.inputContainer}>
      <p>{inputTitle}</p>
      <input
        placeholder={placeholder}
        className={classnames.input}
        type={type}
        name={inputName}
        {...register(
          inputName,
          inputsOptions[inputName] || {
            validate: (value) => value === getValues('password') || 'Passwords must match',
            required: { value: true, message: 'Required field' },
          }
        )}
      />
      {errors[inputName] && <p className={classnames.error}>{errors[inputName].message}</p>}
    </label>
  )
}

function RedirectLink({ link }) {
  const { linkDescription, to, linkText } = link
  return (
    <p className={classnames.redirect}>
      {linkDescription}{' '}
      <Link className={classnames.link} to={to}>
        {linkText}
      </Link>
    </p>
  )
}

function AgreeCheckbox({ checked, setChecked }) {
  return (
    <div className={classnames.checkBoxWrapper}>
      <Checkbox
        checked={checked}
        name="notification"
        onChange={(e) => setChecked(e.target.checked)}
        className={classnames.checkBox}
      >
        <p className={classnames.checkboxText}>I agree to the processing of my personal information</p>
        {!checked && <p className={classnames.requiredErr}>Required </p>}
      </Checkbox>
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
            paddingBlock: '8px',
            contentLineHeight: '24px',
          },
        },
      }}
    >
      <Button onClick={handleSubmit(onSubmit)} size="large" classNames={classnames.submit} type="primary">
        {submitText}
      </Button>
    </ConfigProvider>
  )
}

export default Form
