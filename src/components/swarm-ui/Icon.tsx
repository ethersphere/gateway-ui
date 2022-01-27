import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
    },
  }),
)

interface Props {
  children: ReactElement
}

export default ({ children }: Props) => {
  const classes = useStyles()

  return <div className={classes.root}>{children}</div>
}
