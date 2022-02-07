import { createStyles, makeStyles } from '@material-ui/core'
import { ReactElement, ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  style?: CSSProperties
  className?: string
}

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      background: `repeating-linear-gradient(
                        45deg,
                        #efefef,
                        #efefef 4px,
                        #ffffff 4px,
                        #ffffff 8px
                    )`,
    },
  }),
)

export function StripedWrapper({ children, className, style }: Props): ReactElement {
  const classes = useStyles()

  return (
    <div className={`${classes.wrapper} ${className}`} style={style}>
      {children}
    </div>
  )
}
