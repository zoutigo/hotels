import React, { useCallback, useEffect } from 'react'
import { useController, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { TextField } from '@mui/material'

import useFetch from '../hook/useFetch'
import { housesQueryKey } from '../constants/queryKeys'
import { apiHousesList } from '../utils/api'

function SelectInput({
  control,
  name,
  width,
  rules,
  houseUuid,
  getValues,
  setValue,

  example,
  setCurrentHouseUuid,
  setSuiteUnitPrice,
  willBookDatas,
  ...rest
}) {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  })

  const { data } = useFetch(housesQueryKey, '', apiHousesList)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const withSuitsHouzes = useCallback(
    data && data.datas && Array.isArray(data.datas)
      ? willBookDatas
        ? data.datas.filter((house) => house.uuid === willBookDatas.houseUuid)
        : data.datas.filter((house) => house.suites && house.suites.length > 0)
      : [],
    [data]
  )

  useEffect(() => {
    if (!houseUuid && withSuitsHouzes.length > 0)
      setValue('house', withSuitsHouzes[0].uuid)
  }, [houseUuid, withSuitsHouzes, setValue, name])

  const getSuites = useCallback(() => {
    const houz = withSuitsHouzes?.find((houz) =>
      houseUuid ? houz.uuid === houseUuid : houz.uuid === getValues('house')
    )

    const result = !willBookDatas
      ? houz?.suites.map(({ title, uuid, price }) => ({
          label: title,
          value: uuid,
          price,
        }))
      : houz?.suites
          .filter((suit) => suit.uuid === willBookDatas?.suiteUuid)
          .map(({ title, uuid, price }) => ({
            label: title,
            value: uuid,
            price,
          }))

    if (willBookDatas && name === 'suite' && result && result.length > 0) {
      setSuiteUnitPrice(result[0]?.price)
    }

    return result
  }, [
    withSuitsHouzes,
    getValues,
    houseUuid,
    name,
    setSuiteUnitPrice,
    willBookDatas,
  ])

  const handleChange = (e) => {
    switch (name) {
      case 'house':
        const houseUuid = e.target.value
        onChange(houseUuid)
        setCurrentHouseUuid(houseUuid)

        break
      case 'suite':
        const suiteUuid = e.target.value
        onChange(suiteUuid)

        const choosenSuite = getSuites().find(
          (suit) => suit.value === suiteUuid
        )
        if (choosenSuite) {
          setSuiteUnitPrice(choosenSuite.price)
        }

        break

      default:
        break
    }
  }

  const options = useCallback(() => {
    if (withSuitsHouzes.length > 0) {
      switch (name) {
        case 'house':
          const houseOptions = withSuitsHouzes.map(
            ({ name: houseName, uuid }) => ({
              value: uuid,
              label: houseName,
            })
          )
          return houseOptions

        case 'suite':
          return getSuites()

        default:
          break
      }
    } else {
      return null
    }
  }, [withSuitsHouzes, name, getSuites])

  const defaultValue = useCallback(() => {
    switch (name) {
      case 'house':
        if (willBookDatas) return willBookDatas.houseUuid
        return options()[0].value

      case 'suite':
        if (willBookDatas) return willBookDatas.suiteUuid
        if (options() && options().length > 0) return options()[0].value
        return null

      default:
        break
    }
  }, [willBookDatas, name, options])

  useEffect(() => {
    onChange(defaultValue())
  })

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: 'Choisissez une option',
      }}
      defaultValue={defaultValue()}
      render={({ field }) => (
        <TextField
          {...rest}
          {...field}
          disabled={willBookDatas}
          sx={{ m: 1, width: '100%' }}
          id={name}
          variant="filled"
          onChange={(event) => handleChange(event)}
          error={Boolean(error)}
          helperText={error ? error.message : ''}
          InputLabelProps={{
            shrink: true,
          }}
          select
          SelectProps={{
            native: true,
          }}
        >
          {options() ? (
            options().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            <option value="erreur">erreur</option>
          )}
        </TextField>
      )}
    />
  )
}

SelectInput.defaultProps = {
  willBookDatas: null,
  houseUuid: null,
  width: '100%',
  rules: { fake: true },
  example: '',
}
SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  /* eslint-disable-line*/
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,

  rules: PropTypes.shape({
    fake: PropTypes.bool,
  }),
  width: PropTypes.string,
  label: PropTypes.string.isRequired,
  example: PropTypes.string,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  setSuiteUnitPrice: PropTypes.func.isRequired,
  setCurrentHouseUuid: PropTypes.func.isRequired,
  willBookDatas: PropTypes.shape({
    houseUuid: PropTypes.string,
    suiteUuid: PropTypes.string,
  }),
}

export default React.memo(SelectInput)
