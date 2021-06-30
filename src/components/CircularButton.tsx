import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'
import { ArrowLeft, X } from 'react-feather'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  }),
)

type arrowType = 'ArrowLeft' | 'X'

const getIcon = (type: arrowType) => {
  switch (type) {
    case 'ArrowLeft':
      return ArrowLeft
    case 'X':
      return X
    default:
      return X
  }
}

interface Props extends IconButtonProps {
  icon: arrowType
}

export const CircularButton = (props: Props) => {
  const classes = useStyles()
  const { icon, ...rest } = props
  const IconComponent = getIcon(icon)

  return (
    <IconButton {...rest} size="small" className={classes.root}>
      <IconComponent size={16} strokeWidth={1} />
    </IconButton>
  )
}
