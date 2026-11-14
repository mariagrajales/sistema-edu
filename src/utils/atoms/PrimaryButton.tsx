import type { IconName } from '../types'
import { Icon } from './Icon'

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  leadingIcon?: IconName
  trailingIcon?: IconName
  loading?: boolean
}

export function PrimaryButton({
  label,
  leadingIcon,
  trailingIcon,
  loading,
  className,
  disabled,
  ...props
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type="button"
      className={[
        'w-full min-h-[var(--size-min-touch)] flex items-center justify-center gap-2 rounded-[var(--radius-md)]',
        'bg-[var(--color-forest)] text-white font-bold shadow-[0_4px_12px_rgba(34,84,77,0.25)] transition-all duration-200 ease-in-out',
        'hover:brightness-110 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-input-focus)] focus-visible:outline-offset-2',
        isDisabled ? 'opacity-60 cursor-not-allowed hover:brightness-100 active:translate-y-0' : undefined,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="size-5 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : leadingIcon ? (
        <Icon name={leadingIcon} size={20} color="currentColor" />
      ) : null}
      <span>{label}</span>
      {trailingIcon ? <Icon name={trailingIcon} size={20} color="currentColor" /> : null}
    </button>
  )
}
