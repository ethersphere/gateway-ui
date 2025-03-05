import { ReactElement, useEffect, useState, useContext } from 'react'

import SharePage from './Share'
import AddFile from './AddFile'
import Upload from './Upload'

import { Context } from '../../providers/bee'
import { getMetadata } from '../../utils/file'
import { resize } from '../../utils/image'
import { PREVIEW_DIMENSIONS } from '../../constants'

export default function ShareGeneral(): ReactElement {
  const [files, setFiles] = useState<SwarmFile[]>([])
  const [uploadReference, setUploadReference] = useState('')
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false)
  const [uploadError, setUploadError] = useState<boolean>(false)
  const [previewUri, setPreviewUri] = useState<string | undefined>(undefined)
  const [previewBlob, setPreviewBlob] = useState<Blob | undefined>(undefined)
  const [metadata, setMetadata] = useState<Metadata | undefined>()
  const { upload } = useContext(Context)

  useEffect(() => {
    const metadata = getMetadata(files)
    setMetadata(metadata)

    if (previewUri) {
      URL.revokeObjectURL(previewUri) // Clear the preview from memory
      setPreviewUri(undefined)
      setPreviewBlob(undefined)
    }

    if (files.length !== 1) return

    if (metadata.isVideo) {
      const videoFile = files[0]
      const videoBlob = new Blob([videoFile], { type: videoFile.type })
      setPreviewUri(URL.createObjectURL(videoBlob))
      setPreviewBlob(videoBlob)
    }

    if (metadata.isImage) {
      resize(files[0], PREVIEW_DIMENSIONS.maxWidth, PREVIEW_DIMENSIONS.maxHeight).then(blob => {
        setPreviewUri(URL.createObjectURL(blob)) // NOTE: Until it is cleared with URL.revokeObjectURL, the file stays allocated in memory
        setPreviewBlob(blob)
      })
    }

    return () => {
      if (previewUri) {
        URL.revokeObjectURL(previewUri)
      }
    }
  }, [files]) // eslint-disable-line react-hooks/exhaustive-deps

  const uploadFile = () => {
    if (files.length === 0 || !metadata) return

    setIsUploadingFile(true)
    setUploadError(false)

    upload(files, metadata, previewBlob)
      .then(hash => {
        setUploadReference(hash)
      })
      .catch(() => setUploadError(true)) // eslint-disable-line
      .finally(() => {
        setIsUploadingFile(false)
      })
  }

  if (files.length === 0) return <AddFile setFiles={setFiles} />

  if (uploadReference) return <SharePage uploadReference={uploadReference} metadata={metadata} />

  return (
    <Upload
      uploadError={uploadError}
      setFiles={setFiles}
      metadata={metadata}
      preview={previewUri}
      files={files}
      uploadFile={uploadFile}
      isUploadingFile={isUploadingFile}
    />
  )
}
