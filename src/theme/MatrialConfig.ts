import createCache from '@emotion/cache'
import { PaletteOptions, createTheme } from '@mui/material'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'

export const palette: PaletteOptions = {
  background: {
    default: '#FAFAFF'
  },
  primary: {
    main: '#006495',
    light: '#006495',
    dark: '#003450',
    50: '#E7F2FF',
    100: '#CBE6FF',
    200: '#8FCDFF',
    300: '#5DB3F1',
    400: '#3D98D4',
    500: '#006495',
    600: '#006495',
    700: '#004B71',
    800: '#003450',
    900: '#001E30'
  },
  secondary: {
    main: '#944A00',
    light: '#944A00',
    dark: '#4F2500',
    50: '#FFFBFF',
    100: '#FFDCC6',
    200: '#FFB784',
    300: '#FF8E2D',
    400: '#E07300',
    500: '#B95E00',
    600: '#944A00',
    700: '#713700',
    800: '#4F2500',
    900: '#301400'
  },
  error: {
    main: '#BA1B1B',
    light: '#BA1B1B',
    dark: '#680003',
    50: '#FFEDE9',
    100: '#FFDAD4',
    200: '#FFB4A9',
    300: '#FF897A',
    400: '#FF5449',
    500: '#DD3730',
    600: '#BA1B1B',
    700: '#930006',
    800: '#680003',
    900: '#410001'
  },
  success: {
    main: '#006E22',
    light: '#006E22',
    dark: '#005317',
    50: '#C7FFC2',
    100: '#72FE7F',
    200: '#54E166',
    300: '#31C44E',
    400: '#00A838',
    500: '#008A2D',
    600: '#006E22',
    700: '#005317',
    800: '#00390D',
    900: '#082B10'
  },
  info: {
    main: '#009EB9',
    light: '#009EB9',
    dark: '#55D6F4',
    50: '#D8F6FF',
    100: '#ACEDFF',
    200: '#55D6F4',
    300: '#2DBAD7',
    400: '#009EB9',
    500: '#008399',
    600: '#00687A',
    700: '#004E5C',
    800: '#003640',
    900: '#001F26'
  },
  warning: {
    main: '#BD8711',
    light: '#BD8711',
    dark: '#FABC49',
    50: '#FFEED9',
    100: '#FABC49',
    200: '#FABC49',
    300: '#DBA130',
    400: '#BD8711',
    500: '#9D6E00',
    600: '#7D5700',
    700: '#422C00',
    800: '#422C00',
    900: '#271900'
  },
  grey: {
    '100': '#F0F0F3'
  }
}

export const theme = createTheme({
  direction: 'rtl',
  components: {
    MuiOutlinedInput: {
      defaultProps: {
        classes: {
          error: 'absolute'
        },
        sx: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.grey?.[100],
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
})

export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin]
})
