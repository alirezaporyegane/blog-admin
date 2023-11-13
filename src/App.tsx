import axios from 'axios'
import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Link,
  Modal,
  Table,
  TextField,
  type IHead,
  type IModalRef,
  type IOption
} from 'components/shared/ui'
import { useEffect, useRef, useState } from 'react'
import { MdAdd, MdHome, MdRemove, MdChevronLeft } from 'react-icons/md'

interface IItems {
  id: number
  title: string
}

enum Sort {
  ASCENDING = 'ascending',
  DESCENDING = 'descending'
}

function App() {
  const [items, setItems] = useState<IItems[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [textField, setTextField] = useState<string>('')
  const modalRef = useRef<IModalRef>()

  function handleClick() {
    modalRef.current?.show()
  }

  function hideModal() {
    modalRef.current?.hide()
  }

  const head: IHead[] = [
    {
      key: '_id',
      label: 'id',
      sortable: true
    },
    {
      key: 'title',
      label: 'name',
      sortable: true
    },
    {
      key: 'action',
      label: ''
    }
  ]

  useEffect(() => filter('name', Sort.ASCENDING), [])

  function filter(key: string, sort: string) {
    const sortKey = `sort=${key}:${sort === Sort.ASCENDING ? 1 : -1}`

    getPosts(sortKey)
  }

  async function getPosts(sort: string) {
    const posts: { data: IItems[] } = await axios.get(
      `http://localhost:4000/api/admin/brands?${sort}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmEzMmMxZDNiYTk4NTJjZDRmNGJiNjgiLCJwaG9uZU51bWJlciI6IjA5MDMzMTU5NTcwIiwiZW1haWwiOiJhbGlyZXphcG9yeWVnYW5lQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoicm9vdCIsImZpcnN0TmFtZSI6Iti52YTbjNix2LbYpyIsImxhc3ROYW1lIjoi2b7ZiNix24zar9in2YbZhyIsInJvbGUiOlsicm9vdCJdLCJjb25maXJtRW1haWwiOnRydWUsImNvbmZpcm1QaG9uZU51bWJlciI6dHJ1ZSwidW5pcXVlSWQiOiJzdHJpbmciLCJpYXQiOjE2OTk3NzIwMzMsImV4cCI6MTY5OTk0NDgzM30.IN280U02vu6zhhuF-918ValWbsdX5TmCOImf-S7NCis'
        }
      }
    )

    setItems(posts.data)
    setLoading(false)
  }

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
    return item.title
  }

  function emitSortableKey(key: string, sort: string) {
    filter(key, sort)
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
        color="primary"
        class="mb-10"
        icon={<MdAdd />}
        clicked={handleClick}
      >
      </Button>

      <Card elevated classes="mb-10">test</Card>

      {loading ? (
        <div>loading</div>
      ) : (
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
      )}

      <div className="flex items-center mb-10">
        <Badge label="عنوان" color="primary" />
      </div>

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
      <Breadcrumbs classes="mb-10" options={breadcrumbsOption} />

      <TextField
        type="text"
        size="lg"
        label="عنوان"
        value={textField}
        classes="mb-10"
        changed={(e) => setTextField(e.target.value)}
      />

      <Modal ref={modalRef} centered showTitle title="عنوان">
        <TextField
          type="text"
          label="نام"
          value={textField}
          classes="mb-3"
          changed={(e) => setTextField(e.target.value)}
        />

        <TextField
          type="text"
          label="نام خانوادگی"
          value={textField}
          classes="mb-10"
          changed={(e) => setTextField(e.target.value)}
        />

        <Button
          type="button"
          color="success"
          class="rounded-full"
          block
          clicked={hideModal}
        >
          ارسال
        </Button>
      </Modal>
    </div>
  )
}

export default App
