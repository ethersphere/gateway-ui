import { createUseStyles } from 'react-jss'
import { ReactElement, ReactNode, CSSProperties } from 'react'

import Typography from './Typography'

const useStyles = createUseStyles({
  common: {
    color: '#303030',
    backgroundColor: 'white',
    padding: 12,
    cursor: 'pointer',
    '-moz-user-select': '-moz-none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    '-ms-user-select': 'none',
    userSelect: 'none',
    '& svg': {
      fill: '#dd7200',
      transition: '0.1s',
    },
    '&:hover, &:active': {
      color: 'white',
      backgroundColor: '#dd7200',
      transition: '0.1s',
      '& svg': {
        fill: 'white',
        transition: '0.1s',
      },
    },
  },
})

interface Props {
  variant: 'primary' | 'secondary'
  children: ReactNode
  icon?: ReactElement
  style?: CSSProperties
  onClick?: () => void
}

const Button = ({ variant, children, style, onClick, icon }: Props): ReactElement => {
  const classes = useStyles()

  return (
    <Typography variant="button" style={style}>
      <div className={classes.common} onClick={onClick}>
        {icon}
        {children}
      </div>
    </Typography>
  )
}

export default Button
