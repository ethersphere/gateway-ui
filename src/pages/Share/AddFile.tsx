import { ReactElement, useState, DragEvent, useRef, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button, IconButton, Typography } from '../../components/swarm-ui'
import { ArrowLeftLine, DragDropLine, FileAddLine, FolderAddLine } from '../../components/swarm-ui/icons'
import { useNavigate } from 'react-router-dom'

import Header from '../../components/Header'
import Layout from '../../components/Layout'
import TermsAndConditionsPopup from '../../components/TermsAndConditionsPopup'
import { convertSwarmFile } from '../../utils/SwarmFile'
import { handleDrop } from '../../utils/file'

import * as ROUTES from '../../Routes'
import text from '../../translations'

interface Props {
  setFiles: (files: SwarmFile[]) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dragOverlay: {
      width: '100vw',
      height: '100vh',
      backgroundColor: theme.palette.primary.main,
      zIndex: 150,
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    dragOverlayChildren: {
      margin: theme.spacing(2),
      color: 'white',
    },
  }),
)

export default function Upload({ setFiles }: Props): ReactElement {
  const classes = useStyles()
  const ref = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [agreedToTerms, setAgreedToTerms] = useState(Boolean(window.localStorage.getItem('agreedToTerms')))

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute('directory', '')
      ref.current.setAttribute('mozdirectory', '')
      ref.current.setAttribute('webkitdirectory', '')
    }
  }, [ref])

  const handleAgree = () => {
    setAgreedToTerms(true)
    window.localStorage.setItem('agreedToTerms', Date.now().toString())
  }

  const onDragOver = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    ev.stopPropagation()

    setIsDragging(true)
  }

  const onDrop = async (ev: DragEvent<HTMLDivElement>) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault()
    ev.stopPropagation()

    setFiles(await handleDrop(ev))
    setIsDragging(false)
  }

  const handleFiles = (fileList: FileList | null) => {
    const files = []

    if (fileList) for (let i = 0; i < fileList.length; i++) files.push(convertSwarmFile(fileList[i]))
    setFiles(files)
  }

  const onDragLeave = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    ev.stopPropagation()

    setIsDragging(false)
  }

  if (!agreedToTerms) return <TermsAndConditionsPopup handleAgree={handleAgree} />

  return (
    <div onDragOver={onDragOver} onDrop={onDrop}>
      <>
        {isDragging && (
          <div onDragLeave={onDragLeave} className={classes.dragOverlay}>
            <Typography className={classes.dragOverlayChildren} variant="button">
              {text.addFile.dragHeader}
            </Typography>
            <Typography variant="caption" className={classes.dragOverlayChildren}>
              {text.addFile.dragTagline}
            </Typography>
          </div>
        )}
      </>
      <Layout
        top={[
          <Header
            key="top1"
            leftAction={<IconButton onClick={() => navigate(ROUTES.LANDING_PAGE)} icon={<ArrowLeftLine />} />}
          >
            {text.addFile.header}
          </Header>,
          <Typography key="top2" variant="body">
            {text.addFile.tagline}
          </Typography>,
        ]}
        center={[
          <div
            key="center1"
            style={{
              border: '2px dashed #aaa',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 64,
              paddingTop: 128,
              paddingBottom: 128,
            }}
          >
            <DragDropLine size={30} style={{ fill: '#6c6c6c' }} />
            <Typography variant="caption" style={{ paddingBottom: 32, paddingTop: 16 }}>
              Drag & drop files here or use the buttons below.
            </Typography>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                style={{ flexBasis: 100, flexGrow: 1, marginRight: 8 }}
                variant="primary"
                component="label"
                icon={<FileAddLine />}
              >
                {text.addFile.addFileAction}
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={event => {
                    handleFiles(event.target.files)
                  }}
                />
              </Button>
              <Button
                style={{ flexBasis: 100, flexGrow: 1 }}
                variant="primary"
                component="label"
                icon={<FolderAddLine />}
              >
                {text.addFile.addFolderAction}
                <input
                  type="file"
                  hidden
                  multiple
                  ref={ref}
                  onChange={event => {
                    handleFiles(event.target.files)
                  }}
                />
              </Button>
            </div>
          </div>,
        ]}
        bottom={[
          <Typography key="bottom" variant="caption">
            {text.addFile.disclaimer}
          </Typography>,
        ]}
      />
    </div>
  )
}
