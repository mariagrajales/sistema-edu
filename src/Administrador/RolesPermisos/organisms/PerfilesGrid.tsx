import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { perfiles } from '../constants/perfiles'

export function PerfilesGrid() {
  return (
    <section className='flex flex-col gap-4'>
      <header className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h2 className='text-xl font-extrabold text-[var(--sa-title)]'>Perfiles y Niveles de Seguridad</h2>
          <p className='text-sm text-[var(--sa-muted)]'>4 grupos de trabajo activos con 48 cuentas asignadas en el plantel</p>
        </div>
        <span className='rounded-full bg-[color-mix(in_srgb,var(--color-forest)_16%,transparent)] px-3 py-1 text-xs font-bold text-[var(--color-forest)]'>100% Cuentas Verificadas</span>
      </header>
      <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-4'>
        {perfiles.map((p) => (
          <article key={p.id} className='flex min-h-[180px] h-full flex-col rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm xl:aspect-square'>
            <div className='flex min-h-0 flex-1 flex-col gap-3 p-4'>
              <div className='flex items-center justify-between gap-2'>
                <div className='flex h-10 w-10 shrink-0 aspect-square items-center justify-center rounded-full bg-[var(--sa-field)] text-[var(--color-forest)]'>
                  <Icon name={p.icono as any} size={18} />
                </div>
                <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-bold', p.nivelColor)}>{p.nivel}</span>
              </div>
              <div className='min-w-0'>
                <h3 className='text-lg leading-tight font-extrabold text-[var(--sa-title)]'>{p.nombre}</h3>
                <p className='mt-0.5 text-xs text-[var(--sa-muted)]'>{p.usuarios} usuarios</p>
              </div>
              <p className='line-clamp-3 text-sm leading-relaxed text-[var(--sa-text)]'>{p.descripcion}</p>
            </div>
            <div className='mt-auto flex items-center justify-between gap-2 border-t border-[var(--sa-border)] px-4 py-3'>
              <div className='flex min-w-0 items-center gap-1.5 rounded-full bg-[var(--sa-field)] px-2.5 py-1 text-xs font-semibold'>
                <Icon name={p.pieIcono as any} size={14} className='shrink-0' />
                <span>{p.pieChip}</span>
              </div>
              <button type='button' className='shrink-0 text-xs font-bold text-[var(--color-forest)] hover:underline'>Editar ›</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
