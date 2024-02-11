import ThemeActionTypes from './action-types'

const initialState = {
  themeContent: 'theme-content-light',
  themeHeader: 'theme-header-light',
  themeSidebar: 'theme-sidebar-light',
  themeTable: 'theme-light-table',
  themeTableRow: 'theme-light-tr',
  themeInput: 'input-light',
}

const changeThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ThemeActionTypes.LIGHT:
      return {
        themeContent: 'theme-content-light',
        themeHeader: 'theme-header-light',
        themeSidebar: 'theme-sidebar-light',
        themeTable: 'theme-light-table',
        themeTableRow: 'theme-light-tr',
        themeInput: 'input-light',
      }
    case ThemeActionTypes.DARK:
      return {
        themeContent: 'theme-content-dark',
        themeHeader: 'theme-header-dark',
        themeSidebar: 'theme-sidebar-dark',
        themeTable: 'theme-dark-table',
        themeTableRow: 'theme-dark-tr',
        themeInput: 'input-dark',
      }
    default:
      return state
  }
}

export default changeThemeReducer
