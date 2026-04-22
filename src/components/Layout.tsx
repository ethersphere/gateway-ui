import Container from '@mui/material/Container'
import type { ReactElement } from 'react'

interface Props {
  top: ReactElement[]
  center: ReactElement[]
  bottom: ReactElement[]
}

export default function Layout({ top, center, bottom }: Props): ReactElement {
  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        '@supports (-webkit-overflow-scrolling: touch)': {
          minHeight: '-webkit-fill-available',
        },
      }}
    >
      <div style={{ width: '100%' }}>
        {top.map((el, i) => (
          <div key={i} style={{ marginTop: 16, marginBottom: 16 }}>
            {el}
          </div>
        ))}
      </div>
      <div style={{ width: '100%' }}>
        {center.map((el, i) => (
          <div key={i} style={{ marginTop: 16, marginBottom: 16 }}>
            {el}
          </div>
        ))}
      </div>
      <div style={{ width: '100%' }}>
        {bottom.map((el, i) => (
          <div key={i} style={{ marginTop: 16, marginBottom: 16 }}>
            {el}
          </div>
        ))}
      </div>
    </Container>
  )
}
