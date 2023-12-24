import { PostCategoryType } from '@/@types/PostCategories'
import { palette } from '@/theme/MatrialConfig'
import {
  DeleteTwoTone,
  EditNoteOutlined,
  SwapVertOutlined
} from '@mui/icons-material'
import {
  Card,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  Tooltip,
  Typography
} from '@mui/material'
import { t } from 'i18next'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  item: PostCategoryType
  remove: (id: string | number) => void
}

const Item = ({ item, remove }: Props) => {
  const [active, setActive] = useState<boolean>(item.active)
  const navigate = useNavigate()
  const handleRouteChange = () => {
    navigate(`/post-categories/edit/${item._id}`)
  }

  const changeActive = (_: any, checked: boolean) => {
    setActive(checked)
    item.active = checked
  }

  return (
    <Card
      sx={{
        width: 1,
        borderRadius: 3,
        boxShadow:
          'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;'
      }}
    >
      <Grid container spacing={2} paddingInlineEnd={1}>
        <Grid
          item
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          bgcolor={palette.background?.default}
        >
          <SwapVertOutlined sx={{ m: 2 }} />
        </Grid>

        <Grid item display={'flex'} alignItems={'center'}>
          <Typography fontWeight={700}>{item.name}</Typography>
        </Grid>

        <Grid item display={'flex'} alignItems={'center'} justifyContent={'end'} xl={7}>
          <FormControlLabel
            label={t('active')}
            control={
              <Switch
                value={active}
                checked={item.active}
                onChange={changeActive}
              />
            }
          />
        </Grid>

        <Grid
          item
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ ml: 'auto' }}
        >
          {typeof item._id === 'string' ? (
            <Tooltip
              title={t('edit')}
              placement="top"
              onClick={handleRouteChange}
            >
              <IconButton size="small" color="info">
                <EditNoteOutlined />
              </IconButton>
            </Tooltip>
          ) : null}

          <Tooltip title={t('delete')} placement="top">
            <IconButton
              size="small"
              color="error"
              onClick={() => remove(item._id)}
            >
              <DeleteTwoTone />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Item
