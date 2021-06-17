import { ReactElement, useState, useContext } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Paper, InputBase, IconButton, FormHelperText, Button } from '@material-ui/core'
import { Search } from 'react-feather'
import { apiHost } from '../constants'
import { Reference, Utils } from '@ethersphere/bee-js'
import { Context } from '../providers/bee'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0.25),
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
)

export default function Files(): ReactElement {
  const classes = useStyles()

  const [referenceInput, setReferenceInput] = useState('')
  const [referenceError, setReferenceError] = useState<Error | null>(null)

  const [isLoadingMetadata, setIsLoadingMetadata] = useState<boolean>(false)
  const [metadata, setMetadata] = useState<Metadata | undefined>()

  const { getMetadata } = useContext(Context)

  const handleReferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReferenceInput(e.target.value)

    if (Utils.Hex.isHexString(e.target.value, 64) || Utils.Hex.isHexString(e.target.value, 128)) setReferenceError(null)
    else setReferenceError(new Error('Incorrect format of swarm hash'))
  }

  const handleSearch = () => {
    setIsLoadingMetadata(true)
    getMetadata(referenceInput as Reference)
      .then(setMetadata)
      .catch(console.error) //eslint-disable-line
      .finally(() => {
        setIsLoadingMetadata(false)
      })
  }

  return (
    <>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Enter swarm reference e.g. 0773a91efd6547c754fc1d95fb1c62c7d1b47f959c2caa685dfec8736da95c1c"
          inputProps={{ 'aria-label': 'retrieve file from swarm' }}
          value={referenceInput}
          onChange={handleReferenceChange}
        />
        <IconButton
          onClick={handleSearch}
          disabled={referenceError !== null || !referenceInput}
          className={classes.iconButton}
          aria-label="download"
        >
          <Search />
        </IconButton>
      </Paper>
      {isLoadingMetadata && <span>loading metadata...</span>}
      <code>{metadata && JSON.stringify(metadata)}</code>
      {metadata && (
        <Button
          href={`${apiHost}/bzz/${referenceInput}`}
          target="_blank"
          disabled={referenceError !== null || !referenceInput}
        >
          Download
        </Button>
      )}
      {referenceError && <FormHelperText error>{referenceError.message}</FormHelperText>}
    </>
  )
}
