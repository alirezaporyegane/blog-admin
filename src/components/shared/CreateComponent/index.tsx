import { Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import { Add } from '@mui/icons-material'

const CreateComponent = () => {
  const location = useLocation()
  const navigation = useNavigate()

  const handleSubmit = () => {
    const url = `${location.pathname}/create`
    navigation(url)
  }

  return (
    <Button variant="contained" color="success"  onClick={handleSubmit}>
      {t('add')}

      <Add sx={{ marginLeft: 1 }} />
    </Button>
  )
}

export default CreateComponent
