import { PostCategoryType } from '@/@types/PostCategories'
import TitleSection from '@/components/shared/TitleSection'
import { PostCategories } from '@/services/api'
import { errorHandler } from '@/services/api/ErrorHandler'
import { success } from '@/utils/Notify'
import { CategoryOutlined } from '@mui/icons-material'
import { Button, Card, Typography } from '@mui/material'
import { t } from 'i18next'
import { memo, useRef, useState } from 'react'
import Create from './components/Create'
import Items from './components/Items'

type Props = {
  data: PostCategoryType[]
}

type ItemsComponentType = {
  setItemsFromParent: (data: PostCategoryType[]) => void
}

const Empty = memo(() => {
  return (
    <Card
      sx={{
        p: 2,
        width: 1,
        borderRadius: 3,
        boxShadow:
          'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;'
      }}
    >
      <Typography textAlign={'center'} fontSize={20} fontWeight={700}>
        {t('thereAreNoItemsToDisplay')}
      </Typography>
    </Card>
  )
})

export default function PostCategoriesView({ data }: Props) {
  const itemsComponentRef = useRef<ItemsComponentType>(null)
  const [progressing, setProgressing] = useState<boolean>(false)
  const [items, setItems] = useState<PostCategoryType[]>(() => {
    return data.sort((a, b) => a.sortOrder - b.sortOrder)
  })
  const onsubmit = (newData: any) => {
    const newItem = {
      ...newData,
      _id: -Math.round(Math.random() * 99999),
      sortOrder: items.length + 1
    }
    setItems((prev) => [...prev, newItem])
    itemsComponentRef.current?.setItemsFromParent([...items, newItem])
  }

  const reInit = (newData: PostCategoryType[]) => {
    newData = newData.sort((a, b) => a.sortOrder - b.sortOrder)
    setItems(newData)
    itemsComponentRef.current?.setItemsFromParent(newData)
  }

  const getData = async () => {
    try {
      const newData = await PostCategories.getAllItem()
      reInit(newData)
      setItems(newData)
      itemsComponentRef.current?.setItemsFromParent(newData)
    } catch (err) {
      errorHandler(err)
    }
  }

  const handleClick = async () => {
    try {
      setProgressing(true)
      await PostCategories.patchItem(items)
      getData()
      success(t('categoriesUpdated'))
    } catch (err) {
      errorHandler(err)
    } finally {
      setProgressing(false)
    }
  }

  return (
    <>
      <TitleSection title={t('postCategories')} icon={<CategoryOutlined />} />

      <Create progressing={progressing} onSubmit={onsubmit} />

      {items?.length ? (
        <Items ref={itemsComponentRef} all={items} setData={setItems} />
      ) : (
        <Empty />
      )}

      <Button
        variant="contained"
        size="large"
        color="success"
        sx={{ mt: 2 }}
        disabled={progressing}
        onClick={handleClick}
      >
        {t('save')}
      </Button>
    </>
  )
}
