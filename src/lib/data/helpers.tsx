import { t } from 'i18next'

export function validate(formData) {
  let validationErrors = {}

  if (formData.email.trim().length === 0) {
    validationErrors = {
      ...validationErrors,
      email: t('common.error.requiredField', {
        field: t('registerScreen.form.email')
      })
    }
  }
  if (formData.name.trim().length === 0) {
    validationErrors = {
      ...validationErrors,
      name: t('common.error.requiredField', {
        field: t('registerScreen.form.name')
      })
    }
  }
  if (formData.lastName.trim().length === 0) {
    validationErrors = {
      ...validationErrors,
      lastName: t('common.error.requiredField', {
        field: t('registerScreen.form.lastName')
      })
    }
  }
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

  return {
    validationOk: Object.keys(validationErrors).length === 0,
    validationErrors
  }
}
