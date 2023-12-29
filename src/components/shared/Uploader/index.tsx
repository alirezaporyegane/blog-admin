import { Box, Button } from '@mui/material'
import { ChangeEvent, useRef, useState } from 'react'
import { Files as FileService } from '@/services/api'

type Props = {
  multiple?: boolean
  onChange: (files: string | string[]) => void
}

export default function Uploader({ multiple = false, onChange }: Props) {
  const [filePath, setFilePath] = useState<string | string[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  const showChoseFile = () => {
    console.log(inputRef.current?.click())
  }

  const handleUploadReq = async (files: FileList | null) => {
    return await FileService.uploadFileHandler(files)
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

  return (
    <>
      <Box sx={{ display: 'none' }}>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          onChange={(e) => handleFileChanges(e)}
        />
      </Box>

      <Button variant="contained" sx={{ mt: 3 }} onClick={showChoseFile}>
        Click me
      </Button>
    </>
  )
}
