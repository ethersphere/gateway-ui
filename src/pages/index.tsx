import { ReactElement } from 'react'

import { Container } from '@material-ui/core'

import Download from '../components/Download'
import Upload from '../components/Upload'
import Tabs from '../components/Tabs'

export default function Files(): ReactElement {
  return (
    <Container maxWidth="sm">
      <Tabs
        values={[
          {
            label: 'download',
            component: <Download />,
          },
          {
            label: 'upload',
            component: <Upload />,
          },
        ]}
      />
    </Container>
  )
}
