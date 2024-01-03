import { CloseRounded } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { ReactNode, lazy } from 'react'
const Thumbnail = lazy(() => import('@/components/shared/Thumbnail'))

type Props = {
  images: string | string[]
  remove: (image: string) => void
}

type ImageBoxProps = Pick<Props, 'remove'> & {
  children: ReactNode
  sx: object
  image: string
}

const ImageBox = ({ children, sx, remove, image }: ImageBoxProps) => {
  return (
    <Box
      display={'flex'}
      width={'200px'}
      height={'200px'}
      alignItems={'center'}
      justifyContent={'center'}
      border={'1px dashed #C0C0C0'}
      position={'relative'}
      sx={sx}
    >
      <IconButton
        size="small"
        sx={{ position: 'absolute', top: 4, right: 4 }}
        onClick={() => remove(image)}
      >
        <CloseRounded fontSize="small" />
      </IconButton>

      {children}
    </Box>
  )
}

export default function FileDisplay({ images, remove }: Props) {
  return (
    <>
      {Array.isArray(images) ? (
        images.map((image, index) => (
          <ImageBox
            key={image}
            image={image}
            sx={{ borderRadius: 2, mr: index !== images.length - 1 ? 3 : 0 }}
            remove={remove}
          >
            <Thumbnail src={image} height={150} width={150} alt={image} />
          </ImageBox>
        ))
      ) : (
        <ImageBox sx={{ borderRadius: 2 }} image={images} remove={remove}>
          <Thumbnail src={images} alt={images} height={150} width={150} />
        </ImageBox>
      )}
    </>
  )
}
