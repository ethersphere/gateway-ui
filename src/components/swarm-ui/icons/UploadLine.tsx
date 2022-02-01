import { IconProps, DEFAULT_SIZE } from './index'

export default function UploadLine({ size, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size || DEFAULT_SIZE}
      height={size || DEFAULT_SIZE}
      {...rest}
    >
      <path d="M3 19h18v2H3v-2zM13 5.828V17h-2V5.828L4.929 11.9l-1.414-1.414L12 2l8.485 8.485-1.414 1.414L13 5.83z" />
    </svg>
  )
}

UploadLine.displayName = 'UploadLine'
