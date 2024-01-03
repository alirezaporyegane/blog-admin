import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material'
import { t } from 'i18next'
import { ReactNode } from 'react'
import { Item, TableHeader } from '.'
import {palette} from '@/theme/MatrialConfig'

type Props = {
  bodyClass?: string
  items: Item[]
  hover?: boolean
  loading?: boolean
  tableHeaders: TableHeader[]
  cellContentProps?: (key: keyof Item, item: Item) => ReactNode
}

type TrProps = Pick<
  Props,
  'items' | 'tableHeaders' | 'cellContentProps' | 'hover' | 'loading'
>

type TdProps = Pick<Props, 'cellContentProps'> & {
  item: Item
  tableHeader: TableHeader
}

const TdComponent = ({ tableHeader, item, cellContentProps }: TdProps) => {
  return (
    <TableCell
      component="td"
      sx={{ borderColor: palette.grey?.[100], color: palette.text?.primary }}
    >
      {cellContentProps
        ? cellContentProps(tableHeader.key, item)
        : item[tableHeader.key]}
    </TableCell>
  )
}

const TrComponent = ({
  items,
  tableHeaders,
  hover,
  loading,
  cellContentProps
}: TrProps) => {
  if (items?.length)
    return items.map((item, index) => {
      return (
        <TableRow key={index} hover={hover}>
          {loading ? (
            <TableCell
              component="td"
              colSpan={100}
              padding="none"
              sx={{ padding: '0 10px' }}
            >
              <Skeleton width={'100%'} height={'60px'} />
            </TableCell>
          ) : (
            <>
              {tableHeaders.map((tableHeader) => {
                return (
                  <TdComponent
                    key={tableHeader.key}
                    item={item}
                    tableHeader={tableHeader}
                    cellContentProps={cellContentProps}
                  />
                )
              })}
            </>
          )}
        </TableRow>
      )
    })

  return (
    <TableRow>
      <TableCell component="td" colSpan={100} sx={{ textAlign: 'center' }}>
        {t('thereAreNoItemsToDisplay')}
      </TableCell>
    </TableRow>
  )
}

const TableBodyComponent = ({
  bodyClass,
  items,
  tableHeaders,
  hover,
  loading,
  cellContentProps
}: Props) => {
  return (
    <TableBody classes={{ root: bodyClass }}>
      <TrComponent
        hover={hover}
        items={items}
        loading={loading}
        tableHeaders={tableHeaders}
        cellContentProps={cellContentProps}
      />
    </TableBody>
  )
}

export default TableBodyComponent
