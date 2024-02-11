import { combineReducers } from 'redux'
import userReducer from './user/reducer'
import unfoldableReducer from './sidebarUnfoldable/reducer'
import sidebarShowReducer from './sidebarShow/reducer'
import changeThemeReducer from './theme/reducer'

const rootReducer = combineReducers({
  userReducer,
  unfoldableReducer,
  sidebarShowReducer,
  changeThemeReducer,
})

export default rootReducer
