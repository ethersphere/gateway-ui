import { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { shortenBytes, mimeToKind } from '../utils'

import text from '../translations'

interface Props {
  file?: File | Metadata
  preview?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
    },
    imageWrapper: {
      padding: theme.spacing(2),
    },
    image: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    list: {
      padding: theme.spacing(2),
      listStyleType: 'none',
      textAlign: 'left',
      overflowWrap: 'break-word',
    },
    name: {
      color: theme.palette.text.disabled,
    },
  }),
)

const Preview = ({ file, preview }: Props): ReactElement => {
  const classes = useStyles()

  return (
    <Paper square elevation={0} className={classes.root}>
      {preview && (
        <div className={classes.imageWrapper}>
          <img src={preview} className={classes.image} />
        </div>
      )}
      {file && (
        <ul className={classes.list}>
          <li>
            <Typography variant={'caption'}>
              <span className={classes.name}>{text.previewDetails.fileName}:</span> {file.name}
            </Typography>
          </li>
          <li>
            <Typography variant={'caption'}>
              <span className={classes.name}>{text.previewDetails.fileSize}:</span> {shortenBytes(file.size)}
            </Typography>
          </li>
          <li>
            <Typography variant={'caption'}>
              <span className={classes.name}>{text.previewDetails.fileType}:</span> {mimeToKind(file.type)}
            </Typography>
          </li>
        </ul>
      )}
    </Paper>
  )
}

export default Preview
