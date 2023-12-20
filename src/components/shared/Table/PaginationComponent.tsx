import useSetSearchQuery from '@/hooks/useSetSearchQuery'
import {
  Grid,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { t } from 'i18next'
import { useState } from 'react'

type Props = {
  size: number
  count: number
  rowsPerPageOptions: number[]
}

const PaginationComponent = ({ size, count, rowsPerPageOptions }: Props) => {
  const [searchParams, setQuery] = useSetSearchQuery()

  const [rowsPerPage, setRowsPerPage] = useState<number>(
    () => Number(searchParams.get('size')) || size
  )
  const [page, setPage] = useState<number>(
    () => Number(searchParams.get('page')) || 1
  )

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
    if (newPage && newPage !== 1) setQuery({ page: newPage })
    else {
      searchParams.delete('page')
      setQuery({ ...searchParams })
    }
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(parseInt(event.target.value.toString()))
    setPage(1)
    if (parseInt(event.target.value.toString()) !== 20)
      setQuery({ size: event.target.value })
    else {
      searchParams.delete('size')
      searchParams.delete('page')
      setQuery({ ...searchParams })
    }
  }

  const isLastPage = rowsPerPage * page >= count
  const pageSize = Math.ceil(count / rowsPerPage)
  const fromPage = Math.round((page - 1) * rowsPerPage + 1 || 1)
  const toPage = Math.round(isLastPage ? count : page * rowsPerPage)
  const rows = Number(rowsPerPage)

  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{ padding: 2 }}
    >
      <Grid item xs={12} md={6} lg={4} xl={4}>
        <p>
          {[`${fromPage}`, '-', `${toPage}`, `${t('from')}`, `${count}`].join(
            ' '
          )}
        </p>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        xl={4}
        display={'flex'}
        justifyContent={'center'}
      >
        {count > rowsPerPage && (
          <Pagination
            count={pageSize}
            color="primary"
            page={page}
            onChange={handleChangePage}
          />
        )}
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        xl={4}
        display={'flex'}
        justifyContent={'end'}
        alignItems={'center'}
      >
        <p>{t('perPage')} :</p>

        <Select
          size="small"
          variant="standard"
          defaultValue={rows}
          value={rowsPerPage}
          sx={{ marginLeft: 1 }}
          onChange={handleChangeRowsPerPage}
        >
          {rowsPerPageOptions?.map((option) => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            )
          })}
        </Select>
      </Grid>
    </Grid>
  )
}

export default PaginationComponent
