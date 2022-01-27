import { createStyles, makeStyles } from '@material-ui/core'
import { ReactElement, ReactNode, CSSProperties } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    common: {
      fontFamily: 'iAWriterQuattroV',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      color: '#303030',
    },
  }),
)

interface Props {
  variant: 'primary' | 'secondary'
  children: ReactNode
  icon?: ReactElement
  style?: CSSProperties
}

const Button = ({ variant, children, style }: Props): ReactElement => {
  const classes = useStyles()

  return (
    <div style={style} className={classes.common}>
      {children}
    </div>
  )
}

export default Button
