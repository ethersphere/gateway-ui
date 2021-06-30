import Button, { ButtonProps } from '@material-ui/core/Button'
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

interface Props extends ButtonProps {
  icon: arrowType
  kind: 'primary' | 'secondary'
}

export const SButton = (props: Props) => {
  const classes = useStyles()
  const { icon, kind, children, ...rest } = props
  const IconComponent = getIcon(icon)

  if (kind === 'primary') {
    return (
      <Button {...rest} size="small" className={classes.root}>
        {children}
      </Button>
    )
  }

  return (
    <Button {...rest} size="small" className={classes.root}>
      {children}
    </Button>
  )
}
