import { t } from 'i18next'
import { PlayerData, RegisterFormFields, User } from '../data/models'

function isValidNumber(min, max, value) {
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

function registerFormValidation(formData) {
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

function loginFormValidation(formData) {
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

function resetPasswordFormValidation(email: string) {
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

function OnboardingStepsValidation(formData: PlayerData) {
  let firstStepValidationErrors: ValidationErrors = {}
  let secondStepValidationErrors: ValidationErrors = {}
  let thirdStepValidationErrors: ValidationErrors = {}

  // ############ First Step Validations ##################

  if (formData.playerNumber === 0) {
    firstStepValidationErrors = {
      ...firstStepValidationErrors,
      playerNumber: t('common.error.requiredField', {
        field: t('onboardingScreen.playerNumberField')
      })
    }
  }

  if (!isValidNumber(0, 99, Number(formData.playerNumber))) {
    firstStepValidationErrors = {
      ...firstStepValidationErrors,
      playerNumber: t('common.error.requiredFieldNumberWithRange', {
        field: t('onboardingScreen.playerNumberField'),
        min: t('0'),
        max: t('99')
      })
    }
  }

  if (formData.playerNickname.trim().length === 0) {
    firstStepValidationErrors = {
      ...firstStepValidationErrors,
      playerNickname: t('common.error.requiredField', {
        field: t('registerScreen.form.name')
      })
    }
  }

  if (formData.mainPosition.trim().length === 0) {
    firstStepValidationErrors = {
      ...firstStepValidationErrors,
      mainPosition: t('common.error.requiredField', {
        field: t('onboardingScreen.mainPosition')
      })
    }
  }

  if (formData.secondPosition.trim().length === 0) {
    firstStepValidationErrors = {
      ...firstStepValidationErrors,
      secondPosition: t('common.error.requiredField', {
        field: t('onboardingScreen.secondPosition')
      })
    }
  }

  // ############ Second Step Validations ##################

  if (formData.playerHeight === 0) {
    secondStepValidationErrors = {
      ...secondStepValidationErrors,
      playerHeight: t('common.error.requiredField', {
        field: t('common.text.height')
      })
    }
  }

  if (!isValidNumber(100, 300, Number(formData.playerHeight))) {
    secondStepValidationErrors = {
      ...secondStepValidationErrors,
      playerHeight: t('common.error.requiredFieldNumberWithRange', {
        field: t('common.text.height'),
        min: t('100'),
        max: t('300')
      })
    }
  }

  if (formData.playerWeight === 0) {
    secondStepValidationErrors = {
      ...secondStepValidationErrors,
      playerWeight: t('common.error.requiredField', {
        field: t('common.text.weight')
      })
    }
  }

  if (!isValidNumber(25, 200, Number(formData.playerWeight))) {
    secondStepValidationErrors = {
      ...secondStepValidationErrors,
      playerWeight: t('common.error.requiredFieldNumberWithRange', {
        field: t('common.text.weight'),
        min: t('25'),
        max: t('200')
      })
    }
  }

  if (formData.birthday.toString().length === 0) {
    secondStepValidationErrors = {
      ...secondStepValidationErrors,
      birthday: t('common.error.requiredField', {
        field: t('onboardingScreen.birthdayLabel')
      })
    }
  }

  if (formData.gamesPerYearIndex === 0) {
    secondStepValidationErrors = {
      ...secondStepValidationErrors,
      gamesPerYearIndex: t('common.error.requiredField', {
        field: t('onboardingScreen.gamesLabel')
      })
    }
  }

  if (formData.competitionGamesIndex === 0) {
    secondStepValidationErrors = {
      ...secondStepValidationErrors,
      competitionGamesIndex: t('common.error.requiredField', {
        field: t('onboardingScreen.competitionGamesLabel')
      })
    }
  }

  // ############ Third Step Validations ##################

  const fields = ['attack', 'defense', 'fitness', 'goal', 'pass', 'teamWork']

  fields.forEach(field => {
    if (!isValidNumber(10, 100, Number(formData[field]))) {
      thirdStepValidationErrors = {
        ...thirdStepValidationErrors,
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
    thirdStepValidationErrors = {
      ...thirdStepValidationErrors,
      generalError: t('onboardingScreen.parametersExceededError')
    }
  }
  // ############ Onboarding Form Validations Outputs ##################

  return {
    firstStepValidationOk: Object.keys(firstStepValidationErrors).length === 0,
    secondStepValidationOk:
      Object.keys(secondStepValidationErrors).length === 0,
    thirdStepValidationOk: Object.keys(thirdStepValidationErrors).length === 0,
    firstStepValidationErrors,
    secondStepValidationErrors,
    thirdStepValidationErrors
  }
}

function createNumericEnumKeys(myEnum: any) {
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
  OnboardingStepsValidation,
  createNumericEnumKeys,
  resetPasswordFormValidation
}
