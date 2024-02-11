import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { createUser, updateUser, apiViaCep } from 'src/services/api'
import Addresses from './Addresses'
import Phones from './Phones'
import DialogAlert from 'src/components/common/DialogAlert'

const userBaseInfo = {
  userName: '',
  cpf_cnpj: '',
  email: '',
  userPassword: '',
  addresses: [],
  phones: [],
}

const addressBaseInfo = {
  street: '',
  number: '',
  district: '',
  complement: '',
  city: '',
  state: '',
  zip_code: '',
}

const RegisterUser = ({ titlePage, userSelected, saveInfo, backToGrid, setSaveInfo }) => {
  const { themeInput, themeContent } = useSelector((rootReducer) => rootReducer.changeThemeReducer)
  const [userInfo, setUserInfo] = useState(userSelected ? userSelected : userBaseInfo)
  const [userAddresses, setUserAddresses] = useState(
    userSelected ? userSelected.addresses : [addressBaseInfo],
  )
  const [auxZipCode, setAuxZipCode] = useState(
    userSelected ? userSelected.addresses[0].zip_code : '',
  )
  const [userPhones, setUserPhones] = useState(['', ''])
  const [confirmPassword, setConfirmPassword] = useState(
    userSelected ? userSelected.userPassword : '',
  )
  const [dialogAlert, setDialogAlert] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')
  const isPasswordEqual = confirmPassword === userInfo.password

  useEffect(() => {
    if (userSelected) {
      getPhones()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (saveInfo) handleSubmit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveInfo])

  const getPhones = () => {
    const auxPhones = ['', '']

    if (userSelected.phones[0] !== undefined) {
      auxPhones[0] = userSelected.phones[0].phone
    }

    if (userSelected.phones[1] !== undefined) {
      auxPhones[1] = userSelected.phones[1].phone
    }

    setUserPhones(auxPhones)
  }

  const handleSubmit = async () => {
    if (saveInfo) {
      const auxUserInfo = JSON.parse(JSON.stringify(userInfo))

      if (titlePage.includes('Editar')) {
        auxUserInfo.addresses = JSON.parse(JSON.stringify(userAddresses))
        auxUserInfo.phones = userPhones.filter((element) => element !== '')

        await updateUser(auxUserInfo)
        backToGrid('reload')
      } else {
        auxUserInfo.type_user = 1
        auxUserInfo.userStatus = 1
        auxUserInfo.theme = 'light'
        auxUserInfo.addresses = JSON.parse(JSON.stringify(userAddresses))
        auxUserInfo.phones = userPhones.filter((element) => element !== '')

        const responseCreateUser = await createUser(auxUserInfo)

        if (responseCreateUser.data === 'User already exists!') {
          setUserInfo(auxUserInfo)
          setDialogMessage('Usuário já registrado!')
          setDialogAlert(true)
        } else {
          backToGrid('reload')
        }
      }

      setSaveInfo(false)
    }
  }

  const handleChangeField = (e) => {
    const { id, value } = e.target

    if (id === 'confirm_password') {
      setConfirmPassword(value)
    } else {
      const auxUserInfo = JSON.parse(JSON.stringify(userInfo))
      auxUserInfo[id] = value
      setUserInfo(auxUserInfo)
    }
  }

  const handleChangeFieldAddress = async (e, index) => {
    const { id, value } = e.target
    const auxUserAddresses = JSON.parse(JSON.stringify(userAddresses))

    if (id === 'zip_code') {
      auxUserAddresses[index][id] = +value
      if (value.length === 8) {
        const resultCheckZipCode = await apiViaCep(value)

        if (resultCheckZipCode.erro === undefined) {
          fillAddress(resultCheckZipCode.data, index)
        }
      }

      setAuxZipCode(value)
    } else {
      auxUserAddresses[index][id] = value
      setUserAddresses(auxUserAddresses)
    }
  }

  const fillAddress = (addressInfo, index) => {
    const auxUserAddress = JSON.parse(JSON.stringify(userAddresses))

    auxUserAddress[index].street = addressInfo.logradouro
    auxUserAddress[index].district = addressInfo.bairro
    auxUserAddress[index].complement = addressInfo.complemento
    auxUserAddress[index].city = addressInfo.localidade
    auxUserAddress[index].state = addressInfo.uf
    auxUserAddress[index].zip_code = addressInfo.cep.replace('-', '')

    setUserAddresses(auxUserAddress)
  }

  const handleChangeFieldPhones = (e, index) => {
    const { value } = e.target
    const auxUserPhones = JSON.parse(JSON.stringify(userPhones))
    auxUserPhones[index] = value
    setUserPhones(auxUserPhones)
  }

  return (
    <form onSubmit={() => handleSubmit()}>
      <div className="inputs-form-container">
        <div className="input-container-register-user">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            className={`${themeInput} lg-input`}
            value={userInfo.userName}
            onChange={handleChangeField}
            autoComplete="off"
          />
        </div>
        <div className="input-container-register-user">
          <label htmlFor="cpf_cnpj">CPF:</label>
          <input
            type="text"
            id="cpf_cnpj"
            name="cpf_cnpj"
            className={themeInput}
            value={userInfo.cpf_cnpj}
            onChange={handleChangeField}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="inputs-form-container">
        <div className="input-container-register-user">
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            name="email"
            className={`${themeInput} lg-input`}
            value={userInfo.email}
            onChange={handleChangeField}
            autoComplete="off"
          />
        </div>
        <div className="input-container-register-user">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            className={themeInput}
            value={userInfo.userPassword}
            onChange={handleChangeField}
            autoComplete="off"
          />
        </div>
        <div className="input-container-register-user">
          <label htmlFor="confirm_password">Confirme a senha:</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            className={themeInput}
            value={confirmPassword}
            onChange={handleChangeField}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="division" />
      {userAddresses.lenght === 0 && (
        <Addresses
          themeInput={themeInput}
          userAddress={addressBaseInfo}
          handleChangeFieldAddress={handleChangeFieldAddress}
          auxZipCode={auxZipCode}
          index={0}
        />
      )}
      {userAddresses.map((address, index) => {
        return (
          <React.Fragment key={`address-${index}`}>
            <Addresses
              themeInput={themeInput}
              userAddress={address}
              handleChangeFieldAddress={handleChangeFieldAddress}
              auxZipCode={auxZipCode}
              index={index}
            />
          </React.Fragment>
        )
      })}
      <div className="division" />
      <div className="inputs-form-container">
        <div className="input-container-register-user">
          <Phones
            key="phone-1"
            themeInput={themeInput}
            userPhone={userPhones[0]}
            handleChangeFieldPhones={handleChangeFieldPhones}
            index={0}
          />
        </div>
        <div className="input-container-register-user">
          <Phones
            key="phone-2"
            themeInput={themeInput}
            userPhone={userPhones[1]}
            handleChangeFieldPhones={handleChangeFieldPhones}
            index={1}
          />
        </div>
      </div>
      {dialogAlert && (
        <DialogAlert
          dialogAlert={dialogAlert}
          setDialogAlert={setDialogAlert}
          themeContent={themeContent}
          dialogMessage={dialogMessage}
          callFunction={null}
          buttons={1}
        />
      )}
    </form>
  )
}

export default RegisterUser
