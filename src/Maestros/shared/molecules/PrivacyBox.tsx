import { Icon } from '../../../utils/atoms/Icon'
import { privacy } from '../constants/navigation'

export function PrivacyBox() {
  const { icon, title, body } = privacy

  return (
    <details className="group rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-field)] px-3">
      <summary className="flex min-h-9 cursor-pointer list-none items-center gap-2 text-[var(--sa-accent)] marker:hidden [&::-webkit-details-marker]:hidden">
        <Icon name={icon} size={16} color="currentColor" />
        <span className="text-xs font-semibold">{title}</span>
        <Icon
          name="chevron-down"
          size={14}
          color="var(--sa-muted)"
          className="ml-auto transition-transform group-open:rotate-180"
        />
      </summary>
      <p className="pb-3 text-xs leading-relaxed text-[var(--sa-muted)]">{body}</p>
    </details>
  )
}
