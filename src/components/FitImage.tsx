import { ReactElement } from 'react'

interface Props {
  alt: string
  src: string | undefined
}

export function FitImage({ alt, src }: Props): ReactElement {
  return <img style={{ width: '100%', height: '100%', objectFit: 'scale-down' }} alt={alt} src={src} />
}
