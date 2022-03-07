export function shortenHash(hash: string, sliceLength = 8): string {
  return `${hash.slice(0, sliceLength)}[…]${hash.slice(-sliceLength)}`
}

export function shortenLink(link: string, maxLength = 32): string {
  if (link.length < maxLength) return link

  return `${link.slice(0, maxLength)}…`
}
