import { cn } from '../../../utils/cn'
import { observacionModal } from '../constants/observacionModal'

interface NotificationToggleProps {
  checked: boolean
  large?: boolean
  demoMode?: boolean
  onChange: (checked: boolean) => void
}

export function NotificationToggle({ checked, large, demoMode = false, onChange }: NotificationToggleProps) {
  const { notificar } = observacionModal

  return (
    <label
      className={cn(
        'flex cursor-pointer items-start rounded-xl bg-[var(--sa-field)]',
        large ? 'gap-3 px-4 py-3' : 'gap-3 px-5 py-4'
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className={cn(
          'shrink-0 accent-[var(--color-forest)]',
          large ? 'mt-0.5 h-5 w-5' : 'mt-0.5 h-6 w-6'
        )}
      />
      <span>
        <span
          className={cn('block font-bold text-[var(--color-text-primary)]', large ? 'text-base' : 'text-base')}
        >
          {demoMode ? 'Simular aviso al gabinete de apoyo' : notificar.title}
        </span>
        <span className={cn('mt-1 block text-[var(--sa-muted)]', large ? 'text-sm' : 'text-base')}>
          {demoMode
            ? 'La opción sólo cambia el estado del formulario; no se envía ningún aviso real.'
            : notificar.body}
        </span>
      </span>
    </label>
  )
}
