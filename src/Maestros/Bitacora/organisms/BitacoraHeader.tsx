import { Icon } from '../../../utils/atoms/Icon'
import { bitacoraContent } from '../constants/bitacoraContent'

export function BitacoraHeader({ onAdd }: { onAdd: () => void }) {
  const { header } = bitacoraContent

  return (
    <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-wide text-[var(--sa-muted)] uppercase">
          <Icon name={header.eyebrowIcon} size={13} color="var(--sa-accent)" />
          {header.eyebrow}
        </span>
        <h1 className="mt-1 text-[22px] leading-[1.12] font-extrabold text-[var(--color-text-primary)]">
          {header.title}
        </h1>
        <p className="mt-1.5 max-w-3xl text-xs leading-relaxed text-[var(--sa-muted)]">{header.subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="sa-no-print inline-flex min-h-9 shrink-0 self-end items-center justify-center gap-1.5 rounded-lg bg-[var(--color-forest)] px-3 text-xs font-bold whitespace-nowrap text-[var(--sa-on-accent)] shadow-[var(--shadow-sm)] hover:brightness-95 lg:self-auto"
      >
        <Icon name={header.add.icon} size={15} color="currentColor" />
        {header.add.label}
      </button>
    </header>
  )
}
