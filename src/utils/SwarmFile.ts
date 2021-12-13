export class SwarmFile implements File {
  public name: string
  public path: string
  public type: string
  public size: number
  public slice: Blob['slice']
  public stream: Blob['stream']
  public text: Blob['text']
  public lastModified: number
  public webkitRelativePath: string
  public arrayBuffer: () => Promise<ArrayBuffer>
  private data: Promise<ArrayBuffer>

  constructor(file: File, path?: string) {
    const pth = path || Reflect.get(file, 'path') || file.webkitRelativePath || file.name
    this.path = pth.startsWith('/') ? pth.slice(1) : pth
    this.webkitRelativePath = this.path
    this.name = file.name
    this.type = file.type
    this.size = file.size
    this.data = file.arrayBuffer()
    this.slice = file.slice
    this.text = file.text
    this.stream = file.stream
    this.lastModified = file.lastModified
    this.arrayBuffer = async () => {
      const data = await this.data

      return data
    }
  }
}
