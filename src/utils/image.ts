interface Options {
  file: File
  maxWidth?: number
  maxHeight?: number
  lastModified?: number
}

interface Dimensions {
  width: number
  height: number
}

function getDimensions(imgWidth: number, imgHeight: number, maxWidth?: number, maxHeight?: number): Dimensions {
  if (!maxWidth && !maxHeight) throw new Error('Please define width or height')

  const ratioWidth = maxWidth ? imgWidth / maxWidth : 1
  const ratioHeight = maxHeight ? imgHeight / maxHeight : 1

  const ratio = Math.max(ratioWidth, ratioHeight)

  if (ratio <= 1) return { width: imgWidth, height: imgHeight }

  return { width: imgWidth * ratio, height: imgHeight * ratio }
}

export function resize({ file, maxWidth, maxHeight }: Options): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const allow = ['jpg', 'gif', 'bmp', 'png', 'jpeg', 'svg']

    if (
      !(
        file.name &&
        file.name.split('.').reverse()[0] &&
        allow.includes(file.name.split('.').reverse()[0].toLowerCase()) &&
        file.size &&
        file.type
      )
    ) {
      reject('File not supported!')
    }

    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = event => {
        const src = event?.target?.result

        if (!src || typeof src !== 'string') throw new Error('Not string')
        const img = new Image()
        img.src = src
        img.onload = () => {
          const dimensions = getDimensions(img.width, img.height, maxWidth, maxHeight)
          const elem = document.createElement('canvas')
          elem.width = dimensions.width
          elem.height = dimensions.height
          const ctx = elem.getContext('2d')

          if (!ctx) throw new Error('Failed to create cavas context')
          ctx.drawImage(img, 0, 0, elem.width, elem.height)
          ctx.canvas.toBlob(
            blob => {
              if (!blob) throw new Error('Not a blob')
              resolve(blob)
            },
            'image/jpeg',
            1,
          )
        }
      }
      reader.onerror = error => reject(error)
    } catch (error) {
      reject(error)
    }
  })
}
