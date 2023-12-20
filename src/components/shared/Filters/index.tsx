import { Card, Collapse } from '@mui/material'

type Props = {
  expanded: boolean
}

const Filters = ({ expanded }: Props) => {
  return (
    <Collapse in={expanded}>
      <Card id="filterItems" sx={{ p: 2 }}></Card>
    </Collapse>
  )
}

export default Filters
