import { createUseStyles } from 'react-jss'
import { ReactElement, ReactNode, CSSProperties } from 'react'

import Typography from './Typography'

const useStyles = createUseStyles({
  link: {
    color: 'inherit',
    '&:visited': {
      color: 'inherit',
    },
  },
})

interface Props {
  children?: ReactNode
  href?: string
  target?: string
  style?: CSSProperties
  className?: string
  onClick?: () => void
}

const Link = ({ children, style, href, target, className, onClick }: Props): ReactElement => {
  const classes = useStyles()

  return (
    <Typography variant="link" style={style} className={className}>
      <a href={href} target={target} onClick={onClick} className={classes.link}>
        {children}
      </a>
    </Typography>
  )
}

export default Link
