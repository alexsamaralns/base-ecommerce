import React from 'react'
import { CModal, CModalBody, CModalFooter } from '@coreui/react'
import './DialogAlert.css'

const DialogAlert = ({
  dialogAlert,
  setDialogAlert,
  themeContent,
  dialogMessage,
  buttons,
  callFunction,
}) => {
  return (
    <CModal visible={dialogAlert} onClose={() => setDialogAlert(false)}>
      <CModalBody className={`body-dialog ${themeContent}`}>
        <p>{dialogMessage}</p>
      </CModalBody>
      <CModalFooter className={`footer-dialog ${themeContent}`}>
        {buttons === 1 && (
          <button
            type="button"
            className="default-btn btn-green"
            onClick={() => setDialogAlert(false)}
          >
            OK
          </button>
        )}
        {buttons === 2 && (
          <>
            <button type="button" className="default-btn btn-green" onClick={callFunction}>
              OK
            </button>
            <button
              type="button"
              className="default-btn btn-white"
              onClick={() => setDialogAlert(false)}
            >
              Cancelar
            </button>
          </>
        )}
      </CModalFooter>
    </CModal>
  )
}

export default DialogAlert
