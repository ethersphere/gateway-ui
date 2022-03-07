import { createUseStyles } from 'react-jss'
import type { ReactElement } from 'react'

const useStyles = createUseStyles({
  root: {
    height: '100%',
    width: '100%',
  },
})

interface Props {
  children: ReactElement
}

const Icon = ({ children }: Props) => {
  const classes = useStyles()

  return <div className={classes.root}>{children}</div>
}

export default Icon
