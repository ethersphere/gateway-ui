import type { ReactElement, ReactNode } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

interface Props {
  children: ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: theme.spacing(11),
      [theme.breakpoints.down('sm')]: {
        height: theme.spacing(7),
      },
    },
    float: {
      zIndex: 100,
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
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
    },
    content: {
      width: '100%',
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(6),
      [theme.breakpoints.down('sm')]: {
        paddingBottom: theme.spacing(2),
      },
    },
  }),
)

export default function Footer({ children }: Props): ReactElement {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.float}>
        <Container maxWidth="sm" className={classes.content}>
          <>{children}</>
        </Container>
      </div>
    </div>
  )
}
