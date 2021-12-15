import { Box, Grid, Typography } from '@material-ui/core'
import { Web } from '@material-ui/icons'
import { ReactElement, useEffect, useState } from 'react'
import { File, Folder } from 'react-feather'
import { AssetIcon } from './AssetIcon'
import { FitImage } from './FitImage'
import { detectIndexHtml, getAssetNameFromFiles, getHumanReadableFileSize } from '../utils/file'
import { SwarmFile } from '../utils/SwarmFile'

import text from '../translations'

interface Props {
  assetName?: string
  previewUri?: string
  files: SwarmFile[]
}

// TODO: add optional prop for indexDocument when it is already known (e.g. downloading a manifest)

export function AssetPreview({ assetName, files, previewUri }: Props): ReactElement {
  const [previewComponent, setPreviewComponent] = useState<ReactElement | undefined>(undefined)

  useEffect(() => {
    if (files.length === 1) {
      // single image
      setPreviewComponent(<AssetIcon icon={<File />} />)
      // collection
    } else if (detectIndexHtml(files)) {
      setPreviewComponent(<AssetIcon icon={<Web />} />)
    } else {
      setPreviewComponent(<AssetIcon icon={<Folder />} />)
    }
  }, [files]) // eslint-disable-line react-hooks/exhaustive-deps

  const getPrimaryText = () => {
    const name = getAssetNameFromFiles(files)

    if (files.length === 1) return `${text.previewDetails.fileName}: ${assetName || name}`

    return `${text.previewDetails.folderName}: ${assetName || name}`
  }

  const getKind = () => {
    if (files.length === 1) return files[0].type

    if (detectIndexHtml(files)) return text.uploadFile.headerWebsite

    return text.uploadFile.headerFolder
  }

  const isFolder = () => [text.uploadFile.headerFolder, text.uploadFile.headerWebsite].includes(getKind())

  const getSize = () => {
    const bytes = files.reduce((total, item) => total + item.size, 0)

    return getHumanReadableFileSize(bytes)
  }

  const size = getSize()

  return (
    <Box mb={4}>
      <Box bgcolor="background.paper">
        <Grid container direction="row">
          {previewComponent ? (
            previewComponent
          ) : (
            <FitImage maxWidth="250px" maxHeight="175px" alt="Upload Preview" src={previewUri} />
          )}
          <Box p={2} textAlign="left">
            <Typography>{getPrimaryText()}</Typography>
            <Typography>
              {text.previewDetails.type}: {getKind()}
            </Typography>
            {size !== '0 bytes' && (
              <Typography>
                {text.previewDetails.size}: {size}
              </Typography>
            )}
          </Box>
        </Grid>
      </Box>
      {isFolder() && (
        <Box mt={0.25} p={2} bgcolor="background.paper">
          <Grid container justifyContent="space-between" alignItems="center" direction="row">
            <Typography variant="subtitle2">{text.previewDetails.folderContent}</Typography>
            <Typography variant="subtitle2">
              {files.length} {text.previewDetails.items}
            </Typography>
          </Grid>
        </Box>
      )}
    </Box>
  )
}
