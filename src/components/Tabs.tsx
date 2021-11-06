import { ReactElement, ReactNode, useEffect, useState } from 'react'
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
}))

interface TabsValues {
  component: ReactNode
  label: string
  value: string
}

interface Props {
  values: TabsValues[]
  onChange: (value: string) => void
}

export default function SimpleTabs({ values, onChange }: Props): ReactElement {
  const classes = useStyles()
  const [index, setIndex] = useState<number>(0)

  const handleChange = (_event: React.ChangeEvent<Record<string, never>>, newIndex: number) => {
    setIndex(newIndex)
  }

  useEffect(() => onChange(values[index]?.value || ''), [index, values, onChange])

  return (
    <div className={classes.root}>
      <Tabs className={classes.tabs} value={index} onChange={handleChange} aria-label="tabs" variant="fullWidth">
        {values.map(({ label }, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
      <div>
        {values.map(({ component, value }, indx) => (
          <div key={value}>{index === indx && component}</div>
        ))}
      </div>
    </div>
  )
}
