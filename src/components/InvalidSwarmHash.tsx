import type { ReactElement } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { AlertOctagon } from 'react-feather'
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

export default function InvalidSwarmHash(): ReactElement {
  const classes = useStyles()

  return (
    <Paper square elevation={0} className={classes.root}>
      <AlertOctagon size={48} strokeWidth={0.5} />
      <Typography variant="subtitle1">{text.invalidSwarmHash.header}</Typography>
      <Typography variant="body2">{text.invalidSwarmHash.description}</Typography>
    </Paper>
  )
}
