import { TableBody, TableCell, TableRow } from '@mui/material'
import { t } from 'i18next'
import { TableHeader } from '.'

type Item = {
  [key: string]: any
}

type Props = {
  bodyClass?: string
  items: Item[]
  tableHeaders: TableHeader[]
}

type TrProps = Pick<Props, 'items' | 'tableHeaders'>

type TdProps = {
  item: Item
  tableHeader: TableHeader
}

const TdComponent = ({ tableHeader, item }: TdProps) => {
  return (
    <TableCell component="td" sx={{ borderColor: 'ghostwhite' }}>
      {item[tableHeader.key]}
    </TableCell>
  )
}

const TrComponent = ({ items, tableHeaders }: TrProps) => {
  if (items?.length)
    return items.map((item, index) => {
      return (
        <TableRow
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {tableHeaders.map((tableHeader) => {
            return (
              <TdComponent
                key={tableHeader.key}
                tableHeader={tableHeader}
                item={item}
              />
            )
          })}
        </TableRow>
      )
    })

  return (
    <TableRow>
      <TableCell component="td" colSpan={100}>
        {t('thereAreNoItemsToDisplay')}
      </TableCell>
    </TableRow>
  )
}

const TableBodyComponent = ({ bodyClass, items, tableHeaders }: Props) => {
  return (
    <TableBody classes={{ root: bodyClass }}>
      <TrComponent items={items} tableHeaders={tableHeaders} />
    </TableBody>
  )
}

export default TableBodyComponent
