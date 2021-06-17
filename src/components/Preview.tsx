import { ReactElement, useState, useContext, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { ArrowLeft, ArrowDown } from 'react-feather'

import Header from '../components/Header'

import { Context } from '../providers/bee'
import { DOWNLOAD_HOST } from '../constants'

import * as ROUTES from '../Routes'

interface Props {
  file?: File | Metadata
  preview?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
    },
    imageWrapper: {
      padding: theme.spacing(2),
    },
    image: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    list: {
      padding: theme.spacing(2),
      listStyleType: 'none',
      textAlign: 'left',
      overflowWrap: 'break-word',
    },
    name: {
      color: theme.palette.text.disabled,
    },
  }),
)

const Preview = ({ file, preview }: Props): ReactElement => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Paper square elevation={0} className={classes.root}>
      {preview && (
        <div className={classes.imageWrapper}>
          <img src={preview} className={classes.image} />
        </div>
      )}
      {file && (
        <ul className={classes.list}>
          <li>
            <Typography variant={'caption'}>
              <span className={classes.name}>Filename:</span> {file.name}
            </Typography>
          </li>
          <li>
            <Typography variant={'caption'}>
              <span className={classes.name}>Size:</span> {file.size}
            </Typography>
          </li>
          <li>
            <Typography variant={'caption'}>
              <span className={classes.name}>Type:</span> {file.type}
            </Typography>
          </li>
        </ul>
      )}
    </Paper>
  )
}

export default Preview
