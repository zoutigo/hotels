import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { DatePicker } from '@material-ui/pickers'

function DatePickerInput({
  control,
  name,
  defaultValue,
  variant,
  format,
  rules,
  example,
  ...rest
}) {
  const {
    field,
    fieldState: { invalid, error, isDirty },
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
    rules: rules,
  })

  const { ref, ...inputProps } = field
  const today = new Date()
  const past = defaultValue !== today ? false : today > defaultValue

  return (
    <DatePicker
      {...inputProps}
      inputRef={ref}
      autoOk
      disabled={past}
      clearable
      format={format}
      inputVariant={variant}
      minDate={today}
      error={invalid}
      helperText={invalid ? error.message : example}
      {...rest}
      style={{ width: '100%' }}
    />
  )
}

DatePickerInput.defaultProps = {
  defaultValue: new Date(),
  variant: 'standard',
}

DatePickerInput.propTypes = {
  defaultValue: PropTypes.instanceOf(Date),
  control: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  variant: PropTypes.string,
  format: PropTypes.string.isRequired,
  example: PropTypes.string.isRequired,
  rules: PropTypes.shape({
    fake: PropTypes.bool,
  }).isRequired,
}

export default DatePickerInput
