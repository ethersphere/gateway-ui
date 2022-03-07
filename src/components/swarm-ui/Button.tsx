import { createUseStyles } from 'react-jss'
import type { ReactElement, ReactNode, CSSProperties, ElementType, MouseEventHandler } from 'react'

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
    '& > *:not(:last-child)': {
      marginRight: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  light: {
    color: colors.text.normal,
    backgroundColor: colors.white,
    padding: 8,
    cursor: 'pointer',
    '& svg': {
      fill: colors.text.normal,
    },
    '&:hover, &:active': {
      backgroundColor: colors.lightOrange,
      color: colors.swarmOrange,
      '& svg': {
        fill: colors.swarmOrange,
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
      '& svg': {
        fill: colors.text.normal,
      },
    },
  },
})

interface Props {
  variant: 'primary' | 'secondary' | 'light'
  children?: ReactNode
  icon?: ReactElement
  style?: CSSProperties
  onClick?: MouseEventHandler
  className?: string
  component?: ElementType
  disabled?: boolean
}

const Button = ({ variant, children, style, onClick, icon, className, component, disabled }: Props): ReactElement => {
  const classes = useStyles()

  const DefaultComponent: ElementType = component || 'div'

  let variantClass = ''

  if (variant === 'light') variantClass = classes.light

  return (
    <Typography variant={variant === 'light' ? 'code' : 'button'} style={style} className={className}>
      <DefaultComponent
        className={`${classes.common} ${variantClass} ${disabled ? classes.disabled : ''}`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
      >
        {icon}
        {children ? <span>{children}</span> : null}
      </DefaultComponent>
    </Typography>
  )
}

export default Button
