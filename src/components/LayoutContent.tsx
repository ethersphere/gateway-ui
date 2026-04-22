import Paper from '@mui/material/Paper'
import type { ReactElement } from 'react'

interface Props {
  children: ReactElement[]
}

export default function LayoutContent({ children }: Props): ReactElement {
  return (
    <Paper
      square
      elevation={0}
      sx={{
        width: '100%',
        p: 2,
        pt: 6,
        pb: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between',
      }}
    >
      {children.map((child, i) => (
        <div key={i} style={{ marginTop: 8, marginBottom: 8 }}>
          {child}
        </div>
      ))}
    </Paper>
  )
}
