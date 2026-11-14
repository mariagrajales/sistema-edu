import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'
import { modulos } from '../constants/matriz'

const etiquetas: Record<string, Record<string, { txt: string; tipo: string }>> = {
  padrón: {
    docente: { txt: 'Solo Asignados', tipo: 'consulta' },
    prefecto: { txt: 'Plantel Total', tipo: 'operacion' },
    servicios: { txt: 'Gestión Total', tipo: 'gestion' },
    psicologia: { txt: 'Acceso Completo', tipo: 'edicion' },
    administrador: { txt: 'Super Root', tipo: 'root' },
  },
  'expediente-clinico': {
    docente: { txt: 'Sin Acceso', tipo: 'ninguno' },
    prefecto: { txt: 'Sin Acceso', tipo: 'ninguno' },
    servicios: { txt: 'Sin Acceso', tipo: 'ninguno' },
    psicologia: { txt: 'Lectura / Edición', tipo: 'edicion' },
    administrador: { txt: 'Auditoría / Resp...', tipo: 'auditoria' },
  },
  'dictamen-dua': {
    docente: { txt: 'Solo Consulta', tipo: 'consulta' },
    prefecto: { txt: 'Sin Acceso', tipo: 'ninguno' },
    servicios: { txt: 'Solo Archivo', tipo: 'consulta' },
    psicologia: { txt: 'Firma Digital e.Firma', tipo: 'firma' },
    administrador: { txt: 'Visado Institucional', tipo: 'gestion' },
  },
  'bitacora-aula': {
    docente: { txt: 'Captura Diario', tipo: 'captura' },
    prefecto: { txt: 'Sin Acceso', tipo: 'ninguno' },
    servicios: { txt: 'Solo Consulta', tipo: 'consulta' },
    psicologia: { txt: 'Lectura y Feedback', tipo: 'consulta' },
    administrador: { txt: 'Acceso Completo', tipo: 'root' },
  },
  'pases-qr': {
    docente: { txt: 'Emite Pase', tipo: 'operacion' },
    prefecto: { txt: 'Escaneo Operativo', tipo: 'operacion' },
    servicios: { txt: 'Sin Acceso', tipo: 'ninguno' },
    psicologia: { txt: 'Monitor Métrico', tipo: 'consulta' },
    administrador: { txt: 'Acceso Completo', tipo: 'root' },
  },
  'alta-cotejo': {
    docente: { txt: 'Sin Acceso', tipo: 'ninguno' },
    prefecto: { txt: 'Sin Acceso', tipo: 'ninguno' },
    servicios: { txt: 'Cotejo Principal', tipo: 'operacion' },
    psicologia: { txt: 'Consulta Historial', tipo: 'consulta' },
    administrador: { txt: 'Aprobación Final', tipo: 'gestion' },
  },
  cuentas: {
    docente: { txt: 'Sin Acceso', tipo: 'ninguno' },
    prefecto: { txt: 'Sin Acceso', tipo: 'ninguno' },
    servicios: { txt: 'Sin Acceso', tipo: 'ninguno' },
    psicologia: { txt: 'Sin Acceso', tipo: 'ninguno' },
    administrador: { txt: 'Exclusivo Administrador', tipo: 'root' },
  },
  'concentrado-see': {
    docente: { txt: 'Sin Acceso', tipo: 'ninguno' },
    prefecto: { txt: 'Sin Acceso', tipo: 'ninguno' },
    servicios: { txt: 'Cierre Numérico', tipo: 'operacion' },
    psicologia: { txt: 'Firma Técnica SEE', tipo: 'firma' },
    administrador: { txt: 'Generación y Timbrado', tipo: 'root' },
  },
}

const iconosTipo: Record<string, IconName> = {
  ninguno: 'circle-x',
  consulta: 'eye',
  captura: 'pen',
  edicion: 'pen',
  operacion: 'zap',
  firma: 'file-signature',
  gestion: 'sliders',
  auditoria: 'search',
  root: 'shield-check',
}

const nombresTipo: Record<string, string> = {
  ninguno: 'Sin acceso',
  consulta: 'Solo consulta',
  captura: 'Captura diaria',
  edicion: 'Edición',
  operacion: 'Operación',
  firma: 'Firma digital',
  gestion: 'Gestión',
  auditoria: 'Auditoría',
  root: 'Control total',
}

const coloresTipo: Record<string, string> = {
  ninguno: 'text-[var(--sa-muted)]',
  consulta: 'text-[var(--sa-steel)]',
  captura: 'text-[var(--color-forest)]',
  edicion: 'text-[var(--color-forest)]',
  operacion: 'text-[var(--color-forest)]',
  firma: 'text-[var(--color-forest)]',
  gestion: 'text-[var(--sa-coffee)]',
  auditoria: 'text-[var(--sa-muted)]',
  root: 'text-[var(--color-forest)]',
}

const columnas = [
  { key: 'modulo', label: 'MÓDULO / CAPACIDAD DEL SISTEMA' },
  { key: 'docente', label: 'DOCENTE / MAESTRO' },
  { key: 'prefecto', label: 'PREFECTURA' },
  { key: 'servicios', label: 'SERVICIOS ACADÉMICOS' },
  { key: 'psicologia', label: 'PSICOLOGÍA SEE' },
  { key: 'administrador', label: 'ADMINISTRADOR GENERAL' },
]

