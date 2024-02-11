export const formatDoc = (str) => {
  const onlyDigits = str.replace(/\D/g, '')

  if (onlyDigits.length === 11) {
    return onlyDigits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  } else if (onlyDigits.length > 11) {
    return onlyDigits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }

  return str
}
