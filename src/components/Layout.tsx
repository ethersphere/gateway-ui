import type { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
      minHeight: '100vh',
    },
    section: {
      width: '100%',
    },
    margin: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }),
)

interface Props {
  top: ReactElement[]
  center: ReactElement[]
  bottom: ReactElement[]
}

export default function Layout({ top, center, bottom }: Props): ReactElement {
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.root}>
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
    </Container>
  )
}
