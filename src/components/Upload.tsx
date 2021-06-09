import { ReactElement, useState, useContext } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import { useSnackbar } from 'notistack'

import ClipboardCopy from './ClipboardCopy'
import { Context } from '../providers/bee'
import QRCodeModal from './QRCodeModal'

export default function Files(): ReactElement {
  const [file, setFile] = useState<FilePath | null>(null)
  const [uploadReference, setUploadReference] = useState('')
  const [isUploadingFile, setIsUploadingFile] = useState(false)
  const { upload } = useContext(Context)
  const { enqueueSnackbar } = useSnackbar()

  const uploadFile = () => {
    if (file === null) return
    setIsUploadingFile(true)
    upload(file)
      .then(hash => {
        setUploadReference(hash)
        setFile(null)
      })
      .catch(e => enqueueSnackbar(`Error uploading: ${e.message}`, { variant: 'error' }))
      .finally(() => {
        setIsUploadingFile(false)
      })
  }

  const handleChange = (files?: FilePath[]) => {
    if (files) {
      setFile(files[0])
      setUploadReference('')
    }
  }

  return (
    <>
      <DropzoneArea
        onChange={handleChange}
        filesLimit={1}
        showPreviews
        showPreviewsInDropzone={false}
        maxFileSize={10000000}
      />
      {file && (
        <code>
          <ul>
            <li>path:{file.path}</li>
            <li>filename: {file.name}</li>
            <li>size: {file.size}</li>
            <li>type: {file.type}</li>
          </ul>
        </code>
      )}
      {file && (
        <Button disabled={isUploadingFile} variant="outlined" onClick={() => uploadFile()}>
          Upload
        </Button>
      )}
      {isUploadingFile && (
        <Container>
          <CircularProgress />
        </Container>
      )}
      {uploadReference && (
        <>
          <div>
            <code>{uploadReference}</code>
            <ClipboardCopy value={uploadReference} />
            <QRCodeModal value={uploadReference} label="Swarm Hash Reference" />
          </div>
          <div>
            <code>{`${window.location}/download/${uploadReference}`}</code>
            <ClipboardCopy value={`${window.location}/download/${uploadReference}`} />
            <QRCodeModal value={`${window.location}/download/${uploadReference}`} label="Gateway Share Link" />
          </div>
        </>
      )}
    </>
  )
}
