import type { ReactElement } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import { ArrowUp, X } from 'react-feather'
import LinearProgress from '@material-ui/core/LinearProgress'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Preview from '../../components/Preview'
import Layout from '../../components/Layout'

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
          File
        </Header>,
        <div key="top2">Double-check before uploading. There is no undo.</div>,
      ]}
      center={[<Preview key="center" file={file} preview={preview} />]}
      bottom={[
        <Footer key="bottom">
          <Button className={classes.button} onClick={uploadFile} size="large">
            <ArrowUp />
            Upload
            <ArrowUp style={{ opacity: 0 }} />
          </Button>
          {isUploadingFile && <LinearProgress />}
        </Footer>,
      ]}
    />
  )
}

export default SharePage
