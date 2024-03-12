import { t } from 'i18next'
import {
  FitnessFormData,
  ParametersFormData,
  PlayerData,
  PositionFormData,
  RegisterFormFields,
  User
} from '../data/models'

const isValidNumber = (min, max, value) => {
  return /^\d{1,2}$/ && parseInt(value) >= min && parseInt(value) <= max
}

export interface ValidationFields extends PlayerData, User {
  password: string
  confirmPassword: string
  requiredFields: string
  generalError: string
}

type ValidationErrors = {
  [key: keyof ValidationFields]: string
}

const registerFormValidation = formData => {
  let validationErrors: ValidationErrors = {}

  const requiredFields = Object.keys(formData) as (keyof RegisterFormFields)[]

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

  return {
    validationOk: Object.keys(validationErrors).length === 0,
    validationErrors
  }
}

const loginFormValidation = formData => {
  let validationErrors: ValidationErrors = {}

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

const resetPasswordFormValidation = (email: string) => {
  let validationErrors: ValidationErrors = {}

  if (email.trim().length === 0) {
    validationErrors = {
      ...validationErrors,
      email: t('common.error.requiredField', {
        field: t('registerScreen.form.email')
      })
    }
  }

  return {
    validationOk: Object.keys(validationErrors).length === 0,
    validationErrors
  }
}

// ############ First Step Validations ##################

const OnboardingPositionStepValidation = (formData: PositionFormData) => {
  let positionStepValidationErrors: ValidationErrors = {}

  if (formData.playerNumber === 0) {
    positionStepValidationErrors = {
      ...positionStepValidationErrors,
      playerNumber: t('common.error.requiredField', {
        field: t('onboardingScreen.playerNumber')
      })
    }
  }

  if (!isValidNumber(0, 99, Number(formData.playerNumber))) {
    positionStepValidationErrors = {
      ...positionStepValidationErrors,
      playerNumber: t('common.error.requiredFieldNumberWithRange', {
        field: t('onboardingScreen.playerNumber'),
        min: t('0'),
        max: t('99')
      })
    }
  }

  if (formData.playerNickname.trim().length === 0) {
    positionStepValidationErrors = {
      ...positionStepValidationErrors,
      playerNickname: t('common.error.requiredField', {
        field: t('registerScreen.form.name')
      })
    }
  }

  if (formData.mainPosition.trim().length === 0) {
    positionStepValidationErrors = {
      ...positionStepValidationErrors,
      mainPosition: t('common.error.requiredField', {
        field: t('onboardingScreen.mainPosition')
      })
    }
  }

  if (formData.secondPosition.trim().length === 0) {
    positionStepValidationErrors = {
      ...positionStepValidationErrors,
      secondPosition: t('common.error.requiredField', {
        field: t('onboardingScreen.secondPosition')
      })
    }
  }

  return {
    positionStepValidationOk:
      Object.keys(positionStepValidationErrors).length === 0,
    positionStepValidationErrors
  }
}
// ############ Second Step Validations ##################

const OnboardingFitnessStepValidation = (formData: FitnessFormData) => {
  let fitnessStepValidationErrors: ValidationErrors = {}

  if (formData.playerHeight === 0) {
    fitnessStepValidationErrors = {
      ...fitnessStepValidationErrors,
      playerHeight: t('common.error.requiredField', {
        field: t('common.text.height')
      })
    }
  }

  if (!isValidNumber(100, 300, Number(formData.playerHeight))) {
    fitnessStepValidationErrors = {
      ...fitnessStepValidationErrors,
      playerHeight: t('common.error.requiredFieldNumberWithRange', {
        field: t('common.text.height'),
        min: t('100'),
        max: t('300')
      })
    }
  }

  if (formData.playerWeight === 0) {
    fitnessStepValidationErrors = {
      ...fitnessStepValidationErrors,
      playerWeight: t('common.error.requiredField', {
        field: t('common.text.weight')
      })
    }
  }

  if (!isValidNumber(25, 200, Number(formData.playerWeight))) {
    fitnessStepValidationErrors = {
      ...fitnessStepValidationErrors,
      playerWeight: t('common.error.requiredFieldNumberWithRange', {
        field: t('common.text.weight'),
        min: t('25'),
        max: t('200')
      })
    }
  }

  if (formData.birthday?.toString().length === 0) {
    fitnessStepValidationErrors = {
      ...fitnessStepValidationErrors,
      birthday: t('common.error.requiredField', {
        field: t('onboardingScreen.birthdayLabel')
      })
    }
  }

  if (formData.gamesPerYearIndex === 0) {
    fitnessStepValidationErrors = {
      ...fitnessStepValidationErrors,
      gamesPerYearIndex: t('common.error.requiredField', {
        field: t('onboardingScreen.gamesLabel')
      })
    }
  }

  if (formData.competitionGamesIndex === 0) {
    fitnessStepValidationErrors = {
      ...fitnessStepValidationErrors,
      competitionGamesIndex: t('common.error.requiredField', {
        field: t('onboardingScreen.competitionGamesLabel')
      })
    }
  }

  return {
    fitnessStepValidationOk:
      Object.keys(fitnessStepValidationErrors).length === 0,
    fitnessStepValidationErrors
  }
}

// ############ Third Step Validations ##################

const OnboardingParametersStepValidation = (formData: ParametersFormData) => {
  let parametersStepValidationErrors: ValidationErrors = {}

  const fields = ['attack', 'defense', 'fitness', 'goal', 'pass', 'teamWork']

  fields.forEach(field => {
    if (!isValidNumber(10, 100, Number(formData[field]))) {
      parametersStepValidationErrors = {
        ...parametersStepValidationErrors,
        [field]: t('common.error.requiredFieldNumberWithRange', {
          field: t(`onboardingScreen.${field}`),
          min: t('10'),
          max: t('100')
        })
      }
    }
  })

  const paramsTotalValue =
    formData.attack +
    formData.defense +
    formData.goal +
    formData.pass +
    formData.teamWork

  if (paramsTotalValue > 250) {
    parametersStepValidationErrors = {
      ...parametersStepValidationErrors,
      generalError: t('onboardingScreen.parametersExceededError')
    }
  }

  return {
    parametersStepValidationOk:
      Object.keys(parametersStepValidationErrors).length === 0,
    parametersStepValidationErrors
  }
}

const createNumericEnumKeys = (myEnum: any) => {
  return Object.keys(myEnum)
    .map(key => ({
      label: myEnum[key as keyof typeof myEnum],
      value: key
    }))
    .filter(k => isNaN(Number(k.label)))
}

export {
  registerFormValidation,
  loginFormValidation,
  OnboardingPositionStepValidation,
  OnboardingFitnessStepValidation,
  OnboardingParametersStepValidation,
  createNumericEnumKeys,
  resetPasswordFormValidation
}
