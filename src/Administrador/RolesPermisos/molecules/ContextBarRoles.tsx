import { Icon } from '../../../utils/atoms/Icon'
import { escuela } from '../../../Portal/shared/constants/escuela'

interface ContextBarRolesProps {
  nivel?: string
  ultimaAuditoria?: string
}

export function ContextBarRoles({ nivel = 'Nivel Medio Superior', ultimaAuditoria = '28/10/2025 09:42' }: ContextBarRolesProps) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-4 py-3 shadow-sm'>
      <div className='flex min-w-0 items-center gap-3'>
        <div className='flex h-10 w-10 shrink-0 aspect-square items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-forest)_16%,transparent)] text-[var(--color-forest)]'>
          <Icon name='shield' size={18} />
        </div>
        <div>
          <p className='text-sm font-bold text-[var(--sa-title)]'>GOBERNANZA DUA & LGDNNA · SEP {nivel}</p>
          <p className='text-xs text-[var(--sa-muted)]'>Protocolo activo · Última auditoría de roles: {ultimaAuditoria}</p>
        </div>
      </div>
      <div className='flex flex-wrap items-center gap-3'>
        <span className='rounded-full border border-[var(--sa-border)] px-3 py-1 text-xs font-semibold'>Cifrado SHA-256</span>
        <span className='rounded-full border border-[var(--sa-border)] px-3 py-1 text-xs font-semibold'>Ciclo {escuela.ciclo}</span>
      </div>
    </div>
  )
}
