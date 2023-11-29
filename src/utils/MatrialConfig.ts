import createCache from '@emotion/cache'
import { createTheme } from '@mui/material'
import { faIR } from '@mui/x-date-pickers/locales'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'

const palette = {
  primary: {
    main: '#1E2226',
    100: '#D5D6D7',
    200: '#9EA4AA',
    300: '#828990',
    400: '#5A6168',
    500: '#49515A',
    600: '#3E4750',
    700: '#2A3139',
    800: '#1E2226',
    900: '#181A1C'
  }
}

export const theme = createTheme(
  {
    direction: 'rtl',
    components: {
      MuiOutlinedInput: {
        defaultProps: {
          classes: {
            error: 'absolute'
          },
          sx: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.primary[100],
              borderRadius: 2
            },
            '& .MuiFormHelperText-root': {
              position: 'absolute',
              bottom: -20
            }
          }
        }
      }
    },
    palette,
    typography: {
      fontFamily: 'Vazirmatn'
    }
  },
  faIR
)

export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin]
})
