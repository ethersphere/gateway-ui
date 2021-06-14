import { ReactElement, useState, useContext } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'

interface Props {
  files: FilePath[] | null
  setFiles: (file: FilePath[] | null) => void
}

export default function Upload({ files, setFiles }: Props): ReactElement | null {
  if (files) return null

  return (
    <DropzoneArea
      onChange={setFiles}
      filesLimit={1}
      showPreviews
      showPreviewsInDropzone={false}
      maxFileSize={10000000}
    />
  )
}
