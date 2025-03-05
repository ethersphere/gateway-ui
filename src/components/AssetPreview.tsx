import { Box, Grid, Typography } from '@material-ui/core'
import { ReactElement, useMemo } from 'react'
import { File, Folder, Monitor } from 'react-feather'
import { AssetIcon } from './AssetIcon'
import { FitImage } from './FitImage'
import { mimeToKind, shortenBytes } from '../utils'
import { shortenHash } from '../utils/hash'
import { PREVIEW_DIMENSIONS } from '../constants'

import text from '../translations'
import { FitVideo } from './FitVideo'

interface Props {
  assetName?: string
  previewUri?: string
  metadata?: Metadata
}

// TODO: add optional prop for indexDocument when it is already known (e.g. downloading a manifest)

/* eslint-disable react/display-name */
const getPreviewComponent = (previewUri?: string, metadata?: Metadata) => {
  if (metadata?.isVideo) {
    return () => <FitVideo src={previewUri} />
  }

  if (metadata?.isImage) {
    return () => <FitImage alt="Upload Preview" src={previewUri} />
  }

  if (metadata?.isWebsite) {
    return () => <AssetIcon icon={<Monitor />} />
  }

  if (metadata?.type === 'folder') {
    return () => <AssetIcon icon={<Folder />} />
  }

  return () => <AssetIcon icon={<File />} />
}

const getType = (metadata?: Metadata) => {
  if (metadata?.isWebsite) return text.uploadFile.headerWebsite

  if (metadata?.type === 'folder') return text.uploadFile.headerFolder

  return mimeToKind(metadata?.type)
}

export function AssetPreview({ previewUri, metadata }: Props): ReactElement {
  const PreviewAssetComponent = useMemo(() => getPreviewComponent(previewUri, metadata), [metadata, previewUri])
  const type = useMemo(() => getType(metadata), [metadata])

  return (
    <Box mb={0.25}>
      <Box bgcolor="background.paper">
        <Grid container direction="row">
          <div style={{ width: PREVIEW_DIMENSIONS.maxWidth, height: PREVIEW_DIMENSIONS.maxHeight }}>
            <PreviewAssetComponent />
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
