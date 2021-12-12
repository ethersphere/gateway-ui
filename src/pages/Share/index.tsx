import { ReactElement, useState, useContext } from 'react'

import SharePage from './Share'
import AddFile from './AddFile'
import Upload from './Upload'
import { SwarmFile } from '../../utils/SwarmFile'

import { Context } from '../../providers/bee'

export default function ShareGeneral(): ReactElement {
  const [files, setFiles] = useState<SwarmFile[]>([])
  const [uploadReference, setUploadReference] = useState('')
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false)
  const [uploadError, setUploadError] = useState<boolean>(false)
  const { upload } = useContext(Context)

  const uploadFile = () => {
    if (files.length === 0) return

    setIsUploadingFile(true)
    setUploadError(false)

    upload(files)
      .then(hash => {
        setUploadReference(hash)
      })
      .catch(() => setUploadError(true)) // eslint-disable-line
      .finally(() => {
        setIsUploadingFile(false)
      })
  }

  if (files.length === 0) return <AddFile setFiles={setFiles} />

  if (uploadReference) return <SharePage uploadReference={uploadReference} />

  return (
    <Upload
      uploadError={uploadError}
      setFiles={setFiles}
      files={files}
      uploadFile={uploadFile}
      isUploadingFile={isUploadingFile}
    />
  )
}
