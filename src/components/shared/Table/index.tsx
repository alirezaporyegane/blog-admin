import useSetSearchQuery from '@/hooks/useSetSearchQuery'
import { Paper, Table, TableCellProps, TableContainer } from '@mui/material'
import { ReactNode, useState } from 'react'
import PaginationComponent from './PaginationComponent'
import TableBodyComponent from './TableBodyComponent'
import TableHeader from './TableHeaderComponent'

export type Order = 'asc' | 'desc'

export type Item = {
  [key: string]: any
}

export type TableHeader = {
  key: keyof Item
  label: string
  classes?: string
  sortable?: boolean
} & TableCellProps

export type Props<T> = {
  hover?: boolean
  heads: TableHeader[]
  bodyClass?: string
  headClasses?: string
  striped?: boolean
  classes?: string
  items: T[] | undefined
  count: number
  expanded?: boolean
  sortColumn?: keyof Item
  size?: number
  loading?: boolean
  rowsPerPageOptions?: number[]
  cellContentProps?: (key: keyof Item, item: Item) => ReactNode
}

const TableComponent = <T extends Item>({
  heads,
  headClasses,
  items = [],
  bodyClass,
  classes,
  sortColumn = '_id',
  size = 20,
  count,
  hover = true,
  loading,
  rowsPerPageOptions = [10, 20, 30, 50],
  cellContentProps
}: Props<T>) => {
  const [searchParams, setQuery] = useSetSearchQuery()
  const [order, setOrder] = useState<Order>(
    () => (searchParams.get('sortType') as Order) || 'desc'
  )
  const [orderBy, setOrderBy] = useState<string | number>(
    () => searchParams.get('sortColumn') || sortColumn
  )

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Item = '_id'
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)

    const query = {
      sortType: isAsc ? 'desc' : 'asc',
      sortColumn: property
    }

    setQuery({ ...query })
  }

  return (
    <Paper
      sx={{
        width: '100%',
        mb: 2,
        borderRadius: 3,
        boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px;'
      }}
    >
      <TableContainer classes={{ root: classes }}>
        <Table aria-label="collapsible table">
          {heads?.length && (
            <>
              <TableHeader<T>
                heads={heads}
                items={items}
                order={order}
                orderBy={orderBy}
                headClasses={headClasses}
                onRequestSort={handleRequestSort}
              />

              <TableBodyComponent
                loading={loading}
                items={items}
                hover={hover}
                tableHeaders={heads}
                bodyClass={bodyClass}
                cellContentProps={cellContentProps}
              />
            </>
          )}
        </Table>
      </TableContainer>

      {items?.length ? (
        <PaginationComponent
          count={count}
          size={size}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      ) : (
        ''
      )}
    </Paper>
  )
}

export default TableComponent
