import { cn } from '../cn'

interface AppPreviewImageProps {
  src: string
  alt: string
  className?: string
}

export function AppPreviewImage({ src, alt, className }: AppPreviewImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      fetchPriority="high"
      className={cn('block aspect-video w-full object-cover object-center rounded-[var(--radius-lg)]', className)}
    />
  )
}
