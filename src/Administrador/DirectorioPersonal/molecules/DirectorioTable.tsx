import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { Colaborador } from '../constants/directorio'

interface DirectorioTableProps {
  colaboradores: Colaborador[]
  busqueda: string
  onBuscar: (value: string) => void
}

const hoverCelda =
  'group/celda rounded-lg border border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:bg-[var(--sa-field)] hover:shadow-sm'

const hoverTexto = 'transition-colors duration-200 group-hover/celda:text-[var(--color-forest)]'
const hoverIcono = 'shrink-0 transition-transform duration-200 group-hover/celda:scale-110'

export function DirectorioTable({ colaboradores, busqueda, onBuscar }: DirectorioTableProps) {
  return (
    <section className='rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
      <header className='flex flex-wrap items-center justify-between gap-3 border-b border-[var(--sa-border)] px-4 py-3 sm:px-5'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 shrink-0 aspect-square items-center justify-center rounded-full bg-[var(--sa-field)] text-[var(--color-forest)]'>
            <Icon name='users' size={18} />
          </div>
          <div>
            <h2 className='text-lg font-extrabold text-[var(--sa-text)]'>Listado de Colaboradores</h2>
            <p className='text-xs text-[var(--sa-muted)]'>Directorio institucional con control de acceso y estado de cuenta</p>
          </div>
        </div>
        <div className='flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end'>
          <label className='directory-search-control flex h-9 min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 sm:flex-none'>
            <Icon name='search' size={14} color='var(--sa-muted)' />
            <input
              value={busqueda}
              onChange={(event) => onBuscar(event.target.value)}
              placeholder='Buscar colaborador, rol o correo'
              aria-label='Buscar colaboradores por nombre, rol o correo'
              className='directory-search-input h-full w-full min-w-0 bg-transparent placeholder:text-[var(--sa-muted)]'
            />
          </label>
          <span className='rounded-full bg-[var(--sa-field)] px-3 py-1 text-xs font-semibold text-[var(--sa-muted)]'>{colaboradores.length} resultados</span>
        </div>
      </header>
      <div className='overflow-x-auto'>
        <table className='min-w-[920px] text-sm'>
          <thead>
            <tr className='border-b border-[var(--sa-border)] bg-[var(--sa-field)]'>
              <th className='whitespace-nowrap px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Colaborador</th>
              <th className='whitespace-nowrap px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Rol / Departamento</th>
              <th className='whitespace-nowrap px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Correo Institucional</th>
              <th className='whitespace-nowrap px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Último Acceso</th>
              <th className='whitespace-nowrap px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Turno</th>
              <th className='whitespace-nowrap px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Estado</th>
              <th className='whitespace-nowrap px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {colaboradores.map((c) => {
              const bloqueado = c.estado === 'Bloqueado'
              return (
                <tr
                  key={c.id}
                  className={cn(
                    'group border-b border-[var(--sa-border)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--color-forest)_5%,transparent)]',
                    bloqueado ? 'bg-[color-mix(in_srgb,#FAD9D9_40%,transparent)]' : ''
                  )}
                >
                  <td className='whitespace-nowrap px-4 py-2.5'>
                    <div className={cn('flex min-h-12 items-center gap-3 px-2 py-1', hoverCelda)}>
                      <div className='flex h-9 w-9 shrink-0 aspect-square items-center justify-center rounded-full bg-[var(--color-forest)] text-xs font-bold text-[var(--sa-on-accent)] transition-transform duration-200 group-hover/celda:scale-105'>{c.nombre.split(' ').slice(0, 2).map((n) => n[0]).join('')}</div>
                      <div>
                        <p className={cn('text-[13px] font-semibold text-[var(--sa-text)]', hoverTexto)}>{c.nombre}</p>
                        <p className='flex items-center gap-1 text-[11px] text-[var(--sa-muted)]'>
                          <Icon name='id-card' size={13} className={hoverIcono} />
                          ID: {c.id.padStart(6, '0')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='whitespace-nowrap px-4 py-2.5'>
                    <div className={cn('flex flex-col px-2 py-1', hoverCelda)}>
                      <p className={cn('flex items-center gap-1.5 text-[13px] font-semibold', hoverTexto)}>
                        <Icon name='briefcase-medical' size={14} className={cn(hoverIcono, 'text-[var(--color-forest)]')} />
                        {c.rol}
                      </p>
                      <p className='text-[11px] text-[var(--sa-muted)]'>{c.departamento}</p>
                    </div>
                  </td>
                  <td className='whitespace-nowrap px-4 py-2.5'>
                    <div className={cn('inline-flex items-center gap-1.5 px-2 py-1', hoverCelda)}>
                      <Icon name='mail' size={14} className={cn(hoverIcono, 'text-[var(--sa-muted)]')} />
                      <span className={cn('text-xs', hoverTexto)}>{c.correo}</span>
                    </div>
                  </td>
                  <td className='whitespace-nowrap px-4 py-2.5 text-[var(--sa-muted)]'>
                    <div className={cn('inline-flex items-center gap-1.5 px-2 py-1', hoverCelda)}>
                      <Icon name='clock' size={14} className={hoverIcono} />
                      <span className={cn('text-xs', hoverTexto)}>{c.ultimoAcceso}</span>
                    </div>
                  </td>
                  <td className='whitespace-nowrap px-4 py-2.5'>
                    <div className={cn('inline-flex items-center gap-1.5 px-2 py-1', hoverCelda)}>
                      <Icon name='calendar' size={14} className={cn(hoverIcono, 'text-[var(--sa-muted)]')} />
                      <span className={cn('text-xs', hoverTexto)}>{c.turno}</span>
                    </div>
                  </td>
                  <td className='whitespace-nowrap px-4 py-2.5'>
                    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm', bloqueado ? 'bg-[color-mix(in_srgb,#D64545_16%,transparent)] text-[#D64545]' : 'bg-[color-mix(in_srgb,var(--color-forest)_16%,transparent)] text-[var(--color-forest)]')}>
                      <Icon name={bloqueado ? 'circle-x' : 'circle-check'} size={13} className='shrink-0' />
                      {c.estado}
                    </span>
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 text-right'>
                    <button
                      type='button'
                      title='Más acciones'
                      aria-label={`Más acciones para ${c.nombre}`}
                      className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:bg-[var(--sa-field)] hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
                    >
                      <Icon name='more-horizontal' size={18} className='transition-transform duration-200 group-hover:scale-110' />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
