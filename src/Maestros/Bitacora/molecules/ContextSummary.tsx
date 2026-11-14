import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { observacionModal } from '../constants/observacionModal'
import type { BitacoraAlumno } from '../types'

interface ContextSummaryProps {
  alumno: BitacoraAlumno
  large?: boolean
  demoMode?: boolean
}

export function ContextSummary({ alumno, large, demoMode = false }: ContextSummaryProps) {
  const { context } = observacionModal
  const enrollment = alumno.chips.find((chip) => chip.label.startsWith('Matrícula'))?.label

  return (
    <div
      className={cn(
        'grid grid-cols-1 rounded-2xl bg-[var(--sa-context)] md:grid-cols-2',
        large ? 'gap-4 p-4' : 'gap-4 p-5'
      )}
    >
      <div className={cn('flex items-center', large ? 'gap-5' : 'gap-4')}>
        <span
          className={cn(
            'flex shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-forest)] font-extrabold text-[var(--sa-on-accent)]',
            large ? 'h-14 w-14 text-lg' : 'h-14 w-14 text-lg'
          )}
        >
          {alumno.initials}
        </span>
        <div className="min-w-0">
          <p
            className={cn(
              'font-extrabold tracking-wide text-[var(--sa-accent)] uppercase',
              large ? 'text-[13px]' : 'text-[13px]'
            )}
          >
            {context.studentLabel}
          </p>
          <p
            className={cn(
              'truncate font-bold text-[var(--color-text-primary)]',
              large ? 'text-base' : 'text-base'
            )}
            title={alumno.name}
          >
            {alumno.name}
          </p>
          <p
            className={cn(
              'mt-1 flex flex-wrap items-center gap-2 text-[var(--sa-muted)]',
              large ? 'text-sm' : 'text-base'
            )}
          >
            <span className="font-semibold">{alumno.grupo} ·</span>
            <span
              className={cn(
                'rounded-full bg-[var(--sa-chip-gray)] font-bold text-[var(--sa-chip-gray-text)]',
                large ? 'px-2.5 py-1 text-xs' : 'px-2.5 py-1 text-[13px]'
              )}
            >
              {enrollment ?? context.matricula}
            </span>
          </p>
        </div>
      </div>

      <div className={cn('flex items-center rounded-xl bg-[var(--sa-card)]', large ? 'gap-3 px-4 py-3' : 'gap-3 px-4 py-3')}>
        <Icon name={context.specialistIcon} size={large ? 22 : 24} color="var(--sa-steel)" />
        <div className="min-w-0">
          <p
            className={cn(
              'font-extrabold tracking-wide text-[var(--sa-steel)] uppercase',
              large ? 'text-[13px]' : 'text-[13px]'
            )}
          >
            {context.specialistLabel}
          </p>
          <p
            className={cn(
              'truncate font-bold text-[var(--color-text-primary)]',
              large ? 'text-sm' : 'text-base'
            )}
          >
            {demoMode ? 'Especialista de ejemplo' : context.specialistName}
          </p>
          <p className={cn('truncate text-[var(--sa-muted)]', large ? 'text-xs' : 'text-base')}>
            {demoMode ? 'Dato ficticio de demostración' : context.specialistArea}
          </p>
        </div>
      </div>
    </div>
  )
}
