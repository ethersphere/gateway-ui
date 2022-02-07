import { createUseStyles } from 'react-jss'
import { ReactElement, ReactNode, CSSProperties, ElementType } from 'react'

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  disabled: {
    color: '#666',
    backgroundColor: '#bbb',
    cursor: 'not-allowed',
    '& svg': {
      fill: '#666',
    },
    '&:hover, &:active': {
      color: '#666',
      backgroundColor: '#bbb',
      transition: '0.1s',
      '& svg': {
        fill: '#666',
        transition: '0.1s',
      },
    },
  },
  icon: {
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

interface Props {
  variant: 'primary' | 'secondary'
  children: ReactNode
  icon?: ReactElement
  style?: CSSProperties
  onClick?: () => void
  className?: string
  component?: ElementType
  disabled?: boolean
}

const Button = ({ variant, children, style, onClick, icon, className, component, disabled }: Props): ReactElement => {
  const classes = useStyles()

  const DefaultComponent: ElementType = component || 'div'

  return (
    <Typography variant="button" style={style} className={className}>
      <DefaultComponent
        className={`${classes.common} ${disabled ? classes.disabled : ''}`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
      >
        {icon ? <div className={classes.icon}>{icon}</div> : null}
        {children}
      </DefaultComponent>
    </Typography>
  )
}

export default Button
