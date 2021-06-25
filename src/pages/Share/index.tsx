import { readAndCompressImage } from 'browser-image-resizer'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { Context } from '../../providers/bee'
import AddFile from './AddFile'
import SharePage from './Share'
import Upload from './Upload'

export default function ShareGeneral(): ReactElement {
  const [file, setFile] = useState<File | null>(null)
  const [uploadReference, setUploadReference] = useState('')
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false)
  const [uploadError, setUploadError] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [previewBlob, setPreviewBlob] = useState<Blob | undefined>(undefined)
  const [uploadProgress, setUploadProgress] = useState<number | undefined>(undefined)
  const { upload } = useContext(Context)
  const progress = (progressEvent: AxiosProgressEvent) => {
    const normalizeProgress = progressEvent.loaded / progressEvent.total
    // eslint-disable-next-line no-console
    console.log('normalizeProgress', normalizeProgress)
    setUploadProgress(normalizeProgress)
  }

  const uploadFile = () => {
    if (!file) return

    setIsUploadingFile(true)
    setUploadError(false)
    upload(file, { preview: previewBlob, progress })
      .then(hash => {
        setUploadReference(hash)
      })
      .catch(e => setUploadError(true)) // eslint-disable-line
      .finally(() => {
        setIsUploadingFile(false)
      })
  }

  useEffect(() => {
    if (preview) {
      URL.revokeObjectURL(preview) // Clear the preview from memory
      setPreview(undefined)
      setPreviewBlob(undefined)
    }

    if (!file || !file.type.startsWith('image')) return

    readAndCompressImage(file, { maxWidth: 896, maxHeight: 672, autoRotate: false }).then(blob => {
      setPreview(URL.createObjectURL(blob)) // NOTE: Until it is cleared with URL.revokeObjectURL, the file stays allocated in memory
      setPreviewBlob(blob)
    })

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [file])

  if (!file) return <AddFile setFile={setFile} />

  if (uploadReference) return <SharePage uploadReference={uploadReference} />

  return (
    <Upload
      uploadError={uploadError}
      setFile={setFile}
      file={file}
      preview={preview}
      uploadFile={uploadFile}
      isUploadingFile={isUploadingFile}
      uploadProgress={uploadProgress}
    />
  )
}
