import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { Chip } from '../../shared/atoms/Chip'
import { IconTile } from '../../shared/atoms/IconTile'
import { RichText } from './RichText'
import type { HighlightTone, Observacion } from '../types'

const linkToneClasses: Record<HighlightTone, string> = {
  forest: 'text-[var(--sa-accent)]',
  steel: 'text-[var(--sa-steel)]',
  coffee: 'text-[var(--sa-coffee)]',
}

interface TimelineEntryProps {
  observacion: Observacion
}

export function TimelineEntry({ observacion }: TimelineEntryProps) {
  const { categoria, link } = observacion

  return (
    <article className="rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-3 shadow-[var(--shadow-sm)] sm:p-3.5">
      <div className="flex items-start gap-2.5">
        <IconTile icon={observacion.icon} tone={observacion.tone} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-extrabold text-[var(--color-text-primary)]">
                <Icon name={observacion.materiaIcon} size={13} color="var(--sa-accent)" />{' '}
                {observacion.materia}
              </p>
              <p className="mt-0.5 truncate text-[10px] font-medium text-[var(--sa-muted)]">
                {observacion.docente}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[10px] font-bold text-[var(--color-text-primary)]">
                {observacion.fecha} · {observacion.hora}
              </p>
              <p className="mt-0.5 text-[9px] text-[var(--sa-muted)]">{observacion.lugar}</p>
            </div>
          </div>

          <div className="mt-1.5">
            <Chip label={categoria.label} icon={categoria.icon} tone={categoria.tone} />
          </div>

          <div className="mt-2 rounded-lg bg-[var(--sa-field)] px-3 py-2">
            <RichText segments={observacion.nota} className="text-xs leading-relaxed" />
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[9px] font-bold text-[var(--sa-muted)]">
                {observacion.chipsLabel}
              </span>
              {observacion.chips.map((chip) => (
                <Chip key={chip} label={chip} tone="neutral" />
              ))}
            </div>
            <button
              type="button"
              className={cn(
                'inline-flex min-h-7 items-center gap-1 text-[10px] font-bold',
                linkToneClasses[link.tone ?? 'forest']
              )}
            >
              <Icon name={link.icon} size={12} color="currentColor" />
              {link.label}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
