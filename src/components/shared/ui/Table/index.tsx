import { Fragment, ReactNode, useState } from 'react'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'

export interface IHead {
  key: string
  label: string
  classes?: string
  sortable?: boolean
  activeSort?: boolean
}

enum Sort {
  ASCENDING = 'ascending',
  DESCENDING = 'descending'
}

interface IProps<T> {
  heads: IHead[]
  bodyClass?: string
  headClasses?: string
  striped?: boolean
  classes?: string
  items: T[] | undefined
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
  emitSortableKey?: (key: string, sort: Sort) => void
}

interface IItems {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const Table = <T extends IItems>({
  heads,
  headClasses,
  items = [],
  classes,
  bodyClass,
  cellProps,
  expanded = false,
  striped = false,
  collapseItem,
  emitSortableKey
}: IProps<T>) => {
  const [collapse, setCollapse] = useState<boolean>(false)
  const [tableIndex, setTableIndex] = useState<number>(0)
  const [headItems, setHeadItems] = useState(heads)

  function collapsing(index: number) {
    setCollapse((preCollapse: boolean) => {
      preCollapse = !collapse
      return preCollapse
    })

    setTableIndex(index)
  }

  function isEven(striped: boolean, index: number) {
    return striped && index % 2 == 0
  }

  function emitSortable(head: IHead) {
    if (head.sortable) {
      setHeadItems(
        headItems.map((item) => {
          if (item.key === head.key) {
            item.activeSort = !item.activeSort
            emitSortableKey &&
              emitSortableKey(
                item.key,
                item.activeSort ? Sort.DESCENDING : Sort.ASCENDING
              )
          } else item.activeSort = false

          return item
        })
      )
    }
  }

  return (
    <div
      className={`${
        classes ? `${classes} ` : ''
      }border bg-white rounded-xl overflow-hidden`}
    >
      <table className="table-auto border-collapse w-full text-sm">
        {headItems?.length && (
          <>
            {items?.length ? (
              <thead className={`${headClasses ? headClasses : ''}bg-gray-100`}>
                <tr>
                  {headItems.map((head) => {
                    return (
                      <th
                        key={head.key}
                        className={`${
                          head.classes ? head.classes : ''
                        }border-b border-gray-200 font-medium px-4 py-3 text-gray-600 dark:text-slate-200 text-right ${
                          head.sortable ? 'cursor-pointer' : ''
                        }`}
                        onClick={() => emitSortable(head)}
                      >
                        <span className="flex">
                          {head.label}
                          {head.activeSort}

                          {head.sortable ? (
                            head.activeSort ? (
                              <MdArrowUpward className="ms-1" />
                            ) : (
                              <MdArrowDownward className="ms-1" />
                            )
                          ) : (
                            ''
                          )}
                        </span>
                      </th>
                    )
                  })}
                </tr>
              </thead>
            ) : null}

            <tbody className={bodyClass}>
              {items?.length ? (
                items.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <tr
                        className={`${
                          index !== items.length - 1
                            ? index === tableIndex && collapse
                              ? ''
                              : 'border-b'
                            : ''
                        } ${isEven(striped, index) ? 'bg-gray-50' : ''}`}
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
                          className={
                            index !== items.length - 1 ? 'border-b' : ''
                          }
                        >
                          <td
                            className={
                              isEven(striped, index) ? 'bg-gray-50' : ''
                            }
                            colSpan={100}
                          >
                            {collapseItem && collapseItem(item)}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  )
                })
              ) : (
                <tr>
                  <td className="py-3 px-4 text-center" colSpan={100}>
                    موردی برای نمایش وجود ندارد
                  </td>
                </tr>
              )}
            </tbody>
          </>
        )}
      </table>
    </div>
  )
}

export default Table
