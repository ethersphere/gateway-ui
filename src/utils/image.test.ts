import { getDimensions } from './image'

describe('getDimensions', () => {
  test('should not resize if the image fits in the bounding box', () => {
    const imgSize = { width: 10, height: 10 }
    const boundingBox = { width: 100, height: 100 }

    const { width, height } = getDimensions(imgSize.width, imgSize.height, boundingBox.width, boundingBox.height)

    expect(width).toEqual(imgSize.width)
    expect(height).toEqual(imgSize.height)
  })

  test('should resize when width is provided', () => {
    const imgSize = { width: 100, height: 100 }
    const boundingBox = { width: 10, height: undefined }

    const { width, height } = getDimensions(imgSize.width, imgSize.height, boundingBox.width, boundingBox.height)

    expect(width).toEqual(boundingBox.width)
    expect(height).toEqual(boundingBox.width)
  })

  test('should resize when height is provided', () => {
    const imgSize = { width: 100, height: 100 }
    const boundingBox = { width: undefined, height: 10 }

    const { width, height } = getDimensions(imgSize.width, imgSize.height, boundingBox.width, boundingBox.height)

    expect(width).toEqual(boundingBox.height)
    expect(height).toEqual(boundingBox.height)
  })

  test('should resize to the smaller value between width and height and scale the other proportionally', () => {
    const imgSize = { width: 200, height: 100 }
    const boundingBox = { width: 5, height: 10 }

    const { width, height } = getDimensions(imgSize.width, imgSize.height, boundingBox.width, boundingBox.height)

    expect(width).toEqual(boundingBox.width)
    expect(height).toEqual(boundingBox.width / 2)

    const d2 = getDimensions(imgSize.height, imgSize.width, boundingBox.height, boundingBox.width)

    expect(d2.width).toEqual(boundingBox.width / 2)
    expect(d2.height).toEqual(boundingBox.width)
  })
})
