import { createStyles, makeStyles } from '@material-ui/core'
import { ReactElement } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'scale-down',
    },
  }),
)

interface VideoProps {
  src: string | undefined
}

export function FitVideo(props: VideoProps): ReactElement {
  const classes = useStyles()

  return <video className={classes.video} src={props.src} controls />
}
