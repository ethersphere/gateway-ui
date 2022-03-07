import { createUseStyles } from 'react-jss'
import { ReactElement, ReactNode, CSSProperties } from 'react'

import { colors } from './css'
import Typography from './Typography'

const useStyles = createUseStyles({
  tooltip: {
    backgroundColor: colors.surface.dark,
    color: colors.text.light,
    textAlign: 'center',
    padding: 12,

    /* Position the tooltip */
    position: 'absolute',
    marginBottom: 100,
    zIndex: 1,
    '&::after': {
      content: "' '",
      position: 'absolute',
      top: '100%' /* At the bottom of the tooltip */,
      left: '50%',
      marginLeft: -8,
      borderWidth: 8,
      borderStyle: 'solid',
      borderColor: `${colors.surface.dark} transparent transparent transparent`,
    },
  },
})

interface Props {
  children?: ReactNode
  style?: CSSProperties
  className?: string
  onClick?: () => void
}

const Link = ({ children, style, className }: Props): ReactElement => {
  const classes = useStyles()

  return (
    <Typography variant="caption" style={style} className={`${classes.tooltip} ${className}`}>
      {children}
    </Typography>
  )
}

export default Link
