import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { Item, Order, Props } from '.'

type TableHeaderProps<T> = Pick<Props<T>, 'items' | 'heads' | 'headClasses'> & {
  orderBy: number | string
  order: Order
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Item
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
    (property: keyof Item) => (event: React.MouseEvent<unknown>) => {
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
                sx={{ fontWeight: 700 }}
              >
                {head.sortable ? (
                  <TableSortLabel
                    hideSortIcon={head.sortable}
                    active={orderBy === head.key}
                    direction={orderBy === head.key ? order : 'asc'}
                    onClick={createSortHandler(head.key)}
                  >
                    {head.label}
                  </TableSortLabel>
                ) : (
                  head.label
                )}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    )

  return null
}

export default TableHeader
