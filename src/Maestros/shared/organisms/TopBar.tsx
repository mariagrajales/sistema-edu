import { Icon } from '../../../utils/atoms/Icon'
import { SegmentedControl } from '../atoms/SegmentedControl'
import { Avatar } from '../atoms/Avatar'
import { getSession } from '../../../Login/services/authService'
import { topBarContent } from '../constants/navigation'
import type { ThemeMode } from '../../../utils/hooks/useTheme'

interface TopBarProps {
  onOpenSidebar: () => void
  theme: ThemeMode
  onChangeTheme: (theme: ThemeMode) => void
}

export function TopBar({ onOpenSidebar, theme, onChangeTheme }: TopBarProps) {
  const { segmented } = topBarContent
  const sessionUser = getSession()?.user
  const profileName = sessionUser?.fullName?.trim() || sessionUser?.username || 'Usuario'
  const roleLabels = {
    TEACHER: 'Docente',
    PREFECT: 'Prefectura',
    PSYCHOLOGIST: 'Psicología',
    ACADEMIC_SERVICES: 'Servicios académicos',
  } as const
  const profileRole = sessionUser ? roleLabels[sessionUser.role] : ''
  const profileWords = profileName.split(/\s+/).filter(Boolean)
  const initials = profileWords.length > 1
    ? `${profileWords[0][0]}${profileWords[profileWords.length - 1][0]}`.toUpperCase()
    : profileName.slice(0, 2).toUpperCase()

  const options = segmented.map((option) => ({
    ...option,
    active: option.id === theme,
  }))

  const handleToggle = (id: string) => {
    if (id === 'light' || id === 'dark') onChangeTheme(id)
  }

  return (
    <header className="sa-no-print sticky top-0 z-20 flex flex-wrap items-center gap-2 border-b border-[var(--sa-border)] bg-[var(--sa-bg)] px-4 py-3 md:gap-3 md:px-6">
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label="Abrir menú de navegación"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] text-[var(--sa-muted)] hover:bg-[var(--sa-field)] md:hidden"
      >
        <Icon name="menu" size={20} color="currentColor" />
      </button>

      <SegmentedControl
        ariaLabel="Tema de la interfaz"
        options={options}
        onToggle={handleToggle}
      />

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden flex-col text-right sm:flex">
          <span className="text-base font-bold leading-tight">{profileName}</span>
          <span className="text-sm text-[var(--sa-muted)]">{profileRole}</span>
        </div>
        <Avatar initials={initials} tone="forest" ariaLabel={`Perfil de ${profileName}`} />
      </div>
    </header>
  )
}
