import React from 'react'
import { Grid, TextField, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Controller, useForm } from 'react-hook-form'
import SearchIcon from '@mui/icons-material/Search'
import ButtonPrimary from '../customs/ButtonPrimary'
import StyledForm from '../customs/StyledForm'

function EtablissementsListForm() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (datas) => {
    console.log(datas)
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Grid
        item
        container
        alignItems="center"
        spacing={1}
        className="etb-list-search-form"
      >
        <Grid item md={9} xs={12}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "écrire le nom de l'établissement",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                message: 'le format mail est incorrect',
              },
            }}
            render={({ field }) => (
              <TextField
                disabled
                variant="outlined"
                fullWidth
                id="email"
                label="rechercher un établissement"
                placeholder="Entrez une adresse email"
                inputProps={{ type: 'email' }}
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : null}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ButtonPrimary
            startIcon={matches ? <SearchIcon /> : null}
            fullWidth
            type="submit"
            disabled={isSubmitting}
          >
            {matches ? '' : 'Rechercher'}
          </ButtonPrimary>
        </Grid>
      </Grid>
    </StyledForm>
  )
}

export default EtablissementsListForm
