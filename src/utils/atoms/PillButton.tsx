import type { IconName } from '../types'
import { Icon } from './Icon'
import { cn } from '../cn'

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  icon?: IconName
  iconOnly?: boolean
  variant?: 'light' | 'sky'
}

export function PillButton({ label, icon, iconOnly = false, variant = 'light', className, ...props }: PillButtonProps) {
  const variantClasses =
    variant === 'sky'
      ? 'border border-[var(--color-help-border)] bg-[var(--color-sky)] text-[var(--color-help-text)] hover:brightness-95'
      : 'bg-[var(--color-card)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]'

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 px-3 py-2 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] min-h-[var(--size-min-touch)]',
        'active:scale-[0.98]',
        'aria-pressed:bg-[var(--color-forest)] aria-pressed:text-white aria-pressed:shadow-none aria-pressed:ring-2 aria-pressed:ring-[var(--color-forest)] aria-pressed:ring-offset-2 aria-pressed:hover:brightness-110',
        variantClasses,
        className
      )}
      {...props}
    >
      {icon ? <Icon name={icon} size={18} color="currentColor" /> : null}
      <span className={cn('text-sm font-bold', iconOnly ? 'sr-only' : undefined)}>{label}</span>
    </button>
  )
}
