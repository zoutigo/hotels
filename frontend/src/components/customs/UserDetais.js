import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { useSnackbar } from 'notistack'
import moment from 'moment'
import { Typography, Grid, Tooltip, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import UpdateUserForm from '../form/UpdateUserForm'
import DeleteUserForm from '../form/DeleteUserForm'

function UserDetais({ details }) {
  const { lastname, firstname, email, uuid, createdAT, house } = details
  const [showDeleteContainer, setshowDeleteContainer] = useState(false)
  const [showUpdateContainer, setshowUpdateContainer] = useState(false)
  // const [showAssignContainer, setshowAssignContainer] = useState(false)

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const handleClickDeleteButton = () =>
    setshowDeleteContainer(!showDeleteContainer)
  const handleClickUpdateButton = () =>
    setshowUpdateContainer(!showUpdateContainer)
  // const handleClickAssignButton = () =>
  //   setshowAssignContainer(!showAssignContainer)

  return (
    <Grid container>
      <Grid key={uuid} item container>
        <Grid item xs={6} md={2} className="textLeft">
          <Typography variant="body1">{lastname} </Typography>
        </Grid>
        <Grid item xs={6} md={2} className="textLeft">
          <Typography variant="body1">{firstname} </Typography>
        </Grid>
        <Grid item xs={6} md={3} className="textLeft">
          <Typography variant="body1">{email} </Typography>
        </Grid>
        <Grid item xs={6} md={2} className="textLeft">
          <Typography variant="body1">
            {moment(createdAT).format('l')}{' '}
          </Typography>
        </Grid>
        <Grid item xs={6} md={2} className="textLeft">
          <Typography variant="body1">{house?.name}</Typography>
        </Grid>
        <Grid item xs={12} md={1} container className="textLeft">
          <Grid item xs={4}>
            <Tooltip title="Modifier">
              <IconButton onClick={handleClickUpdateButton}>
                <ManageAccountsIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          {/* <Grid item xs={4}>
            <Tooltip title="Assigner un hotel">
              <IconButton onClick={handleClickAssignButton}>
                <ManageAccountsIcon />
              </IconButton>
            </Tooltip>
          </Grid> */}
          <Grid item xs={4}>
            <Tooltip title="Supprimer">
              <IconButton onClick={handleClickDeleteButton}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      {showUpdateContainer && (
        <Grid container>
          <UpdateUserForm
            setshowUpdateContainer={setshowUpdateContainer}
            showUpdateContainer={showUpdateContainer}
            uuid={uuid}
            lastname={lastname}
            firstname={firstname}
            enqueueSnackbar={enqueueSnackbar}
            closeSnackbar={closeSnackbar}
          />
        </Grid>
      )}
      {/* {showAssignContainer && (
        <Grid container>
          <AssignUserForm />
        </Grid>
      )} */}
      {showDeleteContainer && (
        <DeleteUserForm
          setshowDeleteContainer={setshowDeleteContainer}
          showDeleteContainer={showDeleteContainer}
          userUuid={uuid}
          enqueueSnackbar={enqueueSnackbar}
          closeSnackbar={closeSnackbar}
        />
      )}
    </Grid>
  )
}

UserDetais.defaultProps = {
  details: {
    house: {
      name: 'aucun',
      uuid: '',
    },
  },
}
UserDetais.propTypes = {
  details: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    house: PropTypes.shape({
      name: PropTypes.string,
      uuid: PropTypes.string,
    }),
  }),
}

export default UserDetais
