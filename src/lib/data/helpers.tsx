import { t } from 'i18next'
import { OnboardingFormData, User } from '../data/models'

function isValidNumber(min, max, value) {
  return /^\d{1,2}$/ && parseInt(value) >= min && parseInt(value) <= max
}

export interface ValidationFields extends OnboardingFormData, User {
  password: string
  confirmPassword: string
  requiredFields: string
}

type ValidationErrors = {
  [key: keyof ValidationFields]: string
}

function registerFormValidation(formData) {
  let validationErrors: ValidationErrors = {}

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

function OnboardingStepsValidation(formData) {
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

  if (formData.birthday.trim().length === 0) {
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
          field: t(`onboardingScreen.${field}`), // Assuming you want to use the same field name for all. If not, this needs to be adjusted.
          min: t('10'),
          max: t('100')
        })
      }
    }
  })

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
  // Map to select items (assuming you want objects with `value` and `label` properties)
  return Object.keys(myEnum)
    .map(key => ({
      label: myEnum[key as keyof typeof myEnum], // the name of the enum
      value: key // gets the numeric value
    }))
    .filter(k => isNaN(Number(k.label)))
}

export {
  registerFormValidation,
  loginFormValidation,
  OnboardingStepsValidation,
  createNumericEnumKeys
}
