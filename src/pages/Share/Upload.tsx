import type { ReactElement } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import { ArrowUp, X } from 'react-feather'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Preview from '../../components/Preview'
import Layout from '../../components/Layout'

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
  setFile: (file: File | null) => void
  file: File
  preview: string | undefined
  uploadFile: () => void
  isUploadingFile: boolean
}

const SharePage = ({ setFile, file, preview, uploadFile, isUploadingFile }: Props): ReactElement => {
  const classes = useStyles()

  return (
    <Layout
      top={[
        <Header
          key="top1"
          rightAction={
            <IconButton onClick={() => setFile(null)}>
              <X />
            </IconButton>
          }
        >
          {text.uploadFile.header}
        </Header>,
      ]}
      center={[<Preview key="center" file={file} preview={preview} />]}
      bottom={[
        <div key="top2">
          {text.uploadFile.disclaimer} <Link>{text.uploadFile.termsAndCondition}.</Link>
        </div>,
        <Footer key="bottom">
          <Button className={classes.button} onClick={uploadFile} size="large">
            {isUploadingFile ? <CircularProgress size={24} color="secondary" /> : <ArrowUp />}
            {isUploadingFile ? text.uploadFile.uploadingText : text.uploadFile.uploadAction}
            <ArrowUp style={{ opacity: 0 }} />
          </Button>
        </Footer>,
      ]}
    />
  )
}

export default SharePage
