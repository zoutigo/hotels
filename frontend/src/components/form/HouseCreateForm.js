import React from 'react'
import { useForm } from 'react-hook-form'
import { PropTypes } from 'prop-types'
import { useTheme } from '@mui/styles'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useSnackbar } from 'notistack'
import { ListItem, List } from '@mui/material'

import useMutate from '../hook/useMutate'
import useStyles from '../../style'
import useAppContext from '../hook/useAppContext'
import getError from '../utils/getError'
import TextInput from './TextInput'
import FileInput from './FileInput'
import ButtonPrimary from '../customs/ButtonPrimary'
import StyledForm from '../customs/StyledForm'

function HouseCreateForm({ queryKey, queryParams, action, poster }) {
  const location = useLocation()
  const isUpdating =
    action === 'update' && location.state && location.state.house

  const classes = useStyles()
  const { palette } = useTheme()
  const history = useHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { dispatch, state } = useAppContext()
  const { userInfo } = state
  const { mutateAsync, isMutating } = useMutate(queryKey, poster)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: isUpdating ? location.state.house.name : '',
      city: isUpdating ? location.state.house.city : '',
      description: isUpdating ? location.state.house.description : '',
    },
  })

  const onSubmit = async (datas) => {
    console.log(datas)
    // closeSnackbar()
    // try {
    //   await mutateAsync(datas).then((response) => {
    //     if (response && response.status === 200) {
    //       dispatch({ type: 'USER_LOGIN', payload: response.data })
    //       Cookies.set('userInfo', JSON.stringify(response.data))
    //       const { from } = location.state || { from: { pathname: '/' } }
    //       history.replace(from)
    //     }
    //   })
    // } catch (err) {
    //   enqueueSnackbar(getError(err), { variant: 'error' })
    // }
  }
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <List>
        <ListItem>
          <TextInput
            control={control}
            name="name"
            label="Nom "
            defaultValue=""
            variant="filled"
            example=""
            rules={{
              required: "le nom de l'établissement",
              minLength: {
                value: 2,
                message: 'le nom doit avoir 2 caractères au moins',
              },
              maxLength: {
                value: 30,
                message: 'le nom  doit avoir 30 caractères au plus',
              },
            }}
          />
        </ListItem>
        <ListItem>
          <TextInput
            control={control}
            name="city"
            label="Ville"
            defaultValue=""
            variant="filled"
            example=""
            rules={{
              required: "la ville de l'établissement",
              minLength: {
                value: 2,
                message: 'la ville doit avoir 2 caractères au moins',
              },
              maxLength: {
                value: 30,
                message: 'la ville doit avoir 30 caractères au plus',
              },
            }}
          />
        </ListItem>
        <ListItem>
          <TextInput
            control={control}
            name="description"
            label="Description"
            defaultValue=""
            variant="filled"
            multiline
            rows={4}
            maxRows={6}
            example=""
            rules={{
              required: "la description de l'établissement",
              minLength: {
                value: 15,
                message: 'la ville doit avoir 15 caractères au moins',
              },
              maxLength: {
                value: 1000,
                message: 'la ville doit avoir 1000 caractères au plus',
              },
            }}
          />
        </ListItem>
        <ListItem>
          <FileInput
            control={control}
            label="telecharger une image"
            variant="filled"
            example=""
            defaultValue=""
          />
        </ListItem>
        <ListItem>
          <ButtonPrimary type="submit" disabled={isMutating || isSubmitting}>
            Je crée cet établissement
          </ButtonPrimary>
        </ListItem>
      </List>
    </StyledForm>
  )
}

HouseCreateForm.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryParams: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  poster: PropTypes.func.isRequired,
}

export default HouseCreateForm
