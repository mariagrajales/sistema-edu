import { Icon } from '../../../utils/atoms/Icon'
import { IconTile } from '../../shared/atoms/IconTile'
import { PautaItem } from '../molecules/PautaItem'
import type { DuaModule } from '../types'

interface ModuleCardProps {
  duaModule: DuaModule
}

export function ModuleCard({ duaModule }: ModuleCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-[16px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 shadow-[var(--shadow-sm)]">
      <header className="flex items-center gap-3 border-b border-[var(--sa-border)] pb-3">
        <IconTile icon={duaModule.icon} tone={duaModule.tone} size="sm" />
        <div className="flex min-w-0 flex-col">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--sa-muted)]">
            {duaModule.label}
          </span>
          <h3 className="text-sm font-bold leading-tight">{duaModule.title}</h3>
        </div>
      </header>

      <div className="flex flex-1 flex-col">
        {duaModule.pautas.map((pauta) => (
          <PautaItem key={pauta.title} pauta={pauta} />
        ))}
      </div>

      <div className="mt-auto flex items-start gap-2 border-t border-[var(--sa-border)] pt-2 text-xs font-medium text-[var(--sa-muted)]">
        <Icon
          name={duaModule.footer.icon}
          size={13}
          color="currentColor"
          className="mt-0.5 shrink-0"
        />
        {duaModule.footer.text}
      </div>
    </article>
  )
}
