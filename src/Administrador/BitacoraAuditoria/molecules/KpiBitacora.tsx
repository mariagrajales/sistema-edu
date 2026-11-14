import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'

interface KpiBitacoraProps {
  titulo: string
  subtitulo: string
  valor: string
  apoyo: string
  icono: string
  destacado?: boolean
}

export function KpiBitacora({ titulo, subtitulo, valor, apoyo, icono, destacado }: KpiBitacoraProps) {
  return (
    <article className={cn('relative flex min-h-[136px] h-full flex-col overflow-hidden rounded-xl border shadow-sm', destacado ? 'border-transparent bg-[var(--color-forest)] text-[var(--sa-on-accent)]' : 'border-[var(--sa-border)] bg-[var(--sa-card)] text-[var(--sa-text)]')}>
      <div className='flex min-h-0 flex-1 flex-col gap-2 p-3 sm:p-4'>
        <div className='flex items-center gap-2'>
          <div className={cn('flex h-8 w-8 shrink-0 aspect-square items-center justify-center rounded-full', destacado ? 'bg-white/15' : 'bg-[var(--sa-field)] text-[var(--color-forest)]')}>
            <Icon name={icono as any} size={16} />
          </div>
          <div className='min-w-0'>
            <p className={cn('text-[9px] font-bold uppercase tracking-wide', destacado ? 'text-white/80' : 'text-[var(--sa-muted)]')}>{titulo}</p>
            <p className='text-xs font-extrabold leading-tight'>{subtitulo}</p>
          </div>
        </div>
        <p className='text-xl leading-tight font-extrabold'>{valor}</p>
        <p className={cn('line-clamp-3 text-[10px] leading-relaxed', destacado ? 'text-white/90' : 'text-[var(--sa-muted)]')}>{apoyo}</p>
      </div>
      <div className={cn('mt-auto h-1 w-full', destacado ? 'bg-white/40' : 'bg-[var(--color-forest)]/40')} />
    </article>
  )
}
