import React, { ReactElement, ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  tabs: {
    marginBottom: theme.spacing(4),
  },
  content: {
    padding: theme.spacing,
  },
}))

interface TabsValues {
  component: ReactNode
  label: string
}

interface Props {
  values: TabsValues[]
}

export default function SimpleTabs({ values }: Props): ReactElement {
  const classes = useStyles()
  const [value, setValue] = React.useState<number>(0)

  const handleChange = (event: React.ChangeEvent<Record<string, never>>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <Tabs className={classes.tabs} value={value} onChange={handleChange} aria-label="tabs" variant="fullWidth">
        {values.map(({ label }, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
      <div>
        {values.map(({ component }, index) => (
          <div key={index}>{value === index && component}</div>
        ))}
      </div>
    </div>
  )
}
