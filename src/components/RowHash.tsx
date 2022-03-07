import { ReactElement, useState } from 'react'
import { createUseStyles } from 'react-jss'
import copy from 'copy-to-clipboard'

import { Button, Typography, colors } from '../components/swarm-ui'
import { EyeLine, EyeOffLine } from '../components/swarm-ui/icons'
import { shortenHash } from '../utils/hash'

interface Props {
  hash: string
  label: string
}

const useStyles = createUseStyles({
  root: {
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
  },
  content: {
    padding: 6,
  },
  button: {
    alignText: 'left',
  },
  label: {
    padding: 6,
  },
  valueContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default function Row({ hash, label }: Props): ReactElement {
  const classes = useStyles()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="button" className={classes.label}>
          {label}
        </Typography>
        <div className={classes.valueContent}>
          {!open && (
            <Button variant="light" onClick={() => copy(hash)}>
              {shortenHash(hash)}
            </Button>
          )}
          <Button variant="light" onClick={() => setOpen(!open)} icon={open ? <EyeOffLine /> : <EyeLine />} />
        </div>
      </div>
      {open && (
        <div className={classes.content}>
          <Button variant="light" className={classes.button}>
            {hash.split(/(?=(?:........)*$)/).join(' ')}
          </Button>
        </div>
      )}
    </div>
  )
}
