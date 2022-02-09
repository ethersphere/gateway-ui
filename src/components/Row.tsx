import type { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'
import copy from 'copy-to-clipboard'

import { Button, Typography, colors } from '../components/swarm-ui'
import { ClipboardLine } from '../components/swarm-ui/icons'
import { shortenLink } from '../utils/hash'

interface Props {
  value: string
  label: string
}

const useStyles = createUseStyles({
  root: {
    backgroundColor: colors.white,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
  },
  label: {
    padding: 6,
  },
  valueContent: { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
})

export default function Row({ value, label }: Props): ReactElement {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="button" className={classes.label}>
        {label}
      </Typography>
      <div className={classes.valueContent}>
        <Button variant="light" onClick={() => copy(value)}>
          {shortenLink(value)}
        </Button>
        <Button variant="light" onClick={() => copy(value)} icon={<ClipboardLine />} />
      </div>
    </div>
  )
}
