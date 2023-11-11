import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Table,
  type IHead,
  type IOption
} from 'components/shared/ui'
import { MdAdd, MdHome, MdRemove } from 'react-icons/md'

function App() {
  interface IItems {
    id: number
    name: string
  }
  function handleClick(e: Element | null) {
    console.log(e)
  }

  const head: IHead[] = [
    {
      key: 'id',
      label: 'id'
    },
    {
      key: 'name',
      label: 'name',
      sortable: true
    },
    {
      key: 'action',
      label: ''
    }
  ]

  const items: IItems[] = [
    {
      id: 1,
      name: 'ali'
    },
    {
      id: 2,
      name: 'ahmad'
    },
    {
      id: 3,
      name: 'reza'
    }
  ]

  function cellProps(
    key: string,
    value: IItems,
    index: number,
    collapse?: boolean,
    tableIndex?: number,
    collapsing?: (index: number) => void
  ) {
    if (key === 'id') return <span className="text-red-600">{value[key]}</span>

    if (key === 'action')
      return (
        <div className="flex justify-end">
          <Button
            icon={collapse && index === tableIndex ? <MdRemove /> : <MdAdd />}
            clicked={() => collapsing && collapsing(index)}
            color="primary"
          ></Button>
        </div>
      )

    return <span key={key}>{value[key as keyof IItems]}</span>
  }

  function collapseItem(item: IItems) {
    return item.name
  }

  function emitSortableKey(key: string, sort: string) {
    console.log(key, sort)
  }

  const breadcrumbsOption: IOption[] = [
    {
      key: '1',
      label: 'خانه',
      path: '/test1',
      icon: <MdHome />
    },
    {
      key: '2',
      label: 'وبلاگ',
      path: '/test2'
    },
    {
      key: '3',
      label: 'تست'
    }
  ]

  return (
    <div className="container mx-auto px-4 mt-5 bg-white dark:bg-black">
      <Button
        type="reset"
        color="danger"
        class="mb-10"
        icon={<MdAdd />}
        clicked={handleClick}
      >
        عنوان
      </Button>

      <Card classes="mb-10">test</Card>

      <Table
        expanded
        striped
        classes="mb-10"
        items={items}
        heads={head}
        cellProps={cellProps}
        collapseItem={collapseItem}
        emitSortableKey={emitSortableKey}
      />

      <div className="flex items-center mb-10">
        <Badge label="عنوان" color="success" />
      </div>

      <Breadcrumbs options={breadcrumbsOption} />
    </div>
  )
}

export default App
