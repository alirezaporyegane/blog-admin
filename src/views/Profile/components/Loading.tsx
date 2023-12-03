import { Card, Grid, Skeleton } from '@mui/material'

const Loading = () => {
  return (
    <Card
      variant="elevation"
      sx={{ p: 3, width: 1, borderRadius: 3 }}
      classes={{
        root: '!shadow-sm'
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Skeleton variant="rounded" height={56} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Skeleton variant="rounded" height={56} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Skeleton variant="rounded" height={56} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Skeleton variant="rounded" height={56} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Skeleton variant="rounded" height={56} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Skeleton variant="rounded" height={56} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
      </Grid>

      <Grid item lg={4}>
        <Skeleton
          width={80}
          height={42}
          classes={{
            root: '!mt-5'
          }}
          variant="rounded"
        />
      </Grid>
    </Card>
  )
}

export default Loading
