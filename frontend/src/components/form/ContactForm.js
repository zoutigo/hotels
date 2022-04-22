import React from 'react'
import PropTypes from 'prop-types'

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
  const options = [
    {
      label: 'Je souhaite poser une réclamation',
      value: 'reclammation',
    },
    {
      label: 'Je souhaite commander un service supplémentaire',
      value: 'service supplémantaire',
    },

    {
      label: 'Je souhaite en savoir plus sur une suite',
      value: 'soucis avec cette application',
    },

    { label: 'J’ai un souci avec cette application', value: 'en savoir plus' },
  ]

  const history = useHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { state } = useAppContext()
  const { userInfo } = state
  const { mutateAsync, isMutating } = useMutate(['contact'], apiContactCreate)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ mode: 'onChange' })

  const onSubmit = async (datas) => {
    closeSnackbar()
    try {
      await mutateAsync({ datas }).then((response) => {
        if (response && response.status === 200) {
          history.push('/liste-des-etablissements')
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
            label="Prénom"
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
            defaultValue={userInfo ? userInfo.email : 'null'}
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

export default ContactForm
