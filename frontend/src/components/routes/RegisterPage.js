/* eslint-disable no-nested-ternary */
import { List, ListItem } from '@mui/material'

import { useTheme, styled } from '@mui/material/styles'

import React, { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import StyledForm from '../customs/StyledForm'
import StyledPage from '../customs/StyledPage'
import StyledSection from '../customs/StyledSection'
import TextInput from '../form/TextInput'
import useMutate from '../hook/useMutate'
import { apiLogin, apiRegister } from '../utils/api'
import getError from '../utils/getError'
import useAppContext from '../hook/useAppContext'
import ButtonPrimary from '../customs/ButtonPrimary'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import useIslogged from '../hook/useIsLogged'
import { emailPattern, passwordPattern } from '../constants/patterns'
import setUserDatas from '../utils/setUserDatas'

const ResponsiveForm = styled(StyledForm)(({ theme }) => ({
  width: '50%',
  margin: '0  auto',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

function RegisterPage() {
  const location = useLocation()
  const { palette } = useTheme()
  const history = useHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { dispatch, state } = useAppContext()
  const { cart } = state
  const isLogged = useIslogged()

  const queryKey = ['register']

  const { mutateAsync, isMutating } = useMutate(queryKey, apiRegister)
  const { mutateAsync: loginMutateAsync, isMutating: logingIsMutating } =
    useMutate(['login'], apiLogin)
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (datas) => {
    const { email, password, lastname, firstname, passwordConfirm } = datas
    const registerDatas = {
      email,
      password,
      lastname,
      firstname,
      passwordConfirm,
    }
    const loginDatas = { username: email, password }
    closeSnackbar()
    try {
      await mutateAsync(registerDatas).then(async (response) => {
        if (response && response.status === 201) {
          await loginMutateAsync(loginDatas).then((loginResponse) => {
            if (loginResponse && loginResponse.status === 200) {
              const userInfos = setUserDatas(loginResponse)
              dispatch({ type: 'USER_LOGIN', payload: userInfos })
              Cookies.set('userInfo', JSON.stringify(userInfos))
              const { from } = location.state || { from: { pathname: '/' } }
              history.push(
                cart.cartItems.length > 0
                  ? '/reservation'
                  : from !== '/login'
                  ? from
                  : '/liste-des-etablissements'
              )
            }
          })
        }
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }

  useEffect(() => {
    if (isLogged) {
      history.push('/')
    }
  }, [])

  const buttonText = `S'inscrire`

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread>Inscription</Bread>
        <PageTitle>Inscription</PageTitle>


        <ResponsiveForm onSubmit={handleSubmit(onSubmit)}>
          <List>


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
              <TextInput
                control={control}
                name="password"
                label="Mot de pass"
                defaultValue=""
                variant="filled"
                example=""
                rules={{
                  required: 'le mot de pass est obligatoire',
                  minLength: {
                    value: 2,
                    message: 'minimum deux caract??res',
                  },
                  maxLength: {
                    value: 30,
                    message: 'maximum 8 caract??res',
                  },
                  pattern: {
                    value: passwordPattern,
                    message:
                      'au moins 8 caract??res, dont 1 majuscule, 1 minuscule et un chiffre',
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <TextInput
                control={control}
                name="passwordConfirm"
                label="Confirmer le mot de pass"
                defaultValue=""
                variant="filled"
                example=""
                rules={{
                  required: "le nom de l'album est obligatoire",
                  minLength: {
                    value: 2,
                    message: '',
                  },
                  maxLength: {
                    value: 30,
                    message:
                      "le nom de l'album doit avoir 30 caract??res au moins",
                  },

                  validate: {
                    matches: (value) => {
                      const { password } = getValues()
                      return (
                        password === value ||
                        'les mots de pass ne sont pas identiques'
                      )
                    },
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <TextInput
                control={control}
                name="firstname"
                label="Pr??nom "
                defaultValue=""
                variant="filled"
                example=""
                rules={{
                  required: 'le pr??nom est obligatoire',
                  minLength: {
                    value: 2,
                    message: 'le pr??nom doit avoir 2 caract??res au moins',
                  },
                  maxLength: {
                    value: 30,
                    message: 'le pr??nom doit avoir 30 caract??res au plus',
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <TextInput
                control={control}
                name="lastname"
                label="Nom "
                defaultValue=""
                variant="filled"
                example=""
                rules={{
                  required: 'le nom est obligatoire',
                  minLength: {
                    value: 2,
                    message: 'le nom doit avoir 2 caract??res au moins',
                  },
                  maxLength: {
                    value: 30,
                    message: 'le nom doit avoir 30 caract??res au plus',
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <ButtonPrimary
                type="submit"
                disabled={isMutating || logingIsMutating || isSubmitting}
              >
                {buttonText}
              </ButtonPrimary>
            </ListItem>
          </List>
        </ResponsiveForm>

      </StyledSection>
    </StyledPage>
  )
}

export default RegisterPage
