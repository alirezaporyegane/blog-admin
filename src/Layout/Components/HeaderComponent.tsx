import { getTitleFromRoute } from '@/utils/docTitle'
import { Button, Grid, Typography } from '@mui/material'
import { lazy, useState } from 'react'
import { useLocation } from 'react-router-dom'
const CreateComponent = lazy(
  () => import('@/components/shared/CreateComponent')
)
const FilterComponent = lazy(() => import('@/components/shared/Filters'))

const Header = () => {
  const location = useLocation()
  const name = getTitleFromRoute(location.pathname, true)
  const showButtonLocations = ['/users', '/post-categories']
  const [expanded, setExpanded] = useState<boolean>(false)

  function toggleFilter() {
    setExpanded((prev) => {
      prev = !expanded
      return prev
    })
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
          {showButtonLocations.includes(location.pathname) ? (
            <Grid display={'flex'}>
              <Button
                variant="contained"
                color="info"
                sx={{ mr: 3 }}
                onClick={toggleFilter}
              >
                Filter
              </Button>

              <CreateComponent />
            </Grid>
          ) : null}
        </Grid>

        <Grid item xs={12} sx={{ mt: 3 }}>
          <FilterComponent expanded={expanded} />
        </Grid>
      </Grid>
    </>
  )
}

export default Header
