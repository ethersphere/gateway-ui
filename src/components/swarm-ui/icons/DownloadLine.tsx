import { IconProps, DEFAULT_SIZE } from './index'

export default function DownloadLine({ size, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size || DEFAULT_SIZE}
      height={size || DEFAULT_SIZE}
      {...rest}
    >
      <path d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z" />
    </svg>
  )
}

DownloadLine.displayName = 'DownloadLine'
