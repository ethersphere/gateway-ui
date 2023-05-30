import { ReactElement, useState, useEffect } from 'react'
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import { fetchKey, fetchKeys } from '../providers/fairos'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'

import * as ROUTES from '../Routes'

import text from '../translations'

/*
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    footerReservedSpace: {
      height: theme.spacing(10), // Filler space so that the layout of the page does not change as users write text
    },
  }),
)
*/

function retrieveHash(
  name: string,
  oldKeys: { [key: string]: string | undefined },
  setList: (val: { [key: string]: string | undefined }) => void,
) {
  return fetchKey(name).then(res => {
    const allKeys = { ...oldKeys, [name]: res }
    setList(allKeys)

    return allKeys
  })
}

export default function BrowsePage(): ReactElement {
  const navigate = useNavigate()

  const [list, setList] = useState<{ [key: string]: string | undefined }>({})
  const [hashToRetrieve, setHashToRetrieve] = useState<string>('')

  useEffect(() => {
    if (Object.keys(list).length === 0) {
      fetchKeys().then(res => {
        const listObj: { [key: string]: string | undefined } = {}

        res.forEach(key => {
          listObj[key] = undefined
        })

        setList(listObj)
      })
    }
  }, [list])

  useEffect(() => {
    if (hashToRetrieve.length >= 1) {
      retrieveHash(hashToRetrieve, list, setList).then(res => {
        setList(res)
        navigate(ROUTES.ACCESS_HASH(res[hashToRetrieve]))
      })
    }
  }, [hashToRetrieve])

  return (
    <Layout
      top={[
        <Header
          key="top1"
          leftAction={
            <IconButton
              onClick={() => {
                navigate(ROUTES.LANDING_PAGE)
              }}
            >
              <ArrowLeft strokeWidth={1} />
            </IconButton>
          }
        >
          {text.browsePage.header}
        </Header>,
        <Typography key="top2" variant="subtitle1">
          {text.browsePage.tagline}
        </Typography>,
      ]}
      center={[
        <div key="center1">
          {Object.keys(list).map(name => (
            <Typography key={'center-' + name} variant="body1">
              {list[name] ? (
                <Link href={ROUTES.ACCESS_HASH(list[name])}>{name}</Link>
              ) : (
                <Link onClick={() => setHashToRetrieve(name)}>{name}</Link>
              )}
            </Typography>
          ))}
        </div>,
      ]}
      bottom={[
        <Footer key="bottom1">
          <div></div>
        </Footer>,
        <Typography key="bottom2" variant="body2" style={{ opacity: 1 }}>
          {text.browsePage.disclaimer}
        </Typography>,
      ]}
    />
  )
}
