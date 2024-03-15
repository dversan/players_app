const isValidNumber = (min, max, value) => {
  return /^\d{1,2}$/ && parseInt(value) >= min && parseInt(value) <= max
}

const createNumericEnumKeys = (myEnum: any) => {
  return Object.keys(myEnum)
    .map(key => ({
      label: myEnum[key as keyof typeof myEnum],
      value: key
    }))
    .filter(k => isNaN(Number(k.label)))
}

export { isValidNumber, createNumericEnumKeys }
