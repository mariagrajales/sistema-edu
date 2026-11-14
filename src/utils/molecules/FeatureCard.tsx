import { IconTile } from '../atoms/IconTile'
import type { IconName } from '../types'
import { cn } from '../cn'

interface FeatureCardProps {
  icon: IconName
  background: 'mint'
  title: string
  subtitle: string
  description?: string
  className?: string
}

export function FeatureCard({
  icon,
  background,
  title,
  subtitle,
  description,
  className,
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        'flex h-full flex-col gap-2 rounded-[var(--radius-lg)] bg-[var(--color-card)] p-3 shadow-[var(--shadow-sm)]',
        className
      )}
    >
      <IconTile icon={icon} background={background} size="sm" className="shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h4 className="text-sm font-bold leading-tight text-[var(--color-text-primary)]">{title}</h4>
        {description ? <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">{description}</p> : null}
      </div>
      <p className="mt-auto w-full border-t border-[var(--color-separator)] pt-2 text-xs font-semibold text-[var(--color-chip-text)]">
        {subtitle}
      </p>
    </article>
  )
}
