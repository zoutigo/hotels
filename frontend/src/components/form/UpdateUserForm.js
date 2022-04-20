import React, { useCallback } from 'react'
import { styled } from '@mui/material/styles'
import { Grid, TextField, MenuItem } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import TextInput from './TextInput'
import useMutate from '../hook/useMutate'
import useAppContext from '../hook/useAppContext'
import getResponse from '../utils/getResponse'
import getError from '../utils/getError'
import ButtonPrimary from '../customs/ButtonPrimary'
import { apiHousesList, apiHouseUpdate, apiUsersUpdate } from '../utils/api'
import useFetch from '../hook/useFetch'
import { housesQueryKey } from '../constants/queryKeys'

const StyledForm = styled('form')(() => ({
  width: '100%',
}))

function UpdateUserForm({
  uuid,
  lastname,
  firstname,
  showUpdateContainer,
  setshowUpdateContainer,
  enqueueSnackbar,
  closeSnackbar,
}) {
  const queryKey = ['admin', 'users-list']
  const houseQueryKey = ['houses']
  const { state } = useAppContext()
  const {
    userInfo: { token },
  } = state
  const { mutateAsync, isMutating } = useMutate(queryKey, apiUsersUpdate)
  const { mutateAsync: mutateAsyncHouse, isMutating: isMutatingHouse } =
    useMutate(houseQueryKey, apiHouseUpdate)
  const initialHouse = { name: 'Hello', value: 'i love' }
  const { data: housesData } = useFetch(housesQueryKey, '', apiHousesList)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { lastname, firstname, house: initialHouse },
  })
  const onSubmit = useCallback(
    async (datas) => {
      closeSnackbar()
      try {
        await mutateAsync({
          datas,
          uuid,
          token,
        }).then(async (response) => {
          enqueueSnackbar(getResponse(response), { variant: 'success' })
          if (datas.houseUuid) {
            const houseDatas = { managerUuid: uuid }
            closeSnackbar()
            await mutateAsyncHouse({
              datas: houseDatas,
              uuid: datas.houseUuid,
              token,
            }).then((resp) => {
              enqueueSnackbar(getResponse(resp), { variant: 'success' })
              setTimeout(() => setshowUpdateContainer(false), 2000)
            })
          }
        })
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: 'error' })
      }
    },
    [
      enqueueSnackbar,
      closeSnackbar,
      mutateAsync,
      token,
      uuid,
      setshowUpdateContainer,
      mutateAsyncHouse,
    ]
  )
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Grid container alignItems="center">
        <Grid item xs={12} md={3} paddingX={1}>
          <TextInput
            control={control}
            name="firstname"
            label="Prénom "
            defaultValue=""
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
        </Grid>
        <Grid item xs={12} md={3} paddingX={1}>
          <TextInput
            control={control}
            name="lastname"
            label="Nom "
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
        </Grid>
        {housesData && Array.isArray(housesData.datas) && (
          <Grid item xs={12} md={3} padding={1}>
            <Controller
              control={control}
              name="houseUuid"
              defaultValue={initialHouse}
              rules={{
                required: 'veillez choisir un établissement',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  sx={{ m: 1, width: '100%' }}
                  id="filled-select-suites"
                  select
                  label="Assigner un établissement à manager"
                  variant="filled"
                  error={Boolean(errors.suit)}
                  helperText={errors.suit ? errors.suit.message : ''}
                >
                  {housesData.datas.map((option) => (
                    <MenuItem key={option.uuid} value={option.uuid}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        )}
        <Grid item xs={12} md={3} paddingX={1} sx={{ textAlign: 'right' }}>
          <ButtonPrimary type="submit" disabled={isMutating || isSubmitting}>
            Je modifie
          </ButtonPrimary>
        </Grid>
      </Grid>
    </StyledForm>
  )
}

UpdateUserForm.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  showUpdateContainer: PropTypes.bool.isRequired,
  setshowUpdateContainer: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
}

export default UpdateUserForm
