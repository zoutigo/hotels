import React from 'react'
import { useForm } from 'react-hook-form'
import { PropTypes } from 'prop-types'
import { useTheme, styled } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useSnackbar } from 'notistack'
import { ListItem, List, InputAdornment } from '@mui/material'

import useMutate from '../hook/useMutate'
import useAppContext from '../hook/useAppContext'
import getError from '../utils/getError'
import TextInput from './TextInput'
import FileInput from './FileInput'
import ButtonPrimary from '../customs/ButtonPrimary'
import StyledForm from '../customs/StyledForm'
import getResponse from '../utils/getResponse'
import setUserDatas from '../utils/setUserDatas'

const ResponsiveForm = styled(StyledForm)(({ theme }) => ({
  width: '50%',
  margin: '0  auto',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

function SuiteCreateForm({ queryKey, queryParams, action, poster }) {
  const {
    dispatch,
    state: {
      userInfo: { token, house },
    },
  } = useAppContext()
  const location = useLocation()
  const isUpdating =
    action === 'update' && location.state && location.state.suite

  const history = useHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const { mutateAsync, isMutating } = useMutate(queryKey, poster)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: isUpdating ? location.state.suite.title : '',
      file: isUpdating ? location.state.suite.file : '',
      description: isUpdating ? location.state.suite.description : '',
      price: isUpdating ? location.state.suite.price : '',
      bookinglink: isUpdating ? location.state.suite.bookinglink : '',
      // files: isUpdating ? location.state.suite.images : [],
    },
  })

  const initialValues = {
    title: '',
    description: '',
    price: '',
    bookinglink: '',
    file: '',
    files: '',
  }

  const onSubmit = async (datas) => {
    const { files, file, title, description, price, bookinglink } = datas
    const createDatas = {
      title,
      description,
      price,
      bookinglink,
      file: file ? file[0] : null,
      files,
      houseUuid: house.uuid,
    }
    const updateDatas = { title, description, price, bookinglink, files }
    closeSnackbar()
    try {
      await mutateAsync({
        datas: isUpdating ? updateDatas : createDatas,
        token,
        uuid: isUpdating ? location.state.suite.uuid : null,
      }).then((response) => {
        if (response && (response.status === 201 || response.status === 200)) {
          reset({ ...initialValues })
          const refreshedUserInfo = setUserDatas(response)
          dispatch({ type: 'USER_LOGIN', payload: refreshedUserInfo })
          Cookies.set('userInfo', JSON.stringify(refreshedUserInfo))

          enqueueSnackbar(getResponse(response), { variant: 'success' })
          setTimeout(
            () =>
              history.push({
                pathname: isUpdating ? `/` : '/',
                state: {
                  from: location.pathname,
                  pagename: isUpdating ? `/` : '/',
                },
              }),
            2000
          )
        }
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }
  return (
    <ResponsiveForm onSubmit={handleSubmit(onSubmit)}>
      <List>
        <ListItem>
          <TextInput
            control={control}
            name="title"
            label="Nom "
            defaultValue=""
            variant="filled"
            example=""
            rules={{
              required: 'le titre de la suite est obligatoire',
              minLength: {
                value: 2,
                message: 'le titre doit avoir 2 caractères au moins',
              },
              maxLength: {
                value: 30,
                message: 'le titre  doit avoir 30 caractères au plus',
              },
            }}
          />
        </ListItem>
        <ListItem>
          <TextInput
            control={control}
            name="price"
            label="Prix "
            variant="filled"
            example=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">€</InputAdornment>
              ),
            }}
            rules={{
              required: 'le prix de la suite est obligatoire',
              validate: {
                number: (value) =>
                  Number(value) || 'le prix doit etre un chiffre',
              },
              min: {
                value: 100,
                message: 'le prix doit etre supérieur à 100€',
              },
              max: {
                value: 10000,
                message: 'le prix doit etre inférieur à 10000 €',
              },
            }}
          />
        </ListItem>
        <ListItem>
          <TextInput
            control={control}
            name="bookinglink"
            label="Lien booking.com"
            defaultValue=""
            variant="filled"
            example="example: http://booking.com/mercure"
            rules={{
              required: 'le lien booking.com est obligatoire',
              pattern: {
                value:
                  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
                message: 'remplissez une url correcte',
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
              required: 'la description de la suite est obligatoire',
              minLength: {
                value: 10,
                message: 'la description doit avoir 15 caractères au moins',
              },
              maxLength: {
                value: 1000,
                message: 'la ville doit avoir 1000 caractères au plus',
              },
            }}
          />
        </ListItem>
        {/* <ListItem>
          <FileInput
            control={control}
            label={
              isUpdating
                ? "Modifier l'image de présentation"
                : 'Telecharger une image de présentation'
            }
            variant="filled"
            example=""
            defaultValue=""
          />
        </ListItem> */}
        <ListItem>
          <FileInput
            control={control}
            label={
              isUpdating
                ? 'Ajouter des photos'
                : 'Telecharger les photos de la suite'
            }
            multiple
            variant="filled"
            example=""
            defaultValue=""
          />
        </ListItem>
        <ListItem>
          <ButtonPrimary type="submit" disabled={isMutating || isSubmitting}>
            {isUpdating ? 'Je modifie la suite' : ' Je crée cette suite'}
          </ButtonPrimary>
        </ListItem>
      </List>
    </ResponsiveForm>
  )
}

SuiteCreateForm.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryParams: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  poster: PropTypes.func.isRequired,
}

export default SuiteCreateForm
