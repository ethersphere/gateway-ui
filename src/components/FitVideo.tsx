import { ReactElement } from 'react'

interface VideoProps {
  src: string | undefined
}

export function FitVideo(props: VideoProps): ReactElement {
  return <video style={{ width: '100%', height: '100%', objectFit: 'scale-down' }} src={props.src} controls />
}
