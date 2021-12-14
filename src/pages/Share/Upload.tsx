import type { ReactElement } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { ArrowUp, X } from 'react-feather'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import Link from '@material-ui/core/Link'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { AssetPreview } from '../../components/AssetPreview'
import Layout from '../../components/Layout'
import { SwarmFile } from '../../utils/SwarmFile'
import { detectIndexHtml } from '../../utils/file'

import * as ROUTES from '../../Routes'

import text from '../../translations'

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
)

interface Props {
  setFiles: (files: SwarmFile[]) => void
  files: SwarmFile[]
  preview?: string
  uploadFile: () => void
  isUploadingFile: boolean
  uploadError: boolean
}

const SharePage = ({ uploadError, setFiles, files, preview, uploadFile, isUploadingFile }: Props): ReactElement => {
  const classes = useStyles()

  let header = text.uploadFile.headerFile

  if (files.length > 1) header = text.uploadFile.headerFolder

  if (detectIndexHtml(files)) header = text.uploadFile.headerWebsite

  return (
    <Layout
      top={[
        <Header
          key="top1"
          rightAction={
            <IconButton onClick={() => setFiles([])}>
              <X />
            </IconButton>
          }
        >
          {header}
        </Header>,
        <Typography key="top2" variant="body1">
          {text.uploadFile.tagline}
        </Typography>,
      ]}
      center={[<AssetPreview key="center" files={files} previewUri={preview} />]}
      bottom={[
        <Typography key="top2" variant="body1">
          {text.uploadFile.disclaimer}{' '}
          <Link href={ROUTES.TERMS_AND_CONDITIONS} color="inherit" underline="always" target="blank">
            {text.uploadFile.termsAndCondition}.
          </Link>
        </Typography>,
        <Footer key="bottom">
          <Tooltip
            title={text.uploadFile.uploadError}
            placement="top"
            open={uploadError}
            arrow
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <Button variant="contained" className={classes.button} onClick={uploadFile} size="large">
              {isUploadingFile ? <CircularProgress size={24} color="inherit" /> : <ArrowUp />}
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
