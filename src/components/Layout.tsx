import type { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'stretch',
    padding: 32,
    minHeight: '100vh',
    '@supports (-webkit-overflow-scrolling: touch)': {
      minHeight: '-webkit-fill-available',
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    maxWidth: 640,
    height: '100%',
  },
  section: {
    width: '100%',
  },
  margin: {
    marginTop: 32,
    marginBottom: 32,
  },
})

interface Props {
  top: ReactElement[]
  center: ReactElement[]
  bottom: ReactElement[]
}

export default function Layout({ top, center, bottom }: Props): ReactElement {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.section}>
          {top.map((el, i) => (
            <div key={i} className={classes.margin}>
              {el}
            </div>
          ))}
        </div>
        <div className={classes.section}>
          {center.map((el, i) => (
            <div key={i} className={classes.margin}>
              {el}
            </div>
          ))}
        </div>
        <div className={classes.section}>
          {bottom.map((el, i) => (
            <div key={i} className={classes.margin}>
              {el}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
