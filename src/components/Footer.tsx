import type { ReactElement, ReactNode } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

interface Props {
  children: ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: 100,
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.background.default,
    },
    wrapper: {
      width: '100%',
      padding: theme.spacing(2),
    },
  }),
)

export default function Header({ children }: Props): ReactElement {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>{children}</div>
    </div>
  )
}
