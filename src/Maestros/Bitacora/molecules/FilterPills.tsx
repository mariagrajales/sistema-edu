import { cn } from '../../../utils/cn'
import type { Filtro, FiltroId } from '../types'

interface FilterPillsProps {
  filters: Filtro[]
  active: FiltroId
  count: number
  onChange: (id: FiltroId) => void
}

export function FilterPills({ filters, active, count, onChange }: FilterPillsProps) {
  return (
    <div className="sa-no-print flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-bold tracking-wide text-[var(--sa-muted)] uppercase">
          Filtrar por asignatura:
        </span>
        {filters.map((filter) => {
          const isActive = filter.id === active
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(filter.id)}
              className={cn(
                'inline-flex min-h-8 items-center rounded-full px-2.5 text-[10px] font-bold transition-colors',
                isActive
                  ? 'bg-[var(--sa-slate)] text-[var(--sa-on-accent)] shadow-[var(--shadow-sm)]'
                  : 'border border-[var(--sa-border)] bg-[var(--sa-card)] text-[var(--color-text-primary)] hover:bg-[var(--sa-field)]'
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </div>
      <span className="text-[10px] font-medium text-[var(--sa-muted)]">
        {count} {count === 1 ? 'registro reciente visible' : 'registros recientes visibles'}
      </span>
    </div>
  )
}
