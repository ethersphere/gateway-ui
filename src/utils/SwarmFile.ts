export interface SwarmFile extends File {
  path: string
}

export function convertSwarmFile(file: File, path?: string): SwarmFile {
  const pth = path || Reflect.get(file, 'path') || file.webkitRelativePath || file.name
  const fl = file as SwarmFile
  fl.path = pth.replace(/^\//g, '') // remove the starting slash

  return fl
}
