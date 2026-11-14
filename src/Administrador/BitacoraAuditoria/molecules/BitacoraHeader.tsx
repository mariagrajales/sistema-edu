import { Icon } from '../../../utils/atoms/Icon'

interface BitacoraHeaderProps {
  onFiltrarFechas: () => void
  onEventoCritico: () => void
  onExportar: () => void
  onActa: () => void
}

export function BitacoraHeader({ onFiltrarFechas, onEventoCritico, onExportar, onActa }: BitacoraHeaderProps) {
  return (
    <div className='flex flex-wrap items-start justify-between gap-4'>
      <div className='flex min-w-0 flex-col gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='flex items-center gap-1.5 rounded-full bg-[color-mix(in_srgb,var(--color-forest)_16%,transparent)] px-3 py-1 text-[10px] font-bold text-[var(--color-forest)]'>
            <Icon name='shield-check' size={14} />
            <span>CADENA CRIPTOGRÁFICA SHA-256 VERIFICADA</span>
          </div>
          <button type='button' className='flex items-center gap-1.5 rounded-full border border-[var(--sa-border)] px-3 py-1 text-[10px] font-semibold'>
            <span className='font-mono'>FOLIO INMUTABLE #2024-AUD-9941</span>
            <Icon name='folder' size={13} />
          </button>
        </div>
        <h1 className='text-2xl leading-tight font-extrabold text-[var(--sa-title)] sm:text-3xl'>Bitácora de Auditoría y Seguridad del Sistema</h1>
        <p className='max-w-[100ch] text-sm leading-relaxed text-[var(--sa-muted)]'>Registro cronológico e inmutable de eventos de acceso, modificaciones de expedientes clínicos confidenciales y alertas de seguridad en tiempo real para el resguardo de la comunidad escolar.</p>
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <button type='button' onClick={onFiltrarFechas} className='inline-flex min-h-9 items-center gap-2 rounded-lg border border-[var(--sa-border)] px-3 text-xs font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='calendar' size={16} />
          Filtrar por Fechas
        </button>
        <button type='button' onClick={onEventoCritico} className='inline-flex min-h-9 items-center gap-2 rounded-lg border border-[var(--sa-border)] px-3 text-xs font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='alert-triangle' size={16} />
          Evento Crítico
        </button>
        <button type='button' onClick={onExportar} className='inline-flex min-h-9 items-center gap-2 rounded-lg border border-[var(--sa-border)] px-3 text-xs font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='download' size={16} />
          Exportar (CSV/XLS)
        </button>
        <button type='button' onClick={onActa} className='inline-flex min-h-9 items-center gap-2 rounded-lg bg-[var(--color-forest)] px-3 text-xs font-bold text-[var(--sa-on-accent)] hover:brightness-95'>
          <Icon name='shield' size={16} />
          Acta Cifrada Supervisión SEP
        </button>
      </div>
    </div>
  )
}
