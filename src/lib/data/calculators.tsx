const fitnessParameterCalculation = (
  height,
  weight,
  birthday,
  matches,
  competition
) => {
  const coefficients = [0.25, 0.5, 0.75, 1]

  const imcCalculation = () => {
    const imc = (weight / (height * height)) * 10000

    if (imc < 18.5) {
      return coefficients[0]
    } else if (imc >= 18.5 && imc <= 24.9) {
      return coefficients[3]
    } else if (imc >= 25 && imc <= 29.9) {
      return coefficients[1]
    } else if (imc > 30) {
      return 0
    }
  }

  const ageCalculation = () => {
    const age = Math.round(
      (new Date() - new Date(birthday)) / (3600000 * 24 * 365.25)
    )

    if (age >= 10 && age <= 20) {
      return coefficients[2]
    } else if (age >= 20 && age <= 35) {
      return coefficients[3]
    } else if (age >= 35 && age <= 55) {
      return coefficients[1]
    } else if (age >= 55 && age <= 65) {
      return coefficients[0]
    } else if (age > 65) {
      return 0
    }
  }

  const matchesCalculation = () => {
    // matches came from gamesPerYearIndex stored in user.playerData - (1,2,3,4,5)
    // competition came from competitionGamesIndex stored in user.playerData - (1,2,3,4,5)
    if (matches === 1) {
      return 0
    }

    if (competition === 1) {
      return matches / 8
    } else {
      return (matches / 20) * competition
    }
  }

  const result = Math.round(
    (imcCalculation() * 0.35 +
      ageCalculation() * 0.25 +
      matchesCalculation() * 0.4) *
      100
  )

  return result > 100 ? 100 : result
}

export { fitnessParameterCalculation }
