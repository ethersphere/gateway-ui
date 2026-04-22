import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import type { ReactElement, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  height: theme.spacing(11),
  [theme.breakpoints.down('md')]: {
    height: theme.spacing(7),
  },
}))

const Float = styled('div')(({ theme }) => ({
  zIndex: 100,
  width: '100%',
  position: 'fixed',
  bottom: 0,
  left: 0,
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
}))

export default function Footer({ children }: Props): ReactElement {
  return (
    <Root>
      <Float>
        <Container
          maxWidth="sm"
          sx={theme => ({
            width: '100%',
            padding: theme.spacing(2),
            paddingBottom: theme.spacing(6),
            [theme.breakpoints.down('md')]: {
              paddingBottom: theme.spacing(2),
            },
          })}
        >
          <>{children}</>
        </Container>
      </Float>
    </Root>
  )
}
