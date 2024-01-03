import { Files as fileService } from '@/services/api'
import { CloudUploadOutlined } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { t } from 'i18next'
import { ChangeEvent, DragEvent, lazy, memo, useRef, useState } from 'react'
const FileDisplay = lazy(() => import('./FileDisplay'))

export type Props = {
  value: string | string[]
  label?: string
  image?: boolean
  doc?: boolean
  accept?: string
  multiple?: boolean
  onChange: (files: string | string[]) => void
}

type UploaderDraggableProps = {
  multiple?: boolean
  dragBgStyle: string
  showChoseFile: () => void
  changeStyle: (e: DragEvent<HTMLDivElement>, isEnter: boolean) => void
  handleDragAndDrop: (e: DragEvent<HTMLDivElement>) => void
}

const UploaderDraggable = ({
  multiple = false,
  dragBgStyle,
  showChoseFile,
  changeStyle,
  handleDragAndDrop
}: UploaderDraggableProps) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      width={'200px'}
      height={'200px'}
      border={'1px dashed #55D6F4'}
      sx={{
        cursor: 'pointer',
        borderRadius: 2,
        backgroundColor: dragBgStyle,
        maxHeight: 250,
        ml: multiple ? 3 : 0
      }}
      onClick={showChoseFile}
      onDragEnter={(e) => changeStyle(e, true)}
      onDragLeave={(e) => changeStyle(e, false)}
      onDrop={(e) => handleDragAndDrop(e)}
    >
      <Stack
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        margin={'30px 8px'}
      >
        <CloudUploadOutlined color="info" sx={{ fontSize: '45px', mb: 1 }} />

        <Typography display={'block'} color={'InfoText'} textAlign={'center'}>
          {t('dragHereOrClickToUpload')}
        </Typography>
      </Stack>
    </Box>
  )
}

const Uploader = memo(
  ({
    label = '',
    value = '',
    multiple = false,
    onChange,
    image = true,
    doc = false,
    accept
  }: Props) => {
    const [dragBgStyle, setDragBgStyle] = useState<string>('transparent')
    const [filePath, setFilePath] = useState<string | string[]>(value)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const extension = {
      image: [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/bmp',
        'image/jpg',
        '.svg'
      ],
      doc: ['doc', 'docx', 'txt', 'pdf']
    }

    let acceptExtension: string = ''
    if (accept) acceptExtension = accept
    else if (image) acceptExtension = extension.image.join(', ')
    else if (doc) acceptExtension = extension.doc.join(', ')

    const showChoseFile = () => {
      inputRef.current?.click()
    }

    const handleUploadReq = async (files: FileList | null) => {
      return await fileService.uploadFileHandler(files)
    }

    const handleUploadFiles = async (files: FileList | null) => {
      const images = await handleUploadReq(files)

      if (multiple) {
        setFilePath((prevFilePath) => {
          onChange([...prevFilePath, ...images])
          return [...prevFilePath, ...images]
        })
      } else {
        setFilePath(images[0])
        onChange(images[0])
      }
    }

    const handleFileChanges = (e: ChangeEvent<HTMLInputElement>) => {
      handleUploadFiles(e.target.files)
    }

    const changeStyle = (e: DragEvent<HTMLDivElement>, isEnter: boolean) => {
      e.preventDefault()
      if (isEnter) setDragBgStyle('#D8F6FF')
      else setDragBgStyle('transparent')
    }

    const handleDragAndDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragBgStyle('transparent')
      handleUploadFiles(e.dataTransfer.files)
    }

    const remove = async (fileName: string) => {
      await fileService.removeFileHandler(fileName)
      setFilePath((prevFilePath) => {
        if (Array.isArray(prevFilePath)) {
          const newItem = prevFilePath.filter((item) => item !== fileName)
          onChange(newItem)
          return newItem
        }

        onChange('')
        return ''
      })
    }

    let uploaderContent
    if (multiple) {
      uploaderContent = (
        <Box display={'flex'}>
          {filePath ? <FileDisplay images={filePath} remove={remove} /> : null}

          <UploaderDraggable
            multiple={!!filePath.length}
            dragBgStyle={dragBgStyle}
            showChoseFile={showChoseFile}
            changeStyle={changeStyle}
            handleDragAndDrop={handleDragAndDrop}
          />
        </Box>
      )
    } else {
      uploaderContent = (
        <>
          {filePath ? (
            <FileDisplay images={filePath} remove={remove} />
          ) : (
            <UploaderDraggable
              dragBgStyle={dragBgStyle}
              showChoseFile={showChoseFile}
              changeStyle={changeStyle}
              handleDragAndDrop={handleDragAndDrop}
            />
          )}
        </>
      )
    }

    return (
      <Box display={'flex'} flexDirection={'column'}>
        {label ? <p style={{ marginBottom: 8 }}>{label} :</p> : null}

        <input
          ref={inputRef}
          type="file"
          accept={acceptExtension}
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={(e) => handleFileChanges(e)}
        />

        {uploaderContent}
      </Box>
    )
  }
)

export default Uploader
