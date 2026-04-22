import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import type { ReactElement } from 'react'
import { ArrowUp, X } from 'react-feather'
import { AssetPreview } from '../../components/AssetPreview'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import { UPLOAD_SIZE_LIMIT } from '../../constants'
import * as ROUTES from '../../Routes'
import text from '../../translations'

const buttonStyle = { width: '100%', display: 'flex', justifyContent: 'space-between' }

interface Props {
  setFiles: (files: SwarmFile[]) => void
  files: SwarmFile[]
  preview?: string
  uploadFile: () => void
  isUploadingFile: boolean
  uploadError: boolean
  metadata?: Metadata
}

const SharePage = ({
  uploadError,
  setFiles,
  files,
  preview,
  uploadFile,
  isUploadingFile,
  metadata,
}: Props): ReactElement => {
  let header = text.uploadFile.headerFile

  if (files.length > 1) header = text.uploadFile.headerFolder

  if (metadata?.isWebsite) header = text.uploadFile.headerWebsite

  const reachedSizeLimit = Boolean(metadata?.size && metadata.size > UPLOAD_SIZE_LIMIT)

  return (
    <Layout
      top={[
        <Header
          key="top1"
          rightAction={
            <IconButton onClick={() => setFiles([])}>
              <X strokeWidth={1} />
            </IconButton>
          }
        >
          {header}
        </Header>,
        <Typography key="top2" variant="body1">
          {text.uploadFile.tagline}
        </Typography>,
      ]}
      center={[<AssetPreview key="center" previewUri={preview} metadata={metadata} />]}
      bottom={[
        <Typography key="top2" variant="body1">
          {text.uploadFile.disclaimer}{' '}
          <Link href={ROUTES.TERMS_AND_CONDITIONS} color="inherit" underline="always" target="blank">
            {text.uploadFile.termsAndCondition}.
          </Link>
        </Typography>,
        <Footer key="bottom">
          <Tooltip
            title={reachedSizeLimit ? text.uploadFile.sizeLimitError : text.uploadFile.uploadError}
            placement="top"
            open={uploadError || reachedSizeLimit}
            arrow
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <Button variant="contained" sx={buttonStyle} onClick={uploadFile} disabled={reachedSizeLimit} size="large">
              {isUploadingFile ? <CircularProgress size={24} color="inherit" /> : <ArrowUp strokeWidth={1} />}
              {isUploadingFile ? text.uploadFile.uploadingText : text.uploadFile.uploadAction}
              <ArrowUp style={{ opacity: 0 }} />
            </Button>
          </Tooltip>
        </Footer>,
      ]}
    />
  )
}

export default SharePage
