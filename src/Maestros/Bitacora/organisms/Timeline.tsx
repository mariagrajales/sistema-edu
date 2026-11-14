import { Fragment } from 'react'
import { TimelineEntry } from '../molecules/TimelineEntry'
import type { Observacion } from '../types'

interface TimelineProps {
  observaciones: Observacion[]
}

export function Timeline({ observaciones }: TimelineProps) {
  if (observaciones.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--sa-border)] bg-[var(--sa-card)] p-6 text-center text-sm font-semibold text-[var(--sa-muted)]">
        No hay observaciones registradas para esta asignatura.
      </div>
    )
  }

  return (
    <div className="relative flex flex-col gap-y-8 pl-4 before:absolute before:bottom-3 before:left-[5px] before:top-3 before:w-px before:bg-[var(--sa-border)]">
      {observaciones.map((observacion) => (
        <Fragment key={observacion.id}>
          <div className="relative">
            <span
              className="absolute -left-[13px] top-4 z-10 h-2.5 w-2.5 rounded-full border border-[var(--sa-accent)] bg-[var(--sa-card)]"
              aria-hidden="true"
            />
            <TimelineEntry observacion={observacion} />
          </div>
        </Fragment>
      ))}
    </div>
  )
}
