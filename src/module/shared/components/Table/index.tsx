import { Fragment, ReactNode, useState } from 'react'

export interface IHead {
  key: string
  label: string
  classes?: string
}

interface IProps<T> {
  heads: IHead[]
  bodyClass?: string
  headClasses?: string
  items: T[]
  classes?: string
  collapseItem?: (item: T) => ReactNode
  cellProps?: (
    key: string,
    value: T,
    index: number,
    collapse?: boolean,
    tableIndex?: number,
    collapsing?: (index: number) => void
  ) => ReactNode
  expanded?: boolean
}

interface IItems {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const Table = <T extends IItems>({
  heads,
  headClasses,
  items,
  bodyClass,
  cellProps,
  expanded = false,
  classes,
  collapseItem
}: IProps<T>) => {
  const [collapse, setCollapse] = useState<boolean>(false)
  const [tableIndex, setTableIndex] = useState<number>(0)

  function collapsing(index: number) {
    setCollapse((preCollapse: boolean) => {
      preCollapse = !collapse
      return preCollapse
    })

    setTableIndex(index)
  }

  return (
    <div
      className={`${
        classes ? `${classes} ` : ''
      }border bg-white rounded-xl overflow-hidden`}
    >
      <table className="table-auto border-collapse w-full text-sm">
        {heads?.length && (
          <>
            <thead className={`${headClasses ? headClasses : ''}bg-gray-50`}>
              <tr>
                {heads.map((head: IHead) => {
                  return (
                    <th
                      key={head.key}
                      className={`${
                        head.classes ? head.classes : ''
                      }border-b border-gray-200 font-medium px-4 py-3 text-gray-600 dark:text-slate-200 text-right`}
                    >
                      {head.label}
                    </th>
                  )
                })}
              </tr>
            </thead>

            <tbody className={bodyClass}>
              {items.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <tr
                      className={
                        index !== items.length - 1
                          ? index === tableIndex && collapse
                            ? ''
                            : 'border-b'
                          : ''
                      }
                    >
                      {heads.map((head) => {
                        return (
                          <td key={head.key} className="py-3 px-4">
                            {cellProps
                              ? cellProps(
                                  head.key,
                                  item,
                                  index,
                                  collapse,
                                  tableIndex,
                                  () => collapsing(index)
                                )
                              : item[head.key]}
                          </td>
                        )
                      })}
                    </tr>

                    {expanded && collapse && index === tableIndex && (
                      <tr
                        className={index !== items.length - 1 ? 'border-b' : ''}
                      >
                        {collapseItem && collapseItem(item)}
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </>
        )}
      </table>
    </div>
  )
}

export default Table
