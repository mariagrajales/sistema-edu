import { Icon } from '../../../utils/atoms/Icon'
import { bitacoraContent } from '../constants/bitacoraContent'

interface InfoBarProps {
  demoMode: boolean
}

export function InfoBar({ demoMode }: InfoBarProps) {
  const { infoBar } = bitacoraContent

  return (
    <div className="sa-no-print flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg bg-[var(--sa-field)] px-3 py-2 text-[10px]">
      <span className="flex min-w-0 flex-1 items-center gap-2 text-[var(--sa-muted)]">
        <Icon name={infoBar.icon} size={13} color="var(--sa-accent)" />
        <span>
          {demoMode
            ? 'Datos de ejemplo: no se sincronizan con el expediente real.'
            : infoBar.text}
        </span>
      </span>
      <span className="font-medium whitespace-nowrap text-[var(--sa-muted)]">
        {demoMode ? 'Vista previa · sólo desarrollo' : infoBar.sync}
      </span>
      <button
        type="button"
        onClick={() => { window.location.hash = '#maestros/dua' }}
        className="inline-flex min-h-7 items-center gap-1 font-bold whitespace-nowrap text-[var(--sa-accent)] underline"
      >
        <Icon name={infoBar.link.icon} size={12} color="currentColor" />
        {infoBar.link.label}
      </button>
    </div>
  )
}
