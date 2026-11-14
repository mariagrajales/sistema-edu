import { Fragment, useEffect, useState } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { eventosConfiguracion, suscribirAuditoria } from '../../ConfiguracionPlantel/services/auditoriaService'
import { eventos } from '../constants/eventos'

const hoverCelda =
  'group/celda rounded-lg border border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:bg-[var(--sa-field)] hover:shadow-sm'

const hoverTexto = 'transition-colors duration-200 group-hover/celda:text-[var(--color-forest)]'
const hoverIcono = 'shrink-0 transition-transform duration-200 group-hover/celda:scale-110'

export function BitacoraTabla() {
  const [expandido, setExpandido] = useState<string | null>(null)
  const [dinamicos, setDinamicos] = useState(eventosConfiguracion)

  useEffect(() => suscribirAuditoria(() => setDinamicos(eventosConfiguracion())), [])

  const registros = [...dinamicos, ...eventos]

  return (
    <section className='rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
      <header className='flex flex-wrap items-center justify-between gap-3 border-b border-[var(--sa-border)] px-4 py-3 sm:px-5'>
        <div className='flex items-center gap-3'>
          <div className='flex h-9 w-9 shrink-0 aspect-square items-center justify-center rounded-full bg-[var(--sa-field)] text-[var(--color-forest)]'>
            <Icon name='list-checks' size={17} />
          </div>
          <div>
            <h2 className='text-lg font-extrabold text-[var(--sa-title)]'>Registros Forenses en Vivo</h2>
            <p className='text-xs text-[var(--sa-muted)]'>{registros.length} eventos desplegados</p>
          </div>
        </div>
        <div className='flex items-center gap-2 text-[11px] font-semibold text-[var(--color-forest)]'>
          <span className='h-2 w-2 rounded-full bg-[var(--color-forest)]' />
          <span>Recepción de Syslog Escolar Activa</span>
        </div>
      </header>
      <div className='overflow-x-auto'>
        <table className='min-w-[1300px] w-full text-sm'>
          <thead>
            <tr className='border-b border-[var(--sa-border)] bg-[var(--sa-field)]'>
              <th className='sticky left-0 z-10 min-w-[160px] bg-[var(--sa-field)] px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--sa-muted)]'>FECHA Y HORA</th>
              <th className='min-w-[230px] px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--sa-muted)]'>USUARIO / RESPONSABLE</th>
              <th className='min-w-[170px] px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--sa-muted)]'>ROL INSTITUCIONAL</th>
              <th className='min-w-[230px] px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--sa-muted)]'>ACCIÓN REALIZADA</th>
              <th className='min-w-[270px] px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--sa-muted)]'>MÓDULO / OBJETO AFECTADO</th>
              <th className='min-w-[170px] px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--sa-muted)]'>INTEGRIDAD</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((e) => {
              const critica = e.severidad === 'critica'
              return (
                <Fragment key={e.id}>
                  <tr
                    className={cn(
                      'group border-b border-[var(--sa-border)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--color-forest)_5%,transparent)]',
                      critica ? 'bg-[color-mix(in_srgb,#D64545_8%,transparent)]' : ''
                    )}
                  >
                    <td className='sticky left-0 z-10 bg-[var(--sa-card)] px-5 py-3 transition-colors duration-200 group-hover:bg-[color-mix(in_srgb,var(--color-forest)_5%,var(--sa-card))]'>
                      <div className={cn('flex flex-col px-2 py-1', hoverCelda)}>
                        <p className={cn('flex items-center gap-1.5 font-bold', hoverTexto)}>
                          <Icon name='calendar' size={14} className={cn(hoverIcono, 'text-[var(--color-forest)]')} />
                          {e.fechaRelativa}
                        </p>
                        <p className='pl-5 text-xs text-[var(--sa-muted)]'>{e.fechaAbsoluta}</p>
                      </div>
                    </td>
                    <td className='px-5 py-3'>
                      <div className={cn('flex items-center gap-2 px-2 py-1', hoverCelda)}>
                        <div className='flex h-8 w-8 shrink-0 aspect-square items-center justify-center rounded-full bg-[var(--sa-field)] text-[11px] font-bold text-[var(--color-forest)] transition-transform duration-200 group-hover/celda:scale-105'>{e.actor.nombre.split(' ').slice(0, 2).map((n) => n[0]).join('')}</div>
                        <div>
                          <p className={cn('whitespace-nowrap text-[13px] font-bold', hoverTexto)}>{e.actor.nombre}</p>
                          {e.actor.empleadoId ? <p className='flex items-center gap-1 text-xs text-[var(--sa-muted)]'><Icon name='id-card' size={13} className={hoverIcono} />ID: {e.actor.empleadoId}</p> : <p className='flex items-center gap-1 text-xs text-[var(--sa-muted)]'><Icon name='info' size={13} className={hoverIcono} />Origen: No identificado</p>}
                        </div>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-5 py-3'>
                      {critica ? (
                        <span className='inline-flex items-center gap-1.5 rounded-full border border-transparent bg-[color-mix(in_srgb,#D64545_16%,transparent)] px-3 py-1 text-xs font-bold text-[#D64545] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:shadow-sm'>
                          <Icon name='alert-triangle' size={14} className='shrink-0' />
                          {e.actor.rol}
                        </span>
                      ) : (
                        <span className='inline-flex items-center gap-1.5 rounded-full border border-transparent bg-[var(--sa-field)] px-3 py-1 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:shadow-sm'>
                          <Icon name='user-cog' size={14} className='shrink-0 text-[var(--color-forest)]' />
                          {e.actor.rol}
                        </span>
                      )}
                    </td>
                    <td className='px-5 py-3'>
                      <div className={cn('flex items-start gap-1.5 px-2 py-1', hoverCelda)}>
                        <Icon name={critica ? 'alert-triangle' : 'zap'} size={14} className={cn(hoverIcono, critica ? 'text-[#D64545]' : 'text-[var(--color-forest)]')} />
                        <p className={cn('text-[13px] leading-snug', hoverTexto)}>{e.accion}</p>
                      </div>
                    </td>
                    <td className='px-5 py-3'>
                      <div className={cn('flex flex-col px-2 py-1', hoverCelda)}>
                        <p className={cn('flex items-center gap-1.5 text-[13px] font-bold', hoverTexto)}>
                          <Icon name='folder' size={14} className={cn(hoverIcono, 'text-[var(--color-forest)]')} />
                          {e.objeto.titulo}
                        </p>
                        <p className='pl-5 text-xs text-[var(--sa-muted)]'>{e.objeto.detalle}</p>
                        <p className='pl-5 text-xs text-[var(--sa-muted)]'>{e.modulo}</p>
                      </div>
                    </td>
                    <td className='px-5 py-3'>
                      <button
                        type='button'
                        onClick={() => setExpandido(expandido === e.id ? null : e.id)}
                        title='Ver detalle de integridad'
                        className='group/celda flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border border-transparent px-3 py-2 font-mono text-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:bg-[var(--sa-field)] hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
                      >
                        <Icon name='shield-check' size={15} className={cn(hoverIcono, 'text-[var(--color-forest)]')} />
                        <span className={hoverTexto}>{e.hash}</span>
                        <Icon name='clipboard' size={14} className={cn(hoverIcono, 'text-[var(--sa-muted)]')} />
                      </button>
                    </td>
                  </tr>
                  {expandido === e.id ? (
                    <tr className='bg-[var(--sa-field)]'>
                      <td colSpan={6} className='px-6 py-3'>
                        <div className='grid gap-2 text-xs sm:grid-cols-2 lg:grid-cols-4'>
                          <p><span className='font-semibold'>Hash previo:</span> <span className='font-mono'>{e.hashPrevio}</span></p>
                          <p><span className='font-semibold'>Hash actual:</span> <span className='font-mono'>{e.hash}</span></p>
                          <p><span className='font-semibold'>Resultado:</span> {e.resultado}</p>
                          <p><span className='font-semibold'>Severidad:</span> {e.severidad}</p>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
      <footer className='flex flex-wrap items-center justify-between gap-3 border-t border-[var(--sa-border)] px-4 py-3'>
        <p className='flex items-center gap-2 text-[13px] text-[var(--sa-muted)]'>
          <Icon name='folder' size={15} />
          Mostrando 1 - 5 de 216 registros forenses sincronizados
        </p>
        <div className='flex items-center gap-2'>
          <button className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--sa-border)] transition-colors hover:bg-[var(--sa-field)]'>‹</button>
          <button className='inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-forest)] text-[var(--sa-on-accent)]'>1</button>
          <button className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--sa-border)] transition-colors hover:bg-[var(--sa-field)]'>2</button>
          <button className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--sa-border)] transition-colors hover:bg-[var(--sa-field)]'>3</button>
          <span className='px-2'>…</span>
          <button className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--sa-border)] transition-colors hover:bg-[var(--sa-field)]'>44</button>
          <button className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--sa-border)] transition-colors hover:bg-[var(--sa-field)]'>›</button>
        </div>
      </footer>
    </section>
  )
}
