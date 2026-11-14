import { Icon } from '../../../utils/atoms/Icon'
import type { Pauta } from '../types'

interface PautaItemProps {
  pauta: Pauta
}

export function PautaItem({ pauta }: PautaItemProps) {
  return (
    <div className="flex gap-2.5 border-b border-[var(--sa-border)] py-2.5 last:border-b-0">
      <Icon
        name={pauta.icon}
        size={16}
        color="var(--sa-accent)"
        className="mt-0.5 shrink-0"
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <h4 className="text-xs font-semibold">{pauta.title}</h4>
        <p className="text-xs leading-relaxed text-[var(--sa-muted)]">{pauta.description}</p>
      </div>
    </div>
  )
}
