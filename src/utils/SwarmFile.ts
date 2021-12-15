export function convertSwarmFile(file: FilePath, path?: string): SwarmFile {
  const pth = path || file.path || file.webkitRelativePath || file.name
  file.path = pth.replace(/^\//g, '') // remove the starting slash

  return file as SwarmFile
}
