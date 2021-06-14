import type { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100vh',
    },
  }),
)

const Page404 = (): ReactElement => {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Typography>There is nothing to see here.</Typography>
    </Container>
  )
}

export default Page404
