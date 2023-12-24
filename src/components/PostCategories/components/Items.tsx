import { PostCategoryType } from '@/@types/PostCategories'
import { Card } from '@mui/material'
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react'
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  DropResult,
  Droppable,
  NotDraggingStyle
} from 'react-beautiful-dnd'
import Item from './Item'

type Props = {
  all: PostCategoryType[]
  setData: Dispatch<SetStateAction<PostCategoryType[]>>
}

type ItemsComponentType = {
  setItemsFromParent: (data: PostCategoryType[]) => void
}

const ItemsComponent = forwardRef<ItemsComponentType, Props>(
  ({ all, setData }, ref) => {
    const itemHeight = 67
    const [items, setItems] = useState<PostCategoryType[]>(() => {
      return all.sort((a, b) => a.sortOrder - b.sortOrder)
    })

    const reorder = (
      list: PostCategoryType[],
      startIndex: number,
      endIndex: number
    ) => {
      const result = Array.from(list)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)

      return result
    }

    const setSortOrders = (newItem: PostCategoryType[]) => {
      newItem.forEach((i, index) => (i.sortOrder = index))
    }

    const onDragEnd = (e: DropResult) => {
      if (!e.destination) return

      const newItem = reorder(items, e.source.index, e.destination.index)

      setSortOrders(newItem)
      setItems(newItem)
      setData(newItem)
    }

    const getItemStyle = (
      draggableStyle: DraggingStyle | NotDraggingStyle | undefined
    ): CSSProperties => ({
      userSelect: 'none',
      marginBottom: 8,

      ...draggableStyle
    })

    const onRemove = (id: string | number) => {
      const newItems = items.filter((item) => item._id !== id)
      setItems(newItems)
      setData(newItems)
    }

    useImperativeHandle(ref, () => ({
      setItemsFromParent(newData) {
        setItems(newData)
      }
    }))

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, suspended) => (
            <Card
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                p: '8px 8px 0 8px',
                width: 1,
                borderRadius: 3,
                height: suspended.isDraggingOver
                  ? itemHeight * items.length
                  : 'auto',
                boxShadow:
                  'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;'
              }}
            >
              {items.map((item, index) => {
                return (
                  <Draggable
                    key={item._id}
                    index={index}
                    draggableId={`${item._id}`}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...getItemStyle(provided.draggableProps.style)
                        }}
                      >
                        <Item item={item} remove={onRemove} />
                      </div>
                    )}
                  </Draggable>
                )
              })}
            </Card>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
)

export default ItemsComponent
