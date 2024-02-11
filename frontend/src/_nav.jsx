import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilContact, cilClipboard, cilGroup, cilGift, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Cadastros',
  },
  {
    component: CNavItem,
    name: 'Usuários',
    to: '/register/users',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Clientes',
    to: '/register/customers',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Produtos',
    to: '/register/products',
    icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Vendas',
  },
  {
    component: CNavItem,
    name: 'Pedidos',
    to: '/sales/orders',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
]

export default _nav
