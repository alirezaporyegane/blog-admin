import { MdAdd, MdRemove, MdChevronLeft } from 'react-icons/md'
import Button from '@/module/shared/components/Button'
import Card from '@/module/shared/components/Card'
import Link from '@/module/shared/components/Link'
import Table, { IHead } from '@/module/shared/components/Table'

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
      label: 'name'
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

    return <div key={key}>{value[key as keyof IItems]}</div>
  }

  function collapseItem(item: IItems) {
    return <div>{item.name}</div>
  }

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
        classes="mb-10"
        items={items}
        heads={head}
        cellProps={cellProps}
        collapseItem={collapseItem}
      />

      <div className="flex">
        <Link
          to="/path"
          classes="btn-danger py-2 ps-4 pe-3"
          icon={<MdChevronLeft />}
        >
          عنوان
        </Link>
      </div>
    </div>
  )
}

export default App
