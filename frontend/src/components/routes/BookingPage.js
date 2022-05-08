import {
  List,
  ListItem,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Stack,
  Box,
} from '@mui/material'

import { styled } from '@mui/material/styles'
// import DesktopDateRangePicker from '@mui/x-date-pickers-pro/DesktopDateRangePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
// import { MobileDatePicker, MobileDateRangePicker } from '@mui/x-date-pickers'

// import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker'
// import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker'
import { useTheme } from '@mui/material/styles'
import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { useSnackbar } from 'notistack'
import { useHistory, useLocation } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import StyledForm from '../customs/StyledForm'
import StyledPage from '../customs/StyledPage'
import StyledSection from '../customs/StyledSection'
import useMutate from '../hook/useMutate'
import { apiBookingCreate } from '../utils/api'
import getError from '../utils/getError'
import useAppContext from '../hook/useAppContext'
import ButtonPrimary from '../customs/ButtonPrimary'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import setUserDatas from '../utils/setUserDatas'
import getResponse from '../utils/getResponse'

import SelectInput from '../form/SelectInput'

const ResponsiveForm = styled(StyledForm)(({ theme }) => ({
  width: '50%',
  margin: '0  auto',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

function BookingPage() {
  const [suiteBatch, setSuiteBatch] = useState(null)
  const [suiteUnitPrice, setSuiteUnitPrice] = useState(0)
  const [currentHouseUuid, setCurrentHouseUuid] = useState('')
  const location = useLocation()
  const { palette } = useTheme()
  const history = useHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const {
    dispatch,
    state: { userInfo, willBookDatas },
  } = useAppContext()

  const queryKey = ['booking']

  const { mutateAsync, isMutating } = useMutate(queryKey, apiBookingCreate)

  // const initialValues = {
  //   house: willBookDatas?.houseUuid,
  //   suite: willBookDatas ? willBookDatas.suiteUuid : '',
  //   price: willBookDatas ? willBookDatas.suiteTitle : 0,

  //   startdate: moment(new Date()),
  //   enddate: moment(new Date()),
  // }

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (datas) => {
    closeSnackbar()
    // if (isLogged === 'NAN') {
    //   history.push('/register')
    // }

    console.log('datas', datas)

    const {
      house: houseUuid,
      suite: suiteUuid,
      startdate,
      enddate,
      price,
    } = datas
    const result = {
      suiteUuid,
      startdate: moment(startdate).valueOf(),
      enddate: moment(enddate).valueOf(),
      price,
    }

    /// Traiter le cas de l'utilisateur non connecté

    try {
      await mutateAsync({
        datas: result,
        token: userInfo?.token,
      }).then((response) => {
        if (response && (response.status === 201 || response.status === 200)) {
          // reset form
          // reset({ ...initialValues })
          const refreshedUserInfo = setUserDatas(response)

          // refresh token
          dispatch({ type: 'USER_LOGIN', payload: refreshedUserInfo })
          Cookies.set('userInfo', JSON.stringify(refreshedUserInfo))

          // clear state and localstorage
          dispatch({ type: 'CLEAR_WILL_BOOK_DATAS' })
          Cookies.remove('willBookDatas')

          enqueueSnackbar(getResponse(response), { variant: 'success' })
          setTimeout(
            () =>
              history.push({
                pathname: '/mon-compte/mes-reservations',
                state: {
                  from: location.pathname,
                  pagename: 'Mes reservations',
                },
              }),
            2000
          )
        }
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })

      if (err.message === 'Request failed with status code 498') {
        setTimeout(
          () =>
            history.push({
              pathname: '/login',
              state: {
                from: location.pathname,
                pagename: 'login',
              },
            }),
          2000
        )
      }
    }
  }

  const setTotalPrice = useCallback(() => {
    const startdate = getValues('startdate')
    const enddate = getValues('enddate')

    if (startdate && enddate) {
      const diff = moment(enddate).diff(startdate, 'days')

      const totalPrice = suiteUnitPrice * diff

      setValue('price', totalPrice)
    }
  }, [getValues, setValue, suiteUnitPrice])

  useEffect(() => {
    if (willBookDatas) {
      setCurrentHouseUuid(willBookDatas.houseUuid)
    }
  }, [willBookDatas])

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread>Réservation</Bread>
        <PageTitle>Réservation</PageTitle>

        <ResponsiveForm onSubmit={handleSubmit(onSubmit)}>
          <List>
            <ListItem>
              <SelectInput
                name="house"
                control={control}
                getValues={getValues}
                setCurrentHouseUuid={setCurrentHouseUuid}
                houseUuid={currentHouseUuid}
                setValue={setValue}
                willBookDatas={willBookDatas}
                placeholder="xxx"
                label="Etablissements disponibles"
                disabled={isSubmitting}
              />
            </ListItem>
            <ListItem>
              <SelectInput
                name="suite"
                control={control}
                getValues={getValues}
                houseUuid={currentHouseUuid}
                setCurrentHouseUuid={setCurrentHouseUuid}
                setValue={setValue}
                willBookDatas={willBookDatas}
                setSuiteUnitPrice={setSuiteUnitPrice}
                placeholder="xxx"
                label="Suites  disponibles"
                disabled={isSubmitting}
              />
            </ListItem>

            <ListItem></ListItem>
            <ListItem>
              <Controller
                name="startdate"
                control={control}
                defaultValue={[new Date()]}
                rules={{
                  required: 'la date de debut est obligatoire',
                }}
                render={({ field }) => (
                  <DesktopDatePicker
                    {...field}
                    disabled={isSubmitting}
                    label="Date de début"
                    minDate={moment(new Date())}
                    onChange={(newValue) => {
                      field.onChange(newValue)
                      setTotalPrice()
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        label="Date de début"
                        variant="filled"
                        error={Boolean(errors.startdate)}
                        helperText={
                          errors.startdate ? errors.startdate.message : ''
                        }
                        {...params}
                      />
                    )}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="enddate"
                control={control}
                defaultValue={[new Date()]}
                rules={{
                  validate: {
                    greather: (value) => {
                      const startdate = getValues('startdate')
                      return (
                        value.diff(startdate, 'days') > 0 ||
                        'La date de fin doit supérieure à date de début'
                      )
                    },
                  },
                }}
                render={({ field }) => (
                  <DesktopDatePicker
                    {...field}
                    disabled={isSubmitting}
                    label="Date de fin"
                    minDate={moment(new Date())}
                    onChange={(newValue) => {
                      field.onChange(newValue)
                      setTotalPrice()
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        label="Date de début"
                        variant="filled"
                        error={Boolean(errors.enddate)}
                        helperText={
                          errors.enddate ? errors.enddate.message : ''
                        }
                        {...params}
                      />
                    )}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                control={control}
                name="price"
                defaultValue={'0'}
                rules={{
                  required: 'Prix total',
                }}
                render={({ field }) => (
                  <TextField
                    disabled
                    {...field}
                    sx={{ m: 1, width: '100%' }}
                    id="filled-select-house"
                    label="Prix total"
                    variant="filled"
                    error={Boolean(errors.house)}
                    helperText={errors.price ? errors.price.message : ''}
                  ></TextField>
                )}
              />
            </ListItem>

            <ListItem>
              <ButtonPrimary
                fullWidth
                type="submit"
                disabled={isMutating || isSubmitting}
              >
                Je réserve
              </ButtonPrimary>
            </ListItem>
          </List>
        </ResponsiveForm>
      </StyledSection>
    </StyledPage>
  )
}

export default React.memo(BookingPage)
