import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { rolesColaborador } from '../constants/roles'

interface RolAsignacionProps {
  rolSeleccionado: string
  onSelect: (id: any) => void
}

export function RolAsignacion({ rolSeleccionado, onSelect }: RolAsignacionProps) {
  return (
    <section className='min-w-0 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
      <header className='flex items-center gap-3 border-b border-[var(--sa-border)] px-4 py-3'>
        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-sm font-bold text-[var(--sa-on-accent)]'>3</span>
        <h2 className='text-lg font-bold text-[var(--sa-title)]'>Asignación de Rol Institucional</h2>
      </header>
      <div className='grid min-w-0 gap-3 px-4 py-4 sm:grid-cols-2 lg:grid-cols-4'>
        {rolesColaborador.map((r) => (
          <button
            key={r.id}
            type='button'
            onClick={() => onSelect(r.id)}
            className={cn('flex min-w-0 flex-col items-start gap-2 rounded-lg border p-3 text-left', rolSeleccionado === r.id ? 'border-[var(--color-forest)] bg-[color-mix(in_srgb,var(--color-forest)_12%,transparent)]' : 'border-[var(--sa-border)] hover:bg-[var(--sa-field)]')}
          >
            <div className='flex min-w-0 items-center gap-2'>
              <span className='flex h-8 w-8 shrink-0 aspect-square items-center justify-center rounded-full bg-[var(--sa-field)] text-[var(--color-forest)]'>
                <Icon name={r.icon as any} size={18} className='shrink-0' />
              </span>
              <p className='text-sm font-bold text-[var(--sa-text)]'>{r.titulo}</p>
            </div>
            <p className='text-xs text-[var(--sa-muted)]'>{r.desc}</p>
            <div className='flex min-w-0 flex-wrap gap-1.5'>
              {r.permisos.map((p) => (
                <span key={p} className='rounded-full bg-[var(--sa-chip-gray)] px-2 py-0.5 text-[10px] text-[var(--sa-muted)]'>{p}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
