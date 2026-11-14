import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../shared/atoms/Chip'
import type { BitacoraAlumno } from '../types'

interface ProfileCardProps {
  alumno: BitacoraAlumno
}

export function ProfileCard({ alumno }: ProfileCardProps) {
  return (
    <article className="rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-3.5 shadow-[var(--shadow-sm)] sm:px-4 sm:py-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[var(--sa-avatar)] text-base font-extrabold text-white">
              {alumno.initials}
            </span>
          </div>
          <div className="min-w-0">
            <h2
              className="truncate text-base font-extrabold text-[var(--color-text-primary)]"
              title={alumno.name}
            >
              {alumno.name}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <p className="text-xs font-medium text-[var(--sa-muted)]">{alumno.grupo}</p>
              <span className="rounded-full bg-[var(--sa-menta-soft)] px-2 py-0.5 text-[9px] font-bold text-[var(--sa-accent)]">
                {alumno.duaTag}
              </span>
              {alumno.chips.map((chip) => (
                <Chip key={chip.label} label={chip.label} tone={chip.tone} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 rounded-lg bg-[var(--sa-field)] px-3 py-2 sm:grid-cols-2 sm:gap-4 lg:ml-auto">
          {alumno.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[10px] font-bold tracking-wide text-[var(--sa-muted)] uppercase">
                {stat.label}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-xs font-bold text-[var(--color-text-primary)]">
                {stat.check ? (
                  <Icon name="check" size={13} color="var(--sa-accent)" />
                ) : null}
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
