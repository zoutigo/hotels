import React from 'react'
import { useForm } from 'react-hook-form'
import { PropTypes } from 'prop-types'
import { useTheme } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useSnackbar } from 'notistack'
import { ListItem, List } from '@mui/material'

import useMutate from '../hook/useMutate'
import useAppContext from '../hook/useAppContext'
import getError from '../utils/getError'
import TextInput from './TextInput'
import FileInput from './FileInput'
import ButtonPrimary from '../customs/ButtonPrimary'
import StyledForm from '../customs/StyledForm'
import { housesQueryKey } from '../constants/queryKeys'
import { apiHouseCreate } from '../utils/api'
import getResponse from '../utils/getResponse'

function HouseCreateForm({ queryKey, queryParams, action, poster }) {
  const location = useLocation()
  const {
    state: {
      userInfo: { token },
    },
  } = useAppContext()

  const isUpdating =
    action === 'update' && location.state && location.state.house

  const { palette } = useTheme()
  const history = useHistory()
  const { pathname } = location
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const { mutateAsync, isMutating } = useMutate(housesQueryKey, apiHouseCreate)
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: isUpdating ? location.state.house.name : '',
      city: isUpdating ? location.state.house.city : '',
      description: isUpdating ? location.state.house.description : '',
    },
  })

  const initialValues = {
    name: '',
    city: '',
    description: '',
    address: '',
    file: '',
  }

  const onSubmit = async (datas) => {
    const { name, address, city, description, file } = datas
    const finalDatas = {
      file: file ? file[0] : null,
      name,
      address,
      description,
      city,
    }
    closeSnackbar()
    try {
      await mutateAsync({
        datas: finalDatas,
        token,
      }).then((response) => {
        if (response && response.status === 201) {
          reset({ ...initialValues })
          enqueueSnackbar(getResponse(response), { variant: 'success' })

          setTimeout(
            () =>
              history.replace({
                pathname: '/liste-des-etablissements',
                state: {
                  from: pathname,
                  pagename: 'liste des établissement',
                },
              }),
            3000
          )
        }
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
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
            name="address"
            label="Adresse de l'établissement "
            defaultValue=""
            variant="filled"
            example=""
            rules={{
              required: "l'adresse de l'établissement est obligatoire",
              minLength: {
                value: 2,
                message: "l'adresse doit avoir 2 caractères au moins",
              },
              maxLength: {
                value: 100,
                message: "l'adresse   doit avoir 100 caractères au plus",
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
