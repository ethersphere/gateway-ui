import type { ReactElement } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import text from '../translations'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(2),
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      rowGap: theme.spacing(2),
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
    },
  }),
)

export default function LoadingFile(): ReactElement {
  const classes = useStyles()

  return (
    <Paper square elevation={0} className={classes.root}>
      <CircularProgress size={48} color="inherit" thickness={1} />
      <Typography variant="subtitle1">{text.loadingFile.header}</Typography>
      <Typography variant="body2">{text.loadingFile.description}</Typography>
    </Paper>
  )
}
