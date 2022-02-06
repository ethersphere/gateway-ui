import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement, ReactNode, CSSProperties } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    common: {
      color: '#303030',
      fontFamily: 'iAWriterQuattroV',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
    },
    body: {
      fontSize: 16,
    },
    caption: {
      color: '#6c6c6c',
      fontSize: 14,
      fontStyle: 'italic',
    },
    button: {
      fontSize: 14,
    },
    code: {
      fontFamily: 'iAWriterMonoV',
      fontSize: 14,
    },
    link: {
      fontSize: 14,
      textDecoration: 'underline',
    },
    sizeSmall: {
      fontSize: 14,
    },
    sizeMedium: {
      fontSize: 16,
    },
    sizeLarge: {
      fontSize: 18,
    },
  }),
)

interface Props {
  variant?: 'body' | 'button' | 'caption' | 'code' | 'link'
  size?: 'small' | 'medium' | 'large'
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

const Typography = ({ variant, children, style, size, className }: Props): ReactElement => {
  const classes = useStyles()

  let variantClass = classes.body

  if (variant === 'button') variantClass = classes.button
  else if (variant === 'caption') variantClass = classes.caption
  else if (variant === 'code') variantClass = classes.code
  else if (variant === 'link') variantClass = classes.link

  let sizeClass = ''

  if (size === 'small') sizeClass = classes.sizeSmall
  else if (size === 'medium') sizeClass = classes.sizeMedium
  else if (size === 'large') sizeClass = classes.sizeLarge

  return (
    <span style={style} className={`${classes.common} ${variantClass} ${sizeClass} ${className}`}>
      {children}
    </span>
  )
}

export default Typography
