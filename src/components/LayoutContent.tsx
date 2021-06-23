import type { ReactElement } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(2),
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
    },
    item: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
)

interface Props {
  children: ReactElement[]
}

export default function LayoutContent({ children }: Props): ReactElement {
  const classes = useStyles()

  return (
    <Paper square elevation={0} className={classes.root}>
      {children.map((child, i) => (
        <div key={i} className={classes.item}>
          {child}
        </div>
      ))}
    </Paper>
  )
}
