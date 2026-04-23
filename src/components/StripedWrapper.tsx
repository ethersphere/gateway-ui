import { ReactElement } from 'react'

interface Props {
  children: ReactElement | ReactElement[]
}

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  background: `repeating-linear-gradient(
    45deg,
    #efefef,
    #efefef 4px,
    #ffffff 4px,
    #ffffff 8px
  )`,
}

export function StripedWrapper({ children }: Props): ReactElement {
  return <div style={wrapperStyle}>{children}</div>
}
