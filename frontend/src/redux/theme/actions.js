import ThemeActionTypes from './action-types'

export const changeTheme = (payload) => {
  if (payload === 'light') {
    return {
      type: ThemeActionTypes.LIGHT,
      payload,
    }
  } else {
    return {
      type: ThemeActionTypes.DARK,
      payload,
    }
  }
}
