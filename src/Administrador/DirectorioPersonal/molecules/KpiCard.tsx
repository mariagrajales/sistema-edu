import { Icon } from '../../../utils/atoms/Icon'

interface KpiCardProps {
  label: string
  valor: number
  desc: string
  icon: string
  color: string
}

export function KpiCard({ label, valor, desc, icon, color }: KpiCardProps) {
  return (
    <div className='flex aspect-square min-h-0 min-w-0 flex-col items-center justify-center gap-1 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-1.5 py-2 text-center shadow-sm sm:gap-1.5 sm:px-2 sm:py-3'>
      <div className={`flex h-8 w-8 shrink-0 aspect-square items-center justify-center rounded-full sm:h-9 sm:w-9 ${color}`}>
        <Icon name={icon as any} size={18} />
      </div>
      <div className='flex min-w-0 flex-col items-center'>
        <p className='flex min-h-6 items-center justify-center text-[11px] leading-tight text-[var(--sa-muted)] sm:min-h-7 sm:text-xs'>{label}</p>
        <p className='text-2xl leading-none font-extrabold text-[var(--sa-text)] sm:text-3xl'>{valor}</p>
        <p className='mt-0.5 flex min-h-6 items-center justify-center text-[10px] leading-tight text-[var(--sa-muted)] sm:mt-1 sm:min-h-7 sm:text-[11px]'>{desc}</p>
      </div>
    </div>
  )
}
