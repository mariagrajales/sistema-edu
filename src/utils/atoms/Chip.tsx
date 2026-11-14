import { cn } from '../cn'

interface ChipProps {
  label: string
  className?: string
}

export function Chip({ label, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--color-chip-border)] bg-[var(--color-chip)] px-2 py-1 text-sm text-[var(--color-chip-text)]',
        className
      )}
    >
      {label}
    </span>
  )
}
