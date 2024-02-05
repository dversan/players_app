import { t } from 'i18next'
import { OnboardingFormData, User } from '../data/models'

function isValidNumber(min, max, value) {
  return (
    /^\d{1,2}$/.test(value) &&
    parseInt(value, 10) >= min &&
    parseInt(value, 10) <= max
  )
}

export interface ValidationFields extends OnboardingFormData, User {
  password: string
  confirmPassword: string
}

function registerFormValidation(formData) {
  let validationErrors: ValidationFields

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

function loginFormValidation(formData) {
  let validationErrors = {}

  if (formData.email.trim().length === 0) {
    validationErrors = {
      ...validationErrors,
      email: t('common.error.requiredField', {
        field: t('registerScreen.form.email')
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

  return {
    validationOk: Object.keys(validationErrors).length === 0,
    validationErrors
  }
}

function OnboardingStepsValidation(formData) {
  let validationErrors = {}

  if (formData.playerNumber === 0) {
    validationErrors = {
      ...validationErrors,
      number: t('common.error.requiredField', {
        field: t('onboardingScreen.playerNumberField')
      })
    }
  }

  if (!isValidNumber(0, 100, Number(formData.playerNumber))) {
    validationErrors = {
      ...validationErrors,
      number: t('common.error.requiredFieldNumber', {
        field: t('onboardingScreen.playerNumberField')
      })
    }
  }

  if (formData.playerNickname.trim().length === 0) {
    validationErrors = {
      ...validationErrors,
      nickName: t('common.error.requiredField', {
        field: t('registerScreen.form.name')
      })
    }
  }

  return {
    validationOk: Object.keys(validationErrors).length === 0,
    validationErrors
  }
}

export {
  registerFormValidation,
  loginFormValidation,
  OnboardingStepsValidation
}
