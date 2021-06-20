import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Wind } from 'react-feather'

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

export default function FileNotFound() {
  const classes = useStyles()

  return (
    <Paper square elevation={0} className={classes.root}>
      <Wind size={48} strokeWidth={0.5} />
      <Typography variant="subtitle1">Sorry, the file was not found.</Typography>
      <Typography variant="body2">
        The file might not be available yet or has expired and is no longer accessible on the Swarm network.
      </Typography>
    </Paper>
  )
}