export function MatrizPermisos() {
  return (
    <section className='flex flex-col gap-4'>
      <header className='flex flex-wrap items-center justify-between gap-3'>
        <div className='min-w-0'>
          <h2 className='text-xl font-extrabold text-[var(--sa-title)]'>Matriz Interactiva de Permisos por Módulo</h2>
          <p className='mt-1 max-w-[100ch] text-sm leading-relaxed text-[var(--sa-muted)]'>Haga clic en los conmutadores para modificar en tiempo real los accesos. Los cambios quedan registrados en la bitácora criptográfica.</p>
        </div>
        <div className='flex flex-wrap items-center gap-1.5'>
          <span className='text-xs font-semibold text-[var(--sa-muted)]'>Filtrar por:</span>
          <button type='button' className='rounded-full bg-[var(--color-forest)] px-3 py-1 text-xs font-bold text-[var(--sa-on-accent)]'>Todos (8 Módulos)</button>
          <button type='button' className='rounded-full border border-[var(--sa-border)] px-3 py-1 text-xs font-semibold'>Clínico & SEE</button>
          <button type='button' className='rounded-full border border-[var(--sa-border)] px-3 py-1 text-xs font-semibold'>Operativo & Aula</button>
          <button type='button' className='rounded-full border border-[var(--sa-border)] px-3 py-1 text-xs font-semibold'>Administrativo</button>
        </div>
      </header>
      <div className='overflow-x-auto rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
        <table className='min-w-[1180px] w-full text-[15px]'>
          <thead>
            <tr className='border-b border-[var(--sa-border)] bg-[var(--sa-field)]'>
              {columnas.map((c, idx) => (
                <th key={c.key} className={cn('whitespace-nowrap px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--sa-muted)]', idx === 0 ? 'sticky left-0 z-10 min-w-[280px] bg-[var(--sa-field)]' : 'min-w-[180px]')}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modulos.map((m) => (
              <tr key={m.id} className='group border-b border-[var(--sa-border)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--color-forest)_5%,transparent)]'>
                <td className='sticky left-0 z-10 bg-[var(--sa-card)] px-5 py-4 transition-colors duration-200 group-hover:bg-[color-mix(in_srgb,var(--color-forest)_5%,var(--sa-card))]'>
                  <div className='flex items-start gap-3'>
                    <div className='flex h-10 w-10 shrink-0 aspect-square items-center justify-center rounded-full bg-[var(--sa-field)] text-[var(--color-forest)] transition-all duration-200 group-hover:scale-105 group-hover:bg-[color-mix(in_srgb,var(--color-forest)_16%,transparent)]'>
                      <Icon name={m.icono} size={18} />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='cursor-default text-[15px] font-bold leading-snug underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-200 group-hover:text-[var(--color-forest)] group-hover:decoration-[var(--color-forest)]' title={m.descripcion}>
                        {m.nombre}
                      </p>
                      {m.chip ? <span className='w-fit rounded-full bg-[color-mix(in_srgb,#D64545_16%,transparent)] px-2 py-0.5 text-[11px] font-bold text-[#D64545]'>🔒 {m.chip}</span> : null}
                      <p className='flex items-start gap-1.5 text-xs leading-snug text-[var(--sa-muted)]'>
                        <Icon name='info' size={14} className='mt-0.5 shrink-0' />
                        <span className='transition-colors duration-200 group-hover:text-[var(--sa-text)]'>{m.descripcion}</span>
                      </p>
                    </div>
                  </div>
                </td>
                {(['docente', 'prefecto', 'servicios', 'psicologia', 'administrador'] as const).map((rol) => {
                  const e = etiquetas[m.id]?.[rol]
                  if (!e) return <td key={rol} className='px-5 py-4' />
                  return (
                    <td key={rol} className='px-5 py-4'>
                      <button
                        type='button'
                        title={`${e.txt} — ${nombresTipo[e.tipo] ?? e.tipo}`}
                        aria-label={`${e.txt}: ${nombresTipo[e.tipo] ?? e.tipo}`}
                        className={cn(
                          'group/boton flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-3 py-2 transition-all duration-200',
                          'hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:bg-[var(--sa-field)] hover:shadow-sm',
                          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]',
                          coloresTipo[e.tipo]
                        )}
                      >
                        <Icon name={iconosTipo[e.tipo]} size={17} className='shrink-0 transition-transform duration-200 group-hover/boton:scale-110' />
                        <span className='text-sm font-semibold transition-colors duration-200 group-hover/boton:text-[var(--color-forest)]'>{e.txt}</span>
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--sa-muted)]'>
        <p>Los permisos se actualizarán en cascada de forma inmediata para las sesiones activas vía WebSocket institucional.</p>
        <div className='flex items-center gap-3'>
          <span>Versión de esquema: v4.2-2024b</span>
          <button type='button' className='rounded-lg border border-[var(--sa-border)] px-3 py-1.5 font-semibold'>Guardar Copia Local</button>
        </div>
      </div>
    </section>
  )
}