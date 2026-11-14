import { useState } from 'react'
import type { ReactNode } from 'react'
import { useTheme } from '../../../utils/hooks/useTheme'
import { RoleBanner } from '../organisms/RoleBanner'
import { SidebarSEE } from '../organisms/SidebarSEE'
import { TopBarSEE } from '../organisms/TopBarSEE'
import type { RoleKey, SidebarKey } from '../types'

export interface PortalTemplateProps {
  roleKey: RoleKey
  rol?: string
  vista: string
  sistemaBanner?: string
  activeKey: SidebarKey
  onNavigate: (key: SidebarKey) => void
  busqueda?: string
  onBuscar?: (valor: string) => void
  mostrarBusqueda?: boolean
  hojaImpresion?: ReactNode
  children: ReactNode
}

export function PortalTemplate({
  roleKey,
  rol,
  vista,
  sistemaBanner,
  activeKey,
  onNavigate,
  busqueda,
  onBuscar,
  mostrarBusqueda = true,
  hojaImpresion,
  children,
}: PortalTemplateProps) {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  const [menuAbierto, setMenuAbierto] = useState(false)
  const [busquedaInterna, setBusquedaInterna] = useState('')

  const valorBusqueda = busqueda ?? busquedaInterna
  const registrarBusqueda = onBuscar ?? setBusquedaInterna
  const contenidoCompacto =
    roleKey === 'administrador' && (activeKey === 'roles' || activeKey === 'bitacora')
  const contenidoSinZoom = roleKey === 'administrador' && vista === 'ALTA DE COLABORADOR'

  const navegar = (key: SidebarKey) => {
    setMenuAbierto(false)
    onNavigate(key)
  }

  return (
    <div
      className='sa-app min-h-screen w-full bg-[var(--sa-bg)] text-[var(--color-text-primary)]'
      data-theme={theme}
      data-contrast={theme === 'light' ? 'high' : undefined}
    >
      <RoleBanner roleKey={roleKey} rol={rol} vista={vista} sistema={sistemaBanner} />

      <div className='sa-no-print grid w-full grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] [1100px]:grid-cols-[280px_minmax(0,1fr)]'>
        <div className={menuAbierto ? 'block' : 'hidden lg:block'}>
          <SidebarSEE
            roleKey={roleKey}
            activeKey={activeKey}
            onNavigate={navegar}
            onClose={() => setMenuAbierto(false)}
          />
        </div>

        <main className='sa-print-main flex min-w-0 flex-col gap-5 px-4 py-4 lg:px-6 lg:py-5'>
          <TopBarSEE
            roleKey={roleKey}
            isDark={isDark}
            onToggleTheme={() => setTheme(isDark ? 'light' : 'dark')}
            busqueda={valorBusqueda}
            onBuscar={registrarBusqueda}
            mostrarBusqueda={mostrarBusqueda}
            onOpenMenu={() => setMenuAbierto((previo) => !previo)}
          />

          <div className={`sa-page-content flex min-w-0 flex-col gap-5${contenidoCompacto ? ' sa-page-content--compact' : ''}${contenidoSinZoom ? ' sa-page-content--unscaled' : ''}`}>
            {children}
          </div>
        </main>
      </div>

      {hojaImpresion}
    </div>
  )
}
