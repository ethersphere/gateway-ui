import { createStyles, makeStyles } from '@material-ui/core'
import { ReactElement } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'scale-down',
    },
  }),
)

interface Props {
  alt: string
  src: string | undefined
}

export function FitImage({ alt, src }: Props): ReactElement {
  const classes = useStyles()

  return <img className={classes.image} alt={alt} src={src} />
}
