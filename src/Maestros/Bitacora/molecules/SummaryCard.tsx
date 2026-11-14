import { Icon } from '../../../utils/atoms/Icon'
import { bitacoraContent } from '../constants/bitacoraContent'
import { useState } from 'react'

interface SummaryCardProps {
  count: number
  demoMode: boolean
}

export function SummaryCard({ count, demoMode }: SummaryCardProps) {
  const { summary } = bitacoraContent
  const [shareMessage, setShareMessage] = useState('')

  const handleShare = async () => {
    const text = `${count} observaciones${demoMode ? ' de ejemplo' : ''} en la bitácora.`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Bitácora de aula', text })
        return
      }
      await navigator.clipboard.writeText(text)
      setShareMessage('Resumen copiado al portapapeles.')
    } catch {
      setShareMessage('No fue posible compartir el resumen en este navegador.')
    }
  }

  return (
    <article className="rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-3.5 shadow-[var(--shadow-sm)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--sa-menta-soft)] text-[var(--sa-accent)]">
            <span className="text-sm font-extrabold">{count}</span>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-xs font-extrabold text-[var(--color-text-primary)]">
              {demoMode ? 'Observaciones de ejemplo' : 'Observaciones registradas'}
            </h3>
            <p className="mt-0.5 text-[10px] text-[var(--sa-muted)]">
              {demoMode
                ? 'Los cambios se conservan sólo durante esta vista de desarrollo.'
                : 'Total de registros disponibles en esta vista.'}
            </p>
          </div>
        </div>

        <div className="sa-no-print flex flex-wrap gap-2 sm:ml-auto">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 text-[10px] font-bold text-[var(--color-text-primary)] hover:brightness-95"
          >
            <Icon name={summary.print.icon} size={13} color="currentColor" />
            {summary.print.label}
          </button>
          <button
            type="button"
            onClick={() => void handleShare()}
            className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-lg bg-[var(--sa-slate)] px-3 text-[10px] font-bold text-[var(--sa-on-accent)] hover:brightness-95"
          >
            <Icon name={summary.share.icon} size={13} color="currentColor" />
            {summary.share.label}
          </button>
        </div>
      </div>
      {shareMessage ? <p role="status" className="mt-2 text-xs text-[var(--sa-muted)]">{shareMessage}</p> : null}
    </article>
  )
}
