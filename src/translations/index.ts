// For review of the page copy purposes. Later on can be used to provide other language translations

export default {
  // Main landng page
  langingPage: {
    tagline: 'The easiest way to share & access files on the Swarm network.',
    shareAction: 'share',
    accessAction: 'access',
    disclaimer:
      'The Swarm Gateway is operated by the Swarm Foundation. This service is under development and provided for testing purposes only. For unlimited use of the Swarm network consider running your own node.',
  },

  /** Access flow **/
  addFile: {
    header: 'share',
    tagline: 'Use the button below, or drag and drop, to select a file you would like to share on the Swarm network.',
    addFileAction: 'add a file',
    disclaimer: 'Maximum file size is 10MB. You can upload only one file at a time.',

    // Drag & drop overlay
    dragHeader: 'drop it',
    dragTagline: 'Add a file by dropping it anywhere on this window.',
  },

  uploadFile: {
    header: 'file',
    disclaimer: 'Please double-check before uploading, there is no undo. By uploading you agree to the Swarm Gateway',
    termsAndCondition: 'Terms & Conditions',
    uploadAction: 'upload',
    uploadingText: 'uploading...',
  },

  shareHashPage: {
    header: 'share',
    tagline:
      'Share your file with a simple web link, or a Swarm hash (a.k.a. ‘bzzhash’) if you’re familiar with the Swarm network.',
    tabWebLink: 'web link',
    tabSwarmHash: 'swarm hash',
    disclaimer:
      'It may take some time for your file to become available on the Swarm network. Please keep in mind that this service is provided for testing purposes only. There’s no guarantee of availability.',
    copyLinkAction: 'copy link',
  },

  accessPage: {
    header: 'access',
    tagline: 'You can access files on the Swarm network by pasting a Swarm hash (or ‘bzzhash’) below.',
    disclaimer: 'Please note that there’s no guarantee for a file availability on the network.',
    textfieldPlaceholder: 'paste swarm hash here',
    findAction: 'find',
    backAction: 'no thanks',
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
      'Max size per file: 10 megabytes',
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
    description: 'The swarm hash in the link is wrong or incomplete. Please check you have coppied the full link.',
  },

  accessHashPage: {
    tagline: 'The easiest way to share & access files on the Swarm network.',
    retryAction: 'retry',
    downloadAction: 'download',
    useButtonToDownload: 'Use the button below to download this file.',
  },

  previewDetails: {
    fileName: 'Filename',
    fileSize: 'Size',
    fileType: 'Type',
  },
}
