import type { ReactElement, ReactNode } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Typography } from '../components/swarm-ui'

interface Props {
  children: ReactNode
  leftAction?: ReactElement
  rightAction?: ReactElement
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: theme.spacing(10),
      margin: 0,
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        height: theme.spacing(6), // FIXME: The component is actually 4 theme spacing bigger (so spacing(10) ), but the Layout component adds 2x2 theme spacings and this was simplest way to do it
      },
    },
    float: {
      zIndex: 100,
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      margin: 0,
      padding: theme.spacing(2),
      paddingTop: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '&::after': {
        content: '""',
        width: '100%',
        height: '100%',
        opacity: 0.9,
        backdropFilter: 'blur(1px)',
        position: 'absolute',
        backgroundColor: theme.palette.background.default,
        top: 0,
        left: 0,
        zIndex: -1,
      },
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
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
      <div className={classes.float}>
        <div className={classes.action}>{leftAction}</div>
        <Typography variant="title">{children}</Typography>
        <div className={classes.action}>{rightAction}</div>
      </div>
    </div>
  )
}
