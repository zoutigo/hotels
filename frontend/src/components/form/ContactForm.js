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
            name="email"
            label="Email"
            variant="filled"
            example=""
            rules={{
              required: 'le mail est obligatoire',
              validate: {
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                  message: 'veillez rentrer un mail au bon format',
                },
              },
            }}
          />
        </ListItem>
        <ListItem>
          <TextInput
            control={control}
            name="message"
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
    </StyledForm>
  )
}

ContactForm.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryParams: PropTypes.string.isRequired,
  poster: PropTypes.func.isRequired,
}

export default ContactForm
