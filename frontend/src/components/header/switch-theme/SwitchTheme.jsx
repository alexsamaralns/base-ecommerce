import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from 'src/redux/user/actions'
import { changeTheme } from 'src/redux/theme/actions'
import { toggleTheme } from 'src/services/api'
import './SwitchTheme.css'

const SwitchTheme = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer)
  const [isCheckedThemeButton, setIsCheckedThemeButton] = useState(currentUser.theme === 'dark')

  const themeChanged = async (e) => {
    const { checked } = e.target
    const themeStyle = checked ? 'dark' : 'light'

    setIsCheckedThemeButton(checked)

    dispatch(changeTheme(themeStyle))

    dispatch(
      loginUser({
        ...currentUser,
        theme: currentUser.theme,
      }),
    )

    await toggleTheme(currentUser.id, themeStyle)
  }

  return (
    <label className="switch">
      <input
        className="switch__input"
        checked={isCheckedThemeButton}
        type="checkbox"
        role="switch"
        onChange={themeChanged}
      />
      <span className="switch__icon">
        <span className="switch__icon-part switch__icon-part--1"></span>
        <span className="switch__icon-part switch__icon-part--2"></span>
        <span className="switch__icon-part switch__icon-part--3"></span>
        <span className="switch__icon-part switch__icon-part--4"></span>
        <span className="switch__icon-part switch__icon-part--5"></span>
        <span className="switch__icon-part switch__icon-part--6"></span>
        <span className="switch__icon-part switch__icon-part--7"></span>
        <span className="switch__icon-part switch__icon-part--8"></span>
        <span className="switch__icon-part switch__icon-part--9"></span>
        <span className="switch__icon-part switch__icon-part--10"></span>
        <span className="switch__icon-part switch__icon-part--11"></span>
      </span>
      <span className="switch__sr">Dark Mode</span>
    </label>
  )
}

export default SwitchTheme
