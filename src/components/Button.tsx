import * as MButton from '@material-ui/core/Button'
import { ArrowLeft, ArrowDown, ArrowUp, X, CornerUpLeft, Check } from 'react-feather'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(2),
    },
    icon: {
      color: 'orange',
      backgroundColor: 'orange',
    },
  }),
)

type arrowType = 'ArrowLeft' | 'ArrowDown' | 'ArrowUp' | 'X' | 'CornerUpLeft' | 'Check'
type kind = 'primary' | 'secondary'

const getIcon = (type?: arrowType) => {
  switch (type) {
    case 'ArrowLeft':
      return ArrowLeft
    case 'ArrowDown':
      return ArrowDown
    case 'ArrowUp':
      return ArrowUp
    case 'CornerUpLeft':
      return CornerUpLeft
    case 'X':
      return X
    case 'Check':
      return Check
    default:
      return X
  }
}

interface Props extends MButton.ButtonProps {
  icon?: arrowType
  kind?: kind
}

const defaultProps = {
  icon: 'X' as arrowType,
  kind: 'primary' as kind,
}

export const Button = (props: Props = defaultProps) => {
  const classes = useStyles()
  const { icon, kind, children, ...rest } = props
  const IconComponent = getIcon(icon)

  // Primary button
  if (kind === 'primary') {
    return (
      <MButton.default {...rest} size="large" className={classes.root}>
        <IconComponent strokeWidth={1} className={classes.icon} />
        {children}
        <IconComponent style={{ opacity: 0 }} />
      </MButton.default>
    )
  }

  // Secondary button
  return (
    <MButton.default {...rest} size="small" className={classes.root}>
      <IconComponent strokeWidth={1} />
      {children}
      <IconComponent style={{ opacity: 0 }} />
    </MButton.default>
  )
}
