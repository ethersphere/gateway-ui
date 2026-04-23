import fs from 'fs'
import path from 'path'

const dataDir = path.join(__dirname, 'test-data')

// Each entry matches the shape accepted by Playwright's setInputFiles.
// The `name` field doubles as the relative path (Playwright passes it through as
// webkitRelativePath / File.name so the app's convertSwarmFile picks it up).

export const imageFile = () => ({
  name: 'photo.png',
  mimeType: 'image/png',
  buffer: fs.readFileSync(path.join(dataDir, 'image.png')),
})

export const videoFile = () => ({
  name: 'clip.webm',
  // Plain 'video/webm' returns 'maybe' from canPlayType in Chromium headless shell,
  // which isSupportedVideoType() treats as unsupported. Using the explicit VP8 codec
  // string returns 'probably', making the file correctly detected as a video.
  mimeType: 'video/webm; codecs=vp8',
  buffer: fs.readFileSync(path.join(dataDir, 'video.webm')),
})

// For website and folder uploads the filenames include a shared directory prefix
// so that the app's detectIndexHtml / getAssetNameFromFiles logic resolves them
// as a website or folder respectively.
export const websiteFiles = () => [
  {
    name: 'mysite/index.html',
    mimeType: 'text/html',
    buffer: fs.readFileSync(path.join(dataDir, 'website', 'index.html')),
  },
  {
    name: 'mysite/style.css',
    mimeType: 'text/css',
    buffer: fs.readFileSync(path.join(dataDir, 'website', 'style.css')),
  },
]

export const folderFiles = () => [
  {
    name: 'docs/document.txt',
    mimeType: 'text/plain',
    buffer: fs.readFileSync(path.join(dataDir, 'folder', 'document.txt')),
  },
  {
    name: 'docs/readme.txt',
    mimeType: 'text/plain',
    buffer: fs.readFileSync(path.join(dataDir, 'folder', 'readme.txt')),
  },
]
