import { errorHandler } from '@/services/api/ErrorHandler'
import {
  Autocomplete,
  AutocompleteInputChangeReason,
  TextField,
  createFilterOptions,
  debounce
} from '@mui/material'
import { t } from 'i18next'
import { useState } from 'react'

type Option = {
  value: string
  text: string
}

type ApiServer = {
  count: number
  items: Option[]
}

type Filter = {
  keyword: string
  page: number
  size: number
}

export type Props = {
  fullWidth?: boolean
  sx?: object
  label?: string
  value?: Option
  defaultOptions?: Option[]
  apiServer: (filter: Filter) => Promise<ApiServer>
  onChange: (value: string) => void
}

export default function AutoComplete({
  apiServer,
  defaultOptions,
  sx,
  fullWidth,
  label,
  value,
  onChange
}: Props) {
  const page = 1
  const size = 20
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [options, setOption] = useState<Option[]>(() => {
    if (defaultOptions) return defaultOptions
    else return []
  })

  const handleChangeInput = (
    _: unknown,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    if (reason === 'input') handleRequest(value)
  }

  const handleRequest = async (keyword: string) => {
    try {
      setLoading(true)
      const newOptions = await apiServer({ keyword, size, page })
      setOption(newOptions.items)
    } catch (err) {
      errorHandler(err)
    } finally {
      setLoading(false)
    }
  }

  const handleOnOpen = () => {
    setOpen(true)
    handleRequest('')
  }

  const handleOnChange = (_: unknown, value: Option | null) => {
    if (typeof value === 'object' && value?.value) onChange(value?.value || '')
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option: Option) => option.text,
    ignoreAccents: true,
    limit: size
  })

  return (
    <Autocomplete
      sx={sx}
      open={open}
      value={value}
      loading={loading}
      options={options}
      fullWidth={fullWidth}
      loadingText={`${t('loading')}...`}
      onOpen={handleOnOpen}
      filterOptions={filterOptions}
      onInputChange={debounce(handleChangeInput, 400)}
      onClose={() => setOpen(false)}
      getOptionLabel={(option) => option.text}
      onChange={handleOnChange}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  )
}
