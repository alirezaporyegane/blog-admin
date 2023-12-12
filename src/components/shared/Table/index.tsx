import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableCellProps,
  TableSortLabel
} from '@mui/material'
import TableBodyComponent from './TableBodyComponent'
import { useState } from 'react'
import useSetSearchQuery from '@/hooks/useSetSearchQuery'

export type Order = 'asc' | 'desc'

type Items = {
  [key: string]: any
}

export type TableHeader = {
  key: keyof Items
  label: string
  classes?: string
} & TableCellProps

type TableHeaderProps<T> = Pick<Props<T>, 'items' | 'heads' | 'headClasses'> & {
  orderBy: number | string
  order: Order
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Items
  ) => void
}

function TableHeader<T>({
  heads,
  items,
  headClasses,
  orderBy,
  order,
  onRequestSort
}: TableHeaderProps<T>) {
  const createSortHandler =
    (property: keyof Items) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }
  if (items?.length)
    return (
      <TableHead classes={{ root: headClasses }}>
        <TableRow>
          {heads.map((head) => {
            return (
              <TableCell
                key={head.key}
                sortDirection={orderBy === head.key ? order : false}
              >
                <TableSortLabel
                  active={orderBy === head.key}
                  direction={orderBy === head.key ? order : 'asc'}
                  onClick={createSortHandler(head.key)}
                >
                  {head.label}
                </TableSortLabel>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    )

  return null
}

type Props<T> = {
  heads: TableHeader[]
  bodyClass?: string
  headClasses?: string
  striped?: boolean
  classes?: string
  items: T[] | undefined
  expanded?: boolean
  sortColumn?: keyof Items
}

const TableComponent = <T extends Items>({
  heads,
  headClasses,
  items = [],
  bodyClass,
  classes,
  sortColumn = '_id'
}: Props<T>) => {
  const [searchParams, setQuery] = useSetSearchQuery()
  const [order, setOrder] = useState<Order>(
    () => (searchParams.get('sortType') as Order) || 'asc'
  )
  const [orderBy, setOrderBy] = useState<string | number>(
    () => searchParams.get('sortColumn') || sortColumn
  )

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Items = '_id'
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)

    const query = {
      sortType: isAsc ? 'desc' : 'asc',
      sortColumn: property
    }

    setQuery(query)
  }

  return (
    <TableContainer
      component={Paper}
      classes={{ root: classes }}
      sx={{ borderBottom: 'none', boxShadow: 'none', bgcolor: 'white' }}
    >
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
              bodyClass={bodyClass}
              items={items}
              tableHeaders={heads}
            />
          </>
        )}
      </Table>
    </TableContainer>
  )
}

export default TableComponent
