import { Box, Grid, Typography } from '@material-ui/core'
import { ReactElement } from 'react'
import { File, Folder, Monitor } from 'react-feather'
import { AssetIcon } from './AssetIcon'
import { FitImage } from './FitImage'
import { mimeToKind, shortenBytes } from '../utils'
import { shortenHash } from '../utils/hash'
import { PREVIEW_DIMENSIONS } from '../constants'

import text from '../translations'

interface Props {
  assetName?: string
  previewUri?: string
  metadata?: Metadata
}

// TODO: add optional prop for indexDocument when it is already known (e.g. downloading a manifest)

export function AssetPreview({ previewUri, metadata }: Props): ReactElement {
  let previewComponent = <File />
  let type = mimeToKind(metadata?.type)

  if (metadata?.isWebsite) {
    previewComponent = <Monitor />
    type = text.uploadFile.headerWebsite
  } else if (metadata?.type === 'folder') {
    previewComponent = <Folder />
    type = text.uploadFile.headerFolder
  }

  return (
    <Box mb={0.25}>
      <Box bgcolor="background.paper">
        <Grid container direction="row">
          <div style={{ width: PREVIEW_DIMENSIONS.maxWidth, height: PREVIEW_DIMENSIONS.maxHeight }}>
            {previewUri ? <FitImage alt="Upload Preview" src={previewUri} /> : <AssetIcon icon={previewComponent} />}
          </div>
          <Box p={2} textAlign="left">
            {metadata?.hash && <Typography>Swarm Hash: {shortenHash(metadata.hash)}</Typography>}
            <Typography>
              {metadata?.type === 'folder' ? text.previewDetails.folderName : text.previewDetails.fileName}:{' '}
              {metadata?.name}
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
      {metadata?.type === 'folder' && metadata.count && (
        <Box mt={0.25} p={2} bgcolor="background.paper">
          <Grid container justifyContent="space-between" alignItems="center" direction="row">
            <Typography variant="subtitle2">{text.previewDetails.folderContent}</Typography>
            <Typography variant="subtitle2">
              {metadata.count} {text.previewDetails.items}
            </Typography>
          </Grid>
        </Box>
      )}
    </Box>
  )
}
