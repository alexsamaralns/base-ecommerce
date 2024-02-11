import React from 'react'

const Addresses = ({ themeInput, userAddress, handleChangeFieldAddress, auxZipCode, index }) => {
  return (
    <>
      <div className="inputs-form-container">
        <div className="input-container-register-user">
          <label htmlFor="zip_code">CEP:</label>
          <input
            type="text"
            id="zip_code"
            name="zip_code"
            className={`md-input ${themeInput}`}
            value={auxZipCode}
            onChange={(e) => handleChangeFieldAddress(e, index)}
            autoComplete="off"
          />
        </div>
        <div className="input-container-register-user">
          <label htmlFor="street">Rua:</label>
          <input
            type="text"
            id="street"
            name="street"
            className={`lg-input ${themeInput}`}
            value={userAddress.street}
            onChange={(e) => handleChangeFieldAddress(e, index)}
            autoComplete="off"
          />
        </div>
        <div className="input-container-register-user">
          <label htmlFor="number">Número:</label>
          <input
            type="text"
            id="number"
            name="number"
            className={themeInput}
            value={userAddress.number}
            onChange={(e) => handleChangeFieldAddress(e, index)}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="inputs-form-container">
        <div className="input-container-register-user">
          <label htmlFor="complement">Complemento:</label>
          <input
            type="text"
            id="complement"
            name="complement"
            className={`lg-input ${themeInput}`}
            value={userAddress.complement}
            onChange={(e) => handleChangeFieldAddress(e, index)}
            autoComplete="off"
          />
        </div>
        <div className="input-container-register-user">
          <label htmlFor="district">Bairro:</label>
          <input
            type="text"
            id="district"
            name="district"
            className={themeInput}
            value={userAddress.district}
            onChange={(e) => handleChangeFieldAddress(e, index)}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="inputs-form-container">
        <div className="input-container-register-user">
          <label htmlFor="city">Cidade:</label>
          <input
            type="text"
            id="city"
            name="city"
            className={`lg-input ${themeInput}`}
            value={userAddress.city}
            onChange={(e) => handleChangeFieldAddress(e, index)}
            autoComplete="off"
          />
        </div>
        <div className="input-container-register-user">
          <label htmlFor="state">Estado:</label>
          <input
            type="text"
            id="state"
            name="state"
            className={`sm-input ${themeInput}`}
            value={userAddress.state}
            onChange={(e) => handleChangeFieldAddress(e, index)}
            autoComplete="off"
          />
        </div>
      </div>
    </>
  )
}

export default Addresses
