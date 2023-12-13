import { HeaderNameContext } from '@/context/HeaderNameContext'
import { Add } from '@mui/icons-material'
import { Button, Grid, Typography } from '@mui/material'
import { t } from 'i18next'
import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const { name } = useContext(HeaderNameContext)
  const navigation = useNavigate()
  const location = useLocation()

  const handleSubmit = () => {
    const url = `${location.pathname}/create`
    navigation(url)
  }

  return (
    <>
      <Grid
        container
        justifyContent={'space-between'}
        alignContent={'center'}
        sx={{ marginBottom: 3, marginTop: 3 }}
      >
        <Grid item>
          <Typography fontSize={25} fontWeight={600}>
            {name}
          </Typography>
        </Grid>

        <Grid item>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            {t('add')}

            <Add sx={{ marginLeft: 1 }} />
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Header
