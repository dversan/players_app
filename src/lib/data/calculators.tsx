const calculateFitnessParameter = (
  heightInCm,
  weightInKg,
  birthday,
  matchesPlayed,
  competitionLevel
) => {
  const imc = (weightInKg / (heightInCm * heightInCm)) * 10000
  const age = Math.round(
    (new Date() - new Date(birthday)) / (3600000 * 24 * 365.25)
  )

  const coefficients = [0.25, 0.5, 0.75, 1]

  const imcCoefficient =
    imc < 18.5
      ? coefficients[0]
      : imc <= 24.9
      ? coefficients[3]
      : imc <= 29.9
      ? coefficients[1]
      : 0

  const ageCoefficient =
    age <= 10
      ? coefficients[0]
      : age <= 15
      ? coefficients[1]
      : age <= 20
      ? coefficients[2]
      : age <= 35
      ? coefficients[3]
      : age <= 55
      ? coefficients[1]
      : age <= 65
      ? coefficients[0]
      : 0

  let matchesCoefficient
  if (matchesPlayed === 1) {
    matchesCoefficient = 0
  } else {
    matchesCoefficient =
      competitionLevel === 1
        ? matchesPlayed / 8
        : (matchesPlayed / 20) * competitionLevel
  }

  const result = Math.round(
    (imcCoefficient * 0.35 + ageCoefficient * 0.25 + matchesCoefficient * 0.4) *
      100
  )

  return Math.min(result, 100)
}

export { calculateFitnessParameter }
