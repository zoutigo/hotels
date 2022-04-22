import {
  List,
  ListItem,
  Typography,
  TextField,
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
import Select from 'react-select'
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
import TextInput from '../form/TextInput'
import useMutate from '../hook/useMutate'
import { apiBookingCreate, apiHousesList } from '../utils/api'
import getError from '../utils/getError'
import useAppContext from '../hook/useAppContext'
import ButtonPrimary from '../customs/ButtonPrimary'
import Bread from '../customs/Bread'
import PageTitle from '../customs/PageTitle'
import StyledNavLink from '../customs/StyledNavLink'
import selectStyles from '../constants/selectStyles'
import houses from '../constants/houses'
import useFetch from '../hook/useFetch'
import { housesQueryKey } from '../constants/queryKeys'
import setUserDatas from '../utils/setUserDatas'
import getResponse from '../utils/getResponse'


const ResponsiveForm = styled(StyledForm)(({ theme }) => ({
  width: '50%',
  margin: '0  auto',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

function BookingPage() {
  const [suiteBatch, setSuiteBatch] = useState(null)
  const location = useLocation()
  const { palette } = useTheme()
  const history = useHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const {
    dispatch,

    state: { userInfo },


  } = useAppContext()

  const [suites, setSuites] = useState([])

  const queryKey = ['booking']

  const { isLoading, isError, data, errorMessage } = useFetch(
    housesQueryKey,
    '',
    apiHousesList
  )

  const withSuitsHouzes =
    data && data.datas && Array.isArray(data.datas)
      ? data.datas.filter((house) => house.suites && house.suites.length > 0)
      : []

  const getHouse = () => {

    if (location.state && location.state.origin === 'cardsuit') {
      const {
        suite: { houseId },
      } = location.state
      const deHouse = withSuitsHouzes.find((houz) => houz.id === houseId)

      return deHouse
    }
    return null
  }

  const getSuites = (houseUuid) => {

    const houz = withSuitsHouzes?.find((houz) => houz.uuid === houseUuid)


    const { suites } = houz

    const result = suites.map(({ title, uuid, price }) => ({
      label: title,
      value: uuid,
      price,
    }))

    setSuiteBatch(result)
    return result
  }

  const { mutateAsync, isMutating } = useMutate(queryKey, apiBookingCreate)
  const initialValues = {
    house: getHouse() ? { label: getHouse().name, value: getHouse().uuid } : '',
    suite: {
      label: location.state.suite?.title,
      value: location.state.suite?.uuid,
    },
    price: location.state ? location.state.suite?.price : 0,

    startdate: moment(new Date()),
    enddate: moment(new Date()),
  }


  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: initialValues,
  })

  const onSubmit = async (datas) => {

    if (!userInfo) {
      history.push('/login')
    }


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

    closeSnackbar()

    try {
      await mutateAsync({
        datas: result,

        token: userInfo?.token,
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
    }
  }

  const setTotalPrice = () => {
    const startdate = getValues('startdate')

    const enddate = getValues('enddate')

    const currentSuiteValue = getValues('suite')

    if (startdate && enddate && currentSuiteValue) {
      const diff = moment(enddate).diff(startdate, 'days')

      const currentSuite = suiteBatch?.find(
        (suit) => suit.value === currentSuiteValue
      )
      const totalPrice = currentSuite?.price * diff

      setValue('price', totalPrice)
    }
  }

  const houseOptions = withSuitsHouzes.map(({ name, uuid }) => ({
    value: uuid,
    label: name,
  }))

  const initialHouse =
    location.state && location.state.suit
      ? { name: location.state.suit.name, value: location.state.suit.id }
      : []

  const initialSuit =
    location.state && location.state.house
      ? { name: location.state.house.name, value: location.state.house.id }
      : []

  return (
    <StyledPage>
      <StyledSection background={palette.white.main}>
        <Bread>Réservation</Bread>
        <PageTitle>Réservation</PageTitle>


        <ResponsiveForm onSubmit={handleSubmit(onSubmit)}>
          <List>

            <ListItem>
              <Controller
                control={control}
                name="house"
                defaultValue={initialValues.house}
                rules={{
                  required: 'veillez choisir un établissement',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) => {
                      const houseUuid = e.target.value
                      field.onChange(houseUuid)
                      setSuites(getSuites(houseUuid))
                      setTotalPrice()
                    }}
                    sx={{ m: 1, width: '100%' }}
                    id="filled-select-house"
                    select
                    label="Etablissement"
                    variant="filled"
                    error={Boolean(errors.house)}
                    helperText={errors.house ? errors.house.message : ''}
                  >
                    {houseOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                control={control}
                name="suite"
                defaultValue={initialValues.suite}
                rules={{
                  required: 'veillez choisir une suite',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value)

                      setTotalPrice()
                    }}
                    sx={{ m: 1, width: '100%' }}
                    id="filled-select-suites"
                    defaultValue={initialValues.suite}
                    select
                    label="Choisissez une suite"
                    variant="filled"
                    error={Boolean(errors.suit)}
                    helperText={errors.suit ? errors.suit.message : ''}
                  >
                    {suites.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </ListItem>
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
                        'La date de fin doit etre différente de la date de début'
                      )
                    },
                  },
                }}
                render={({ field }) => (
                  <DesktopDatePicker
                    {...field}
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
                    helperText={errors.house ? errors.house.message : ''}
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

      </StyledSection>
    </StyledPage>
  )
}


export default React.memo(BookingPage)

