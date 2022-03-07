import type { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'
import { Button, Typography, Tooltip, IconButton, Link } from '../../components/swarm-ui'
import { ArrowLeftLine, UploadLine } from '../../components/swarm-ui/icons'

import CircularProgress from '@material-ui/core/CircularProgress'

import { UPLOAD_SIZE_LIMIT } from '../../constants'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { AssetPreview } from '../../components/AssetPreview'
import Layout from '../../components/Layout'

import * as ROUTES from '../../Routes'

import text from '../../translations'

const useStyles = createUseStyles({
  button: {
    width: '100%',
  },
})

interface Props {
  setFiles: (files: SwarmFile[]) => void
  preview?: string
  uploadFile: () => void
  isUploadingFile: boolean
  uploadError: boolean
  metadata?: Metadata
}

const SharePage = ({ uploadError, setFiles, preview, uploadFile, isUploadingFile, metadata }: Props): ReactElement => {
  const classes = useStyles()

  const reachedSizeLimit = Boolean(metadata && metadata?.size > UPLOAD_SIZE_LIMIT)

  return (
    <Layout
      top={[
        <Header key="top1" leftAction={<IconButton onClick={() => setFiles([])} icon={<ArrowLeftLine />} />}>
          {text.uploadFile.header}
        </Header>,
        <Typography key="top2" variant="body">
          {text.uploadFile.tagline}
        </Typography>,
      ]}
      center={[<AssetPreview key="center" previewUri={preview} metadata={metadata} />]}
      bottom={[
        <Typography key="top2" variant="body">
          {text.uploadFile.disclaimer}{' '}
          <Link href={ROUTES.TERMS_AND_CONDITIONS} target="blank">
            {text.uploadFile.termsAndCondition}.
          </Link>
        </Typography>,
        <Footer key="bottom">
          <Button
            variant="primary"
            className={classes.button}
            onClick={uploadFile}
            disabled={reachedSizeLimit}
            icon={isUploadingFile ? <CircularProgress size={24} color="inherit" /> : <UploadLine />}
          >
            {isUploadingFile ? text.uploadFile.uploadingText : text.uploadFile.uploadAction}
            {(uploadError || reachedSizeLimit) && (
              <Tooltip>{reachedSizeLimit ? text.uploadFile.sizeLimitError : text.uploadFile.uploadError}</Tooltip>
            )}
          </Button>
        </Footer>,
      ]}
    />
  )
}

export default SharePage
