import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { AlertOctagon } from 'react-feather'

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

export default function UnknownFile() {
  const classes = useStyles()

  return (
    <Paper square elevation={0} className={classes.root}>
      <AlertOctagon size={48} strokeWidth={0.5} />
      <Typography variant="subtitle1">Not ile.</Typography>
      <Typography variant="body2">
        However, due to the way it was uploaded, we can not provide you more information about it. You can still try and
        download.
      </Typography>
    </Paper>
  )
}
