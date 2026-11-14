import { useState } from 'react'
import { AppTemplate } from '../templates/AppTemplate'
import { HomePage } from '../../Home/pages/HomePage'
import { CanalizacionesPage } from '../../Canalizaciones/pages/CanalizacionesPage'
import { FichaDUAPage } from '../../FichaDUA/pages/FichaDUAPage'
import { Icon } from '../../../utils/atoms/Icon'
import { useTheme } from '../../../utils/hooks/useTheme'
import { useAlumnosDocente } from '../hooks/useAlumnosDocente'

interface PortalMaestrosPageProps {
  ruta: string
}

export function PortalMaestrosPage({ ruta }: PortalMaestrosPageProps) {
  const { theme, setTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedFichaId, setSelectedFichaId] = useState<number | null>(null)
  const { alumnos, cargando, error, recargar } = useAlumnosDocente()
  const vista = ruta === 'maestros/canalizaciones'
    ? 'canalizaciones'
    : ruta === 'maestros/dua'
      ? 'dua'
      : ruta === 'maestros/bitacora'
        ? 'bitacora'
        : ruta === 'maestros/observacion'
          ? 'observacion'
          : ruta === 'maestros/contacto'
            ? 'contacto'
      : 'directorio'

  const navegar = (id: string) => {
    if (id === 'canalizaciones') {
      setSelectedFichaId(null)
      window.location.hash = '#maestros/canalizaciones'
    } else if (id === 'dua') {
      setSelectedFichaId(null)
      window.location.hash = '#maestros/dua'
    } else if (id === 'bitacora') {
      window.location.hash = '#maestros/bitacora'
    } else if (id === 'observacion') {
      window.location.hash = '#maestros/observacion'
    } else if (id === 'contacto') {
      window.location.hash = '#maestros/contacto'
    } else {
      setSelectedFichaId(null)
      window.location.hash = '#maestros'
    }
  }

  return (
    <AppTemplate
      activeId={vista}
      onNavigate={navegar}
      theme={theme}
      onChangeTheme={setTheme}
      sidebarOpen={sidebarOpen}
      onOpenSidebar={() => setSidebarOpen(true)}
      onCloseSidebar={() => setSidebarOpen(false)}
      contentClassName='px-4 py-5 md:px-6'
    >
      {vista === 'canalizaciones' ? (
        <CanalizacionesPage />
      ) : vista === 'dua' ? (
        <FichaDUAPage
          students={alumnos}
          selectedStudentId={selectedFichaId}
          loading={cargando}
          error={error}
          onRetry={() => void recargar()}
          onSelectStudent={setSelectedFichaId}
          onBack={() => navegar('directorio')}
          onViewHistory={() => navegar('bitacora')}
        />
      ) : vista === 'bitacora' || vista === 'observacion' ? (
        <section role="status" className="mx-auto flex w-full max-w-[900px] flex-col gap-3 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sa-field)] text-[var(--sa-muted)]">
              <Icon name="info" size={17} color="currentColor" />
            </span>
            <h1 className="text-lg font-bold text-[var(--sa-title)]">
              {vista === 'bitacora' ? 'Bitácora de aula' : 'Registrar observación'}
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-[var(--sa-muted)]">
            El servicio de observaciones no está disponible. No se muestran registros de ejemplo.
          </p>
        </section>
      ) : vista === 'contacto' ? (
        <section className="mx-auto flex w-full max-w-[900px] flex-col gap-4 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sa-menta-soft)] text-[var(--sa-accent)]">
              <Icon name="phone" size={18} color="currentColor" />
            </span>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Contacto directo SEE</h1>
          </div>
          <p className="text-sm text-[var(--sa-muted)]">
            El servicio actual no proporciona datos de contacto directo. Puedes iniciar una canalización para enviar una solicitud formal.
          </p>
          <button type="button" onClick={() => navegar('canalizaciones')} className="min-h-11 w-fit rounded-lg bg-[var(--color-forest)] px-4 text-sm font-bold text-[var(--sa-on-accent)] hover:brightness-95">
            Crear canalización
          </button>
        </section>
      ) : (
        <>
          <HomePage
            students={alumnos}
            loading={cargando}
            error={error}
            onRetry={() => void recargar()}
            onNewReferral={() => navegar('canalizaciones')}
            onViewStudent={(studentId) => {
              setSelectedFichaId(studentId)
              window.location.hash = '#maestros/dua'
            }}
          />
        </>
      )}
    </AppTemplate>
  )
}
