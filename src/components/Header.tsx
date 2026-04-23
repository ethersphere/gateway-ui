import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import type { ReactElement, ReactNode } from 'react'

interface Props {
  children: ReactNode
  leftAction?: ReactElement
  rightAction?: ReactElement
}

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  height: theme.spacing(10),
  margin: 0,
  padding: 0,
  [theme.breakpoints.down('md')]: {
    height: theme.spacing(6), // FIXME: The component is actually 4 theme spacing bigger (so spacing(10) ), but the Layout component adds 2x2 theme spacings and this was simplest way to do it
  },
}))

const Float = styled('div')(({ theme }) => ({
  zIndex: 100,
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  margin: 0,
  padding: theme.spacing(2),
  paddingTop: theme.spacing(6),
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&::after': {
    content: '""',
    width: '100%',
    height: '100%',
    opacity: 0.9,
    backdropFilter: 'blur(1px)',
    position: 'absolute',
    backgroundColor: theme.palette.background.default,
    top: 0,
    left: 0,
    zIndex: -1,
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))

const Action = styled('div')(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export default function Header({ children, leftAction, rightAction }: Props): ReactElement {
  return (
    <Root>
      <Float>
        <Action>{leftAction}</Action>
        <Typography variant="button">{children}</Typography>
        <Action>{rightAction}</Action>
      </Float>
    </Root>
  )
}
