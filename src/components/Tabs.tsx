import Tab from '@mui/material/Tab'
import MuiTabs from '@mui/material/Tabs'
import { ReactElement, ReactNode, useEffect, useState } from 'react'

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
  const [index, setIndex] = useState<number>(0)

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setIndex(newIndex)
  }

  useEffect(() => onChange(values[index]?.value || ''), [index, values, onChange])

  return (
    <div style={{ flexGrow: 1 }}>
      <MuiTabs sx={{ mb: 4 }} value={index} onChange={handleChange} aria-label="tabs" variant="fullWidth">
        {values.map(({ label }, index) => (
          <Tab key={index} label={label} />
        ))}
      </MuiTabs>
      <div>
        {values.map(({ component, value }, indx) => (
          <div key={value}>{index === indx && component}</div>
        ))}
      </div>
    </div>
  )
}
