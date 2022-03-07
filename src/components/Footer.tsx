import type { ReactElement, ReactNode } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

interface Props {
  children: ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: 32,
      margin: 0,
      padding: 64,
    },
    float: {
      zIndex: 100,
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
      margin: 0,
      padding: 64,
      paddingTop: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      '&::after': {
        content: '""',
        width: '100%',
        height: '100%',
        opacity: 0.9,
        backdropFilter: 'blur(1px)',
        position: 'absolute',
        backgroundColor: theme.palette.background.default,
        top: 0,
        left: 0,
        zIndex: -1,
      },
    },
  }),
)

export default function Footer({ children }: Props): ReactElement {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.float}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1,
              width: 640,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
