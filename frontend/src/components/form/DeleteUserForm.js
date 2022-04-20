import React, { useCallback } from 'react'
import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import ButtonSecondary from '../customs/ButtonSecondary'
import ButtonPrimary from '../customs/ButtonPrimary'
import useAppContext from '../hook/useAppContext'
import useMutate from '../hook/useMutate'
import { apiUsersDelete } from '../utils/api'
import getError from '../utils/getError'
import getResponse from '../utils/getResponse'

const StyledGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.offwhite.main,
  width: '100%',
  padding: '0.5rem',
  border: 'solid 0.5px green',
  borderRadius: '2px',
  '& div': {
    margin: '0.3rem 0px',
  },
}))

function DeleteUserForm({
  showDeleteContainer,
  setshowDeleteContainer,
  userUuid,
  closeSnackbar,
  enqueueSnackbar,
}) {
  const { state } = useAppContext()
  const {
    userInfo: { token },
  } = state
  const queryKey = ['admin', 'users-list']

  const { mutateAsync, isMutating } = useMutate(queryKey, apiUsersDelete)

  const handleCancel = useCallback(() => {
    setshowDeleteContainer(!showDeleteContainer)
  }, [setshowDeleteContainer, showDeleteContainer])

  const handleConfirm = useCallback(async () => {
    closeSnackbar()
    try {
      await mutateAsync({
        uuid: userUuid,
        token,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
        setshowDeleteContainer(false)
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }, [
    mutateAsync,
    enqueueSnackbar,
    closeSnackbar,
    setshowDeleteContainer,
    token,
    userUuid,
  ])

  return (
    <StyledGrid container justifyContent="flex-end">
      <Grid item xs={12} md={2}>
        <ButtonSecondary onClick={handleCancel} disabled={isMutating}>
          Annuler
        </ButtonSecondary>
      </Grid>
      <Grid item xs={12} md={2}>
        <ButtonPrimary onClick={handleConfirm} disabled={isMutating}>
          Confirmer
        </ButtonPrimary>
      </Grid>
    </StyledGrid>
  )
}

DeleteUserForm.propTypes = {
  setshowDeleteContainer: PropTypes.func.isRequired,
  showDeleteContainer: PropTypes.bool.isRequired,
  userUuid: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
}

export default DeleteUserForm
