import configuration from '@/config'

type Props = {
  src: string
  alt: string
  fitIn?: boolean
  height?: string | number
  width?: string | number
}

export default function Thumbnail({ src, alt, width, height }: Props) {
  const createUrl = (url: string) => {
    const thumbnailUrl: string[] = [configuration().staticUrl]

    // if (fitIn) thumbnailUrl.push('fin-in')
    // else if (height && width) thumbnailUrl.push(`${width}x${height}`)

    // thumbnailUrl.push(configuration().staticUrl)

    thumbnailUrl.push(url)

    return thumbnailUrl.join('/')
  }
  return <img src={createUrl(src)} alt={alt} width={width} height={height} />
}
