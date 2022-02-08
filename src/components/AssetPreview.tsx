import { Box, Grid } from '@material-ui/core'

import { Typography } from './swarm-ui'
import type { ReactElement, CSSProperties } from 'react'
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
  style?: CSSProperties
  className?: string
}

export function AssetPreview({ previewUri, metadata, style, className }: Props): ReactElement {
  let previewComponent = <File />
  let type = mimeToKind(metadata?.type)

  if (metadata?.isWebsite) {
    previewComponent = <Monitor />
    type = text.uploadFile.typeWebsite
  } else if (metadata?.type === 'folder') {
    previewComponent = <Folder />
    type = text.uploadFile.typeFolder
  }

  return (
    <Box mb={0.25} style={style} className={className}>
      <Box bgcolor="background.paper">
        <Grid container direction="row">
          <div style={{ margin: 12 }}>
            {previewUri ? (
              <div style={{ maxWidth: PREVIEW_DIMENSIONS.maxWidth, maxHeight: PREVIEW_DIMENSIONS.maxHeight }}>
                <FitImage alt="Upload Preview" src={previewUri} />
              </div>
            ) : (
              <AssetIcon icon={previewComponent} style={{ height: 112, width: 250 }} />
            )}
          </div>
          <Typography size="small" style={{ padding: 12, textAlign: 'left' }}>
            {metadata?.hash && (
              <>
                Swarm Hash: {shortenHash(metadata.hash)}
                <br />
              </>
            )}
            {metadata?.type === 'folder' ? text.previewDetails.folderName : text.previewDetails.fileName}:{' '}
            {metadata?.name} <br />
            {text.previewDetails.type}: {type}
            <br />
            {metadata?.size && (
              <>
                {text.previewDetails.size}: {shortenBytes(metadata.size)}
                <br />
              </>
            )}
          </Typography>
        </Grid>
      </Box>
      {metadata?.type === 'folder' && metadata.count && (
        <Box mt={0.25} p={2} bgcolor="background.paper">
          <Grid container justifyContent="space-between" alignItems="center" direction="row">
            <Typography variant="title" size="small">
              {text.previewDetails.folderContent}
            </Typography>
            <Typography variant="title" size="small">
              {metadata.count} {text.previewDetails.items}
            </Typography>
          </Grid>
        </Box>
      )}
    </Box>
  )
}
