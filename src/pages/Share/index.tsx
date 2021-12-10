import { ReactElement, useState, useContext, useEffect } from 'react'

import SharePage from './Share'
import AddFile from './AddFile'
import Upload from './Upload'
import { SwarmFile } from '../../utils/SwarmFile'
import { detectIndexHtml, getAssetNameFromFiles } from '../../utils/file'

import { readAndCompressImage } from 'browser-image-resizer'

import { Context } from '../../providers/bee'

export default function ShareGeneral(): ReactElement {
  const [files, setFiles] = useState<SwarmFile[]>([])
  const [uploadReference, setUploadReference] = useState('')
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false)
  const [uploadError, setUploadError] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [previewBlob, setPreviewBlob] = useState<Blob | undefined>(undefined)
  const { upload } = useContext(Context)

  const uploadFile = () => {
    if (files.length === 0) return

    setIsUploadingFile(true)
    setUploadError(false)

    upload(files, previewBlob)
      .then(hash => {
        setUploadReference(hash)
      })
      .catch(() => setUploadError(true)) // eslint-disable-line
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

    // if (!file || !file.type.startsWith('image')) return
    //
    // readAndCompressImage(file, { maxWidth: 896, maxHeight: 672, autoRotate: false }).then(blob => {
    //   setPreview(URL.createObjectURL(blob)) // NOTE: Until it is cleared with URL.revokeObjectURL, the file stays allocated in memory
    //   setPreviewBlob(blob)
    // })

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [files]) //eslint-disable-line react-hooks/exhaustive-deps

  if (files.length === 0) return <AddFile setFiles={setFiles} />

  if (uploadReference) return <SharePage uploadReference={uploadReference} />

  return (
    <Upload
      uploadError={uploadError}
      setFiles={setFiles}
      files={files}
      preview={preview}
      uploadFile={uploadFile}
      isUploadingFile={isUploadingFile}
    />
  )
}
