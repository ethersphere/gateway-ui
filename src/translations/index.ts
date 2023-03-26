// For review of the page copy purposes. Later on can be used to provide other language translations
import { UPLOAD_SIZE_LIMIT } from '../constants'
import { shortenBytes } from '../utils'

const uploadSizeLimit = shortenBytes(UPLOAD_SIZE_LIMIT, 0)

const text = {
  // Main landng page
  landingPage: {
    tagline: 'The easiest way to share & access files on the Swarm network.',
    shareAction: 'share',
    accessAction: 'access',
    disclaimer:
      'The Swarm Gateway is graciously provided by the Swarm Foundation. This service is under development and provided for testing purposes only. For unlimited use of the Swarm network consider running your own node.',
    links: [
      { label: 'Swarm Website', link: 'https://www.ethswarm.org/' },
      { label: 'FAQ', link: 'https://www.ethswarm.org/faqs.html' },
      { label: 'Ecosystem', link: 'https://www.ethswarm.org/ecosystem.html' },
      { label: 'Github', link: 'https://github.com/ethersphere/' },
      { label: 'Terms & Conditions', link: '/termsandconditions', internal: true },
    ],
  },

  /** Access flow **/
  addFile: {
    header: 'share',
    tagline: 'Use the buttons below, or drag and drop, to select files you would like to share on the Swarm network.',
    addFileAction: 'add a file',
    addFolderAction: 'add a folder or website',
    disclaimer: `Maximum upload size is ${uploadSizeLimit}. To upload a website make sure that your folder contains an "index.html" file.`,

    // Drag & drop overlay
    dragHeader: 'drop it',
    dragTagline: 'Add by dropping it anywhere on this window.',
  },

  uploadFile: {
    headerFile: 'File',
    headerWebsite: 'Website',
    headerFolder: 'Folder',
    tagline: 'Please double-check before uploading, there is no undo.',
    disclaimer: 'By uploading you agree to the Swarm Gateway',
    termsAndCondition: 'Terms & Conditions',
    uploadAction: 'upload',
    uploadingText: 'uploading...',
    uploadError: 'Failed to upload the file. Please try again later.',
    sizeLimitError: `Your upload is over the limit of ${uploadSizeLimit}. Please use your own Bee node to avoid this limitation.`,
  },

  shareHashPage: {
    header: 'share',
    tagline: 'Share your file with a simple web link, or a Swarm hash.',
    tabWebLink: 'web link',
    tabSwarmHash: 'swarm hash',
    disclaimer:
      'It may take some time for your file to become available on the Swarm network. Please keep in mind that this service is provided for testing purposes only. There’s no guarantee of availability.',
    copyLinkAction: 'copy link',
    copyLinkActionSuccess: 'copied',
  },

  accessPage: {
    header: 'access',
    tagline: 'The easiest way to share & access files on the Swarm network.',
    disclaimer: 'Please note that there’s no guarantee for a file availability on the network.',
    textfieldPlaceholder: 'Paste Swarm Hash Here',
    findAction: 'find',
    backAction: 'back',
    hashLengthWarning: 'Should be 64 or 128 hex characters',
  },

  page404: {
    header: 'This link does not exist.',
    description: 'Please return to the main gateway page by clicking the button below.',
    goBackAction: 'back to gateway',
  },

  fileNotFound: {
    header: 'Sorry, the file was not found.',
    description: 'The file might not be available yet or has expired and is no longer accessible on the Swarm network.',
  },

  loadingFile: {
    header: 'Loading...',
    description: 'Retrieving the file data from the Swarm network, please wait.',
  },

  unknownFile: {
    header: 'Found your file.',
    description: 'However, due to the way it was uploaded, there are no metadata.',
  },

  termsAndConditions: {
    header: 'before you share',
    tagline1: 'You need to agree to our',
    tagline2: 'before uploading a file.',
    termsAndConditions: 'Terms & Conditions',
    featuresAndLimitationsHeader: 'In a nutshell, this is what you need to agree with:',
    featuresAndLimitations: [
      'This page is a free trial version of a gateway to Swarm',
      `Max size per file: ${uploadSizeLimit}.`,
      'The file is kept on the Swarm network for a limited time and can disappear at any time',
      'Your data is not encrypted. The file you upload is publicly available, the link is hidden.',
      'No registration or signup required',
      'Limited number of transfers per day',
    ],
    agreeAction: 'I agree',
    disclaimer1: 'You can read the whole',
    disclaimer2: 'Terms & Conditions here.',
  },

  termsAndConditionsPage: {
    header: 'Gateway User Testing Terms and Conditions (June 2021)',
  },

  invalidSwarmHash: {
    header: 'Invalid Swarm Hash',
    description: 'The swarm hash in the link is wrong or incomplete. Please check you have copied the full link.',
  },

  accessHashPage: {
    tagline: 'The easiest way to share & access files on the Swarm network.',
    retryAction: 'retry',
    downloadAction: 'download',
    downloadingAction: 'downloading...',
    useButtonToDownload: 'Use the button below to download this file.',
    openWebsite: 'open bzz link',
  },

  previewDetails: {
    folderName: 'Folder Name',
    folderContent: 'Folder content',
    items: 'items',
    fileName: 'Filename',
    size: 'Size',
    type: 'Type',
  },
}

export default text
