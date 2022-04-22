import React from 'react'

import { useForm, Controller } from 'react-hook-form'

import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { ListItem, List, TextField, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'



import useMutate from '../hook/useMutate'
import useAppContext from '../hook/useAppContext'
import getError from '../utils/getError'
import TextInput from './TextInput'


import ButtonPrimary from '../customs/ButtonPrimary'
import StyledForm from '../customs/StyledForm'
import { apiContactCreate } from '../utils/api'
import { emailPattern } from '../constants/patterns'

const ResponsiveForm = styled(StyledForm)(({ theme }) => ({
  width: '50%',
  margin: '0  auto',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

function ContactForm() {
  const { pathname } = useLocation()

  const history = useHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { state } = useAppContext()
  const { userInfo } = state
  const { mutateAsync, isMutating } = useMutate(['contact'], apiContactCreate)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },

import FileInput from './FileInput'
import ButtonPrimary from '../customs/ButtonPrimary'
import StyledForm from '../customs/StyledForm'

function ContactForm({ queryKey, queryParams, poster }) {
  const location = useLocation()

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
      title: '',
      email: '',
      message: '',
    },
  })


  const options = [
    { label: 'je souhaite poser une reclammation', value: 'reclammation' },
    {
      label: 'je souhaite commander un service supplémentaire',
      value: 'service supplémantaire',
    },
    {
      label: 'je souhaite en savoir plus sur une suite',
      value: 'en savoir plus',
    },
    {
      label: "j'ai un soucis avec cette application",
      value: 'isssoucis avec cette applicationue',
    },
  ]

  const onSubmit = async (datas) => {
    console.log('hello')
    console.log(datas)
    closeSnackbar()
    try {
      await mutateAsync({ datas }).then((response) => {
        if (response && response.status === 200) {
          setTimeout(
            () =>
              history.push({
                pathname: '/liste-des-etablissements',
                state: {
                  from: pathname,
                  pagename: 'liste des établissement',
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
            name="firstname"
            label="Prénom "
            defaultValue={userInfo ? userInfo.firstname : 'null'}
            variant="filled"
            example=""
            rules={{
              required: 'le prénom est obligatoire',
              minLength: {
                value: 2,
                message: 'le prénom doit avoir 2 caractères au moins',
              },
              maxLength: {
                value: 30,
                message: 'le prénom doit avoir 30 caractères au plus',

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
        <ListItem> le nom</ListItem>
        <ListItem> le prénom</ListItem>
        <ListItem> le mail</ListItem>
        <ListItem>
          <TextInput
            control={control}
            name="title"
            label="Objet du message"
            variant="filled"
            example=""
            rules={{
              required: "l'objet du message est obligatoire",
              minLength: {
                value: 2,
                message: 'objet doit avoir 2 caractères au moins',
              },
              maxLength: {
                value: 30,
                message: 'objet doit avoir 30 caractères au plus',

              },
            }}
          />
        </ListItem>
        <ListItem>
          <TextInput
            control={control}

            name="lastname"
            label="Nom "
            defaultValue={userInfo ? userInfo.lastname : 'null'}
            variant="filled"
            example=""
            rules={{
              required: 'le nom est obligatoire',
              minLength: {
                value: 2,
                message: 'le nom doit avoir 2 caractères au moins',
              },
              maxLength: {
                value: 30,
                message: 'le nom doit avoir 30 caractères au plus',
              },
            }}
          />
        </ListItem>
        <ListItem className="field">
          <TextInput
            control={control}
            name="email"
            label="Email"
            defaultValue=""

            variant="filled"
            example=""
            rules={{
              required: 'le mail est obligatoire',

              pattern: {
                value: emailPattern,
                message: 'Format mail invalide',

              },
            }}
          />
        </ListItem>


        <ListItem>
          <Controller
            control={control}
            name="topic"
            defaultValue=""
            rules={{
              required: 'veillez choisir un motif',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value)
                }}
                sx={{ m: 1, width: '100%' }}
                id="filled-select-house"
                select
                label="Quel est le sujet de votre message ?"
                variant="filled"
                error={Boolean(errors.topic)}
                helperText={errors.topic ? errors.topic.message : ''}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </ListItem>

        <ListItem>
          <TextInput
            control={control}
            name="content"

            label="Message"
            variant="filled"
            multiline
            rows={4}
            maxRows={6}
            example=""
            rules={{
              required: 'le message est obligatoire',
              minLength: {
                value: 15,
                message: 'le message doit avoir 15 caractères au moins',
              },
              maxLength: {
                value: 1000,
                message: 'le message doit avoir 1000 caractères au plus',
              },
            }}
          />
        </ListItem>

        <ListItem>
          <ButtonPrimary type="submit" disabled={isMutating || isSubmitting}>
            Envoyer mon message
          </ButtonPrimary>
        </ListItem>
      </List>

    </ResponsiveForm>
  )
}

  )
}

ContactForm.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryParams: PropTypes.string.isRequired,
  poster: PropTypes.func.isRequired,
}

export default ContactForm
