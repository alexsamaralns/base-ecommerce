import React from 'react'
import { useSelector } from 'react-redux'
import { formatDoc } from 'src/services/formatDoc'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const GridUsers = ({ usersList, handleEditUser, handleDeleteUser }) => {
  const { themeTable, themeTableRow } = useSelector((rootReducer) => rootReducer.changeThemeReducer)

  return (
    <table className={themeTable}>
      <thead>
        <tr className={themeTableRow}>
          <th>Nome</th>
          <th>CPF</th>
          <th>E-mail</th>
          <th>Telefone</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user, index) => {
          return (
            <tr key={`user-${index}`} className={themeTableRow}>
              <td>{user.userName}</td>
              <td>{formatDoc(user.cpf_cnpj)}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.userStatus === 1 ? 'Ativo' : 'Inativo'}</td>
              <td className="actions-table">
                <CIcon
                  size="xl"
                  icon={cilPencil}
                  className="primary-icon"
                  onClick={() => {
                    handleEditUser(user.id)
                  }}
                />
                <CIcon
                  size="xl"
                  icon={cilTrash}
                  className="error-icon"
                  onClick={() => {
                    handleDeleteUser(+user.id)
                  }}
                />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default GridUsers
