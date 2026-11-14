import { Icon } from '../../../utils/atoms/Icon'

export function ContextBarIntegridad() {
  return (
    <div className='flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--sa-border)] bg-[color-mix(in_srgb,var(--sa-steel)_10%,transparent)] px-4 py-3 shadow-sm'>
      <div className='flex min-w-0 items-center gap-3'>
        <div className='flex h-9 w-9 shrink-0 aspect-square items-center justify-center rounded-full bg-[var(--color-forest)] text-[var(--sa-on-accent)]'>
          <Icon name='lock' size={17} />
        </div>
        <div>
          <p className='text-sm font-bold text-[var(--sa-title)]'>Cifrado en Reposo y en Tránsito (AES-256-GCM)</p>
          <p className='text-xs text-[var(--sa-muted)]'>Cada consulta a expedientes psicopedagógicos firma un bloque criptográfico individual no repudiable.</p>
        </div>
      </div>
      <div className='text-[11px] text-[var(--sa-muted)]'>Última réplica: 09:44:12 hrs (Hace 2 min)</div>
    </div>
  )
}
