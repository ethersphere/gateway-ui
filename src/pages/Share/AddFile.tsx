import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DragEvent, ReactElement, useEffect, useRef, useState } from 'react'
import { ArrowLeft, Plus } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../Routes'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import TermsAndConditionsPopup from '../../components/TermsAndConditionsPopup'
import text from '../../translations'
import { convertSwarmFile } from '../../utils/SwarmFile'
import { handleDrop } from '../../utils/file'

interface Props {
  setFiles: (files: SwarmFile[]) => void
}

const buttonStyle = { width: '100%', display: 'flex', justifyContent: 'space-between' }

export default function Upload({ setFiles }: Props): ReactElement {
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
          <div
            onDragLeave={onDragLeave}
            style={{
              width: '100vw',
              height: '100vh',
              backgroundColor: '#dd7200',
              zIndex: 150,
              position: 'fixed',
              top: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ m: 2, color: 'white' }} variant="button">
              {text.addFile.dragHeader}
            </Typography>
            <Typography variant="body1" sx={{ m: 2, color: 'white' }}>
              {text.addFile.dragTagline}
            </Typography>
          </div>
        )}
      </>
      <Layout
        top={[
          <Header
            key="top1"
            leftAction={
              <IconButton onClick={() => navigate(ROUTES.LANDING_PAGE)}>
                <ArrowLeft strokeWidth={1} />
              </IconButton>
            }
          >
            {text.addFile.header}
          </Header>,
          <Typography key="top2" variant="body1">
            {text.addFile.tagline}
          </Typography>,
        ]}
        center={[
          <Button variant="contained" key="center1" component="label" size="large" sx={buttonStyle}>
            <Plus strokeWidth={1} />
            {text.addFile.addFileAction}
            <input
              type="file"
              hidden
              multiple
              onChange={event => {
                handleFiles(event.target.files)
              }}
            />
            <Plus style={{ opacity: 0 }} />
          </Button>,
          <Button variant="contained" key="center2" component="label" size="large" sx={buttonStyle}>
            <Plus strokeWidth={1} />
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
            <Plus style={{ opacity: 0 }} />
          </Button>,
        ]}
        bottom={[
          <Typography key="bottom" variant="body1">
            {text.addFile.disclaimer}
          </Typography>,
        ]}
      />
    </div>
  )
}
