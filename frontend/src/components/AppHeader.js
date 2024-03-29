import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sidebarHideClick } from 'src/redux/sidebarShow/actions'
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CHeaderToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu, cilApple } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import SwitchTheme from './header/switch-theme/SwitchTheme'
import { AppHeaderDropdown } from './header/index'

const AppHeader = ({ themeHeader }) => {
  const dispatch = useDispatch()
  const { sidebarShowHideClick } = useSelector((rootReducer) => rootReducer.sidebarShowReducer)

  return (
    <CHeader position="sticky" className={themeHeader}>
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(sidebarHideClick(!sidebarShowHideClick))}
        >
          <CIcon icon={cilMenu} size="lg" className={themeHeader} />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={cilApple} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <AppBreadcrumb themeHeader={themeHeader} />
          {/* <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav className="ms-3 gap-2">
          <SwitchTheme />
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
