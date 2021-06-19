import { ReactElement, useState, useContext, useEffect } from 'react'

import SharePage from './Share'
import AddFile from './AddFile'
import Upload from './Upload'

import { readAndCompressImage } from 'browser-image-resizer'

import { Context } from '../../providers/bee'

export default function ShareGeneral(): ReactElement {
  const [file, setFile] = useState<File | null>(null)
  const [uploadReference, setUploadReference] = useState('')
  const [isUploadingFile, setIsUploadingFile] = useState(false)
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [previewBlob, setPreviewBlob] = useState<Blob | undefined>(undefined)
  const { upload } = useContext(Context)

  const uploadFile = () => {
    if (!file) return

    setIsUploadingFile(true)
    upload(file, previewBlob)
      .then(hash => {
        setUploadReference(hash)
      })
      .catch(e => console.error) // eslint-disable-line
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
    <Upload setFile={setFile} file={file} preview={preview} uploadFile={uploadFile} isUploadingFile={isUploadingFile} />
  )
}
