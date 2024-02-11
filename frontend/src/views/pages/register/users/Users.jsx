import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GridUsers from './components/GridUsers'
import RegisterUser from './components/RegisterUser'
import { getUsers, getUserById, deleteUserById } from 'src/services/api'
import DialogAlert from 'src/components/common/DialogAlert'
import './Users.css'

const Users = () => {
  const { themeContent } = useSelector((rootReducer) => rootReducer.changeThemeReducer)
  const [titlePage, setTitlePage] = useState('Usuários')
  const [usersList, setUsersList] = useState([])
  const [userSelected, setUserSelected] = useState(null)
  const [saveInfo, setSaveInfo] = useState(false)
  const [dialogAlert, setDialogAlert] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getData = async () => {
    const response = await getUsers()
    setUsersList(response.data)
  }

  const handleUsersPageBtn = (isSavingInfo) => {
    if (!isSavingInfo) {
      const showScreen = !titlePage.includes('Cadastrar') ? 'Cadastrar usuário' : 'Usuário'
      setTitlePage(showScreen)
    } else {
      setSaveInfo(true)
    }
  }

  const backToGrid = (action) => {
    setTitlePage('Usuários')
    setUserSelected(null)
    setSaveInfo(false)
    if (action === 'reload') getData()
  }

  const handleEditUser = async (id) => {
    const response = await getUserById(id)
    setTitlePage('Editar usuário')
    setUserSelected(response.data[0][0])
  }

  const handleDeleteUser = (id) => {
    setUserSelected(id)
    setDialogAlert(true)
    setDialogMessage('Tem certeza que deseja deletar este usuário?')
  }

  const deleteUser = async () => {
    const responseDeleteUser = await deleteUserById(userSelected)

    if (responseDeleteUser.data === 'User deleted!') {
      setUserSelected(null)
      setDialogAlert(false)
      getData()
    }
  }

  return (
    <div className="main-content">
      <div className="title-content">
        <h1>{titlePage}</h1>
        {/*eslint-disable-next-line react/style-prop-object*/}
        <div className="default-btn-container">
          <button
            type="button"
            onClick={() => {
              if (titlePage === 'Usuários') {
                handleUsersPageBtn(false)
              } else {
                handleUsersPageBtn(true)
              }
            }}
            className="default-btn btn-green"
          >
            {titlePage === 'Usuários' ? 'Cadastrar' : 'Salvar'}
          </button>
          {titlePage !== 'Usuários' && (
            <>
              <button
                type="button"
                onClick={() => backToGrid('')}
                className="default-btn btn-white"
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
      <div className="content">
        {titlePage === 'Usuários' ? (
          <GridUsers
            usersList={usersList}
            handleEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
          />
        ) : (
          <RegisterUser
            titlePage={titlePage}
            userSelected={userSelected}
            saveInfo={saveInfo}
            backToGrid={backToGrid}
            setSaveInfo={setSaveInfo}
          />
        )}
      </div>
      {dialogAlert && (
        <DialogAlert
          dialogAlert={dialogAlert}
          setDialogAlert={setDialogAlert}
          themeContent={themeContent}
          dialogMessage={dialogMessage}
          callFunction={deleteUser}
          buttons={2}
        />
      )}
    </div>
  )
}

export default Users
