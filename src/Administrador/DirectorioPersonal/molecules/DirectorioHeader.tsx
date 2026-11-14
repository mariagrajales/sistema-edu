import { Icon } from '../../../utils/atoms/Icon'

interface DirectorioHeaderProps {
  onAlta: () => void
}

export function DirectorioHeader({ onAlta }: DirectorioHeaderProps) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 shadow-sm sm:p-5 lg:px-6'>
      <div className='flex min-w-0 items-start gap-3 sm:gap-4'>
        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-forest)] text-[var(--sa-on-accent)] sm:h-14 sm:w-14'>
          <Icon name='shield' size={22} />
        </div>
        <div className='min-w-0'>
          <p className='text-[10px] font-bold uppercase tracking-wide text-[var(--sa-muted)] sm:text-xs'>MÓDULO DE GOBERNANZA INSTITUCIONAL</p>
          <h1 className='mt-1 text-2xl leading-tight font-extrabold text-[var(--sa-title)] sm:text-3xl lg:text-4xl'>Directorio de Personal y Control de Accesos</h1>
          <p className='mt-2 text-sm leading-relaxed text-[var(--sa-muted)]'>Administración centralizada de cuentas del personal docente, psicología SEE, prefectura y servicios académicos.</p>
        </div>
      </div>
      <div className='flex w-full flex-wrap items-center gap-2 sm:w-auto'>
        <button type='button' className='inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[var(--sa-border)] px-2.5 text-xs font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='file-text' size={14} />
          Historial de Auditoría
        </button>
        <button type='button' className='inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[var(--sa-border)] px-2.5 text-xs font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='download' size={14} />
          Exportar Padrón
        </button>
        <button type='button' onClick={onAlta} className='inline-flex min-h-8 items-center gap-1.5 rounded-lg bg-[var(--color-forest)] px-2.5 text-[11px] font-bold text-[var(--sa-on-accent)] hover:brightness-95'>
          <Icon name='plus' size={13} />
          Registrar Nuevo Usuario
        </button>
      </div>
    </div>
  )
}
