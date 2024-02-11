import React from 'react'

const Phones = ({ themeInput, userPhone, handleChangeFieldPhones, index }) => {
  return (
    <>
      <label htmlFor="phone">{`Telefone ${index + 1}:`}</label>
      <input
        type="text"
        id={`phone-${index}`}
        name="phone"
        className={themeInput}
        value={userPhone}
        onChange={(e) => handleChangeFieldPhones(e, index)}
        autoComplete="off"
      />
    </>
  )
}

export default Phones
