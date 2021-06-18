import type { ReactElement, ReactNode } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

interface Props {
  children: ReactNode
  leftAction?: ReactElement
  rightAction?: ReactElement
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: 100,
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: theme.palette.background.default,
      opacity: 0.75,
    },
    wrapper: {
      opacity: 1,
      margin: theme.spacing(2),
      height: theme.spacing(6),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    action: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
)

export default function Header({ children, leftAction, rightAction }: Props): ReactElement {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.action}>{leftAction}</div>
        <Typography variant="button">{children}</Typography>
        <div className={classes.action}>{rightAction}</div>
      </div>
    </div>
  )
}
