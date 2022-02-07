import { ReactElement, CSSProperties } from 'react'
import { StripedWrapper } from './StripedWrapper'

interface Props {
  icon: ReactElement
  style?: CSSProperties
  className?: string
}

export function AssetIcon({ icon, style, className }: Props): ReactElement {
  return (
    <StripedWrapper style={style} className={className}>
      {icon}
    </StripedWrapper>
  )
}
