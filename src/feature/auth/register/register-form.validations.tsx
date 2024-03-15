import { RegisterFormFields, ValidationErrors } from '@lib/data/models'
import { t } from 'i18next'

let validationErrors: ValidationErrors

const registerFormValidation = (
  formData: RegisterFormFields,
  serverError?: string
) => {
  const requiredFields = Object.keys(formData) as (keyof RegisterFormFields)[]
  validationErrors = {}

  requiredFields.forEach(field => {
    if (formData[field].trim().length === 0) {
      validationErrors[field] = t('common.error.requiredField', {
        field: t(`registerScreen.form.${field}`)
      })
    }
  })

  if (formData.password.trim().length < 6) {
    validationErrors = {
      ...validationErrors,
      password: t('common.error.minLengthField', {
        field: t('registerScreen.form.password'),
        number: 6
      })
    }
  }
  if (formData.confirmPassword !== formData.password) {
    validationErrors = {
      ...validationErrors,
      confirmPassword: t('common.error.notSamePassword')
    }
  }
  if (serverError?.includes('email-already-in-use')) {
    validationErrors = {
      ...validationErrors,
      email: t('common.error.emailAlreadyUsed')
    }
  }

  return {
    validationOk: Object.keys(validationErrors).length === 0,
    validationErrors
  }
}

export { registerFormValidation }
