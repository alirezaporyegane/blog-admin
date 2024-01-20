import useIsMobile from '@/hooks/useIsMobile'
import useSetSearchQuery from '@/hooks/useSetSearchQuery'
import { Add, SearchOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  Collapse,
  Grid,
  Modal,
  Typography
} from '@mui/material'
import { t } from 'i18next'
import { Dispatch, ReactNode, SetStateAction, memo, useState } from 'react'
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
  title: string
  icon: ReactNode
  children?: ReactNode
  showCreateButton?: boolean
  showFilterButton?: boolean
  handleSubmit?: UseFormHandleSubmit<FieldValues, undefined>
}

const CreateButtonComponent = () => {
  const location = useLocation()
  const navigation = useNavigate()

  const handleSubmit = () => {
    const url = `${location.pathname}/create`
    navigation(url)
  }

  return (
    <Button variant="contained" color="success" onClick={handleSubmit}>
      {t('add')}

      <Add sx={{ marginLeft: 1 }} />
    </Button>
  )
}

type FilterButtonProps = {
  toggleFilter: () => void
}

const FilterButtonComponent = ({ toggleFilter }: FilterButtonProps) => {
  return (
    <Button variant="contained" color="primary" onClick={toggleFilter}>
      {t('filters')}

      <SearchOutlined sx={{ ml: 1 }} />
    </Button>
  )
}

type FilterProps = {
  expanded: boolean
  children?: ReactNode
  setExpanded: Dispatch<SetStateAction<boolean>>
} & Pick<Props, 'handleSubmit'>

const Filters = ({
  expanded,
  children,
  handleSubmit,
  setExpanded
}: FilterProps) => {
  const isMobile = useIsMobile()
  const [, setQuery] = useSetSearchQuery()
  const onSubmit = (filters: any) => {
    if (isMobile) setExpanded(false)
    setQuery(filters)
  }

  return (
    <>
      {isMobile ? (
        <Modal open={expanded} onClose={() => setExpanded(false)}>
          <Card
            sx={{
              p: 2,
              mt: 2,
              mx: 2,
              boxShadow:
                'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;'
            }}
          >
            <Typography fontSize={22} fontWeight={700} marginBottom={2}>
              {t('filters')}
            </Typography>

            {children}

            <Grid
              item
              lg={12}
              display={'flex'}
              justifyContent={'end'}
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit && handleSubmit(onSubmit)}
              >
                {t('filter')}
              </Button>
            </Grid>
          </Card>
        </Modal>
      ) : (
        <Collapse in={expanded} sx={{ boxShadow: 'none' }}>
          <Card
            sx={{
              p: 2,
              mt: 3,
              boxShadow:
                'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;'
            }}
          >
            {children}

            <Grid
              item
              lg={12}
              display={'flex'}
              justifyContent={'end'}
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit && handleSubmit(onSubmit)}
              >
                {t('filter')}
              </Button>
            </Grid>
          </Card>
        </Collapse>
      )}
    </>
  )
}

const TitleSection = memo(
  ({
    title,
    icon,
    children,
    showCreateButton = false,
    showFilterButton = false,
    handleSubmit
  }: Props) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    function toggleFilter() {
      setExpanded((prev) => {
        prev = !expanded
        return prev
      })
    }
    return (
      <Grid
        container
        justifyContent={'space-between'}
        alignContent={'center'}
        sx={{ marginBottom: 3, marginTop: 3 }}
      >
        <Grid
          item
          xs={12}
          md={6}
          display={'flex'}
          alignItems={'center'}
          justifyContent={{ xs: 'center', md: 'start' }}
          sx={{ mb: { xs: 3, md: 0 } }}
        >
          <Typography fontSize={25} fontWeight={600} sx={{ display: 'flex' }}>
            <span style={{ marginLeft: 12 }}>{icon}</span>

            {title}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          display={'flex'}
          alignItems={'center'}
          justifyContent={{ xs: 'center', md: 'end' }}
        >
          <Box sx={{ mr: 2 }}>
            {showFilterButton ? (
              <FilterButtonComponent toggleFilter={toggleFilter} />
            ) : null}
          </Box>

          {showCreateButton ? <CreateButtonComponent /> : null}
        </Grid>

        {showFilterButton ? (
          <Grid item lg={12}>
            <Filters
              expanded={expanded}
              handleSubmit={handleSubmit}
              setExpanded={setExpanded}
            >
              {children}
            </Filters>
          </Grid>
        ) : null}
      </Grid>
    )
  },
  (prevProps, newProps) => {
    return prevProps.title === newProps.title
  }
)

export default TitleSection
