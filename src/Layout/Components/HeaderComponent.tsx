import { HeaderNameContext } from '@/context/HeaderNameContext'
import { Grid, Typography } from '@mui/material'
import { lazy, useContext } from 'react'
import { useLocation } from 'react-router-dom'
const CreateComponent = lazy(
  () => import('@/components/shared/CreateComponent')
)

const Header = () => {
  const { name } = useContext(HeaderNameContext)
  const location = useLocation()
  const showButtonLocations = ['/users', '/post-categories']

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

        <Grid id="navigation" item>
          {showButtonLocations.includes(location.pathname) ? (
            <CreateComponent />
          ) : null}
        </Grid>
      </Grid>
    </>
  )
}

export default Header
