import { createUseStyles } from 'react-jss'
import { ReactElement, ReactNode, CSSProperties, ElementType } from 'react'

import Typography from './Typography'
import { colors } from './css'

const useStyles = createUseStyles({
  common: {
    color: colors.text.normal,
    backgroundColor: colors.white,
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
      fill: colors.swarmOrange,
      transition: '0.1s',
    },
    '&:hover, &:active': {
      color: colors.white,
      backgroundColor: colors.swarmOrange,
      transition: '0.1s',
      '& svg': {
        fill: 'white',
        transition: '0.1s',
      },
    },
  },
  disabled: {
    color: colors.text.normal,
    backgroundColor: colors.surface.lightGray,
    cursor: 'not-allowed',
    '& svg': {
      fill: colors.text.normal,
    },
    '&:hover, &:active': {
      color: colors.text.normal,
      backgroundColor: colors.surface.lightGray,
      transition: '0.1s',
      '& svg': {
        fill: colors.text.normal,
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
