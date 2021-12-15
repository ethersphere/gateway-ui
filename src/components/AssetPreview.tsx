import { Box, Grid, Typography } from '@material-ui/core'
import { Web } from '@material-ui/icons'
import { ReactElement, useEffect, useState } from 'react'
import { File, Folder } from 'react-feather'
import { AssetIcon } from './AssetIcon'
import { FitImage } from './FitImage'
import { mimeToKind, shortenBytes } from '../utils'
import { detectIndexHtml, getAssetNameFromFiles } from '../utils/file'

import text from '../translations'

interface Props {
  assetName?: string
  previewUri?: string
  metadata?: Metadata
  files: SwarmFile[]
}

// TODO: add optional prop for indexDocument when it is already known (e.g. downloading a manifest)

export function AssetPreview({ assetName, files, previewUri, metadata }: Props): ReactElement {
  let previewComponent = <File />
  let type = mimeToKind(metadata?.type)

  if (metadata?.isWebsite) {
    previewComponent = <Web />
    type = text.uploadFile.headerWebsite
  } else if (metadata?.type === 'folder') {
    previewComponent = <Folder />
    type = text.uploadFile.headerFolder
  }

  return (
    <Box mb={4}>
      <Box bgcolor="background.paper">
        <Grid container direction="row">
          {previewUri ? (
            <FitImage maxWidth="250px" maxHeight="175px" alt="Upload Preview" src={previewUri} />
          ) : (
            <AssetIcon icon={previewComponent} />
          )}
          <Box p={2} textAlign="left">
            <Typography>
              {metadata?.type === 'folder' ? text.previewDetails.folderName : text.previewDetails.fileName}:{' '}
              {assetName || getAssetNameFromFiles(files)}
            </Typography>
            <Typography>
              {text.previewDetails.type}: {type}
            </Typography>
            {metadata?.size && (
              <Typography>
                {text.previewDetails.size}: {shortenBytes(metadata.size)}
              </Typography>
            )}
          </Box>
        </Grid>
      </Box>
      {metadata?.type === 'folder' && (
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
