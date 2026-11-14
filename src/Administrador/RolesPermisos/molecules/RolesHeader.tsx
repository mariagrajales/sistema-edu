import { Icon } from '../../../utils/atoms/Icon'

interface RolesHeaderProps {
  onNuevo: () => void
}

export function RolesHeader({ onNuevo }: RolesHeaderProps) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <div>
        <nav className='flex items-center gap-2 text-xs text-[var(--sa-muted)]'>
          <span>ADMINISTRACIÓN GENERAL</span>
          <span>›</span>
          <span>Control de Accesos</span>
        </nav>
        <h1 className='mt-1 text-[28px] leading-tight font-extrabold text-[var(--sa-title)]'>Matriz Institucional de Roles y Permisos</h1>
        <p className='mt-1 max-w-[100ch] text-sm leading-relaxed text-[var(--sa-muted)]'>Definición de privilegios, niveles de confidencialidad médica/psicopedagógica y accesos operativos según el marco DUA (Diseño Universal para el Aprendizaje) y normativas federales SEP/LGDNNA.</p>
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <button type='button' className='inline-flex min-h-9 items-center gap-2 rounded-lg border border-[var(--sa-border)] px-3 text-xs font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='refresh' size={16} />
          Restablecer Defecto
        </button>
        <button type='button' className='inline-flex min-h-9 items-center gap-2 rounded-lg border border-[var(--sa-border)] px-3 text-xs font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='download' size={16} />
          Exportar PDF
        </button>
        <button type='button' onClick={onNuevo} className='inline-flex min-h-8 items-center gap-1.5 rounded-lg bg-[var(--color-forest)] px-2.5 text-[11px] font-bold text-[var(--sa-on-accent)] hover:brightness-95'>
          <Icon name='plus' size={14} />
          Crear Nuevo Perfil
        </button>
      </div>
    </div>
  )
}
