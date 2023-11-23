// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

const DialogConfirmationDelete = ({ open, handleClose, handleDelete }) => {
  return (
    <Fragment>
      <Dialog
        open={open}
        disableEscapeKeyDown
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose
          }
        }}
      >
        <DialogTitle id='alert-dialog-title'>Warning!</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Yakin hapus data? Aksi ini tidak bisa di Undo!
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Tidak</Button>
          <Button onClick={(handleDelete)}>Iya</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogConfirmationDelete
