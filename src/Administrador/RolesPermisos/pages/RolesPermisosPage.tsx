import { AdministradorTemplate } from '../../shared/templates/AdministradorTemplate'
import { ContextBarRoles } from '../molecules/ContextBarRoles'
import { RolesHeader } from '../molecules/RolesHeader'
import { PerfilesGrid } from '../organisms/PerfilesGrid'
import { MatrizPermisos } from '../organisms/MatrizPermisos'
import { useAdminNavigation } from '../../shared/hooks/useAdminNavigation'

export function RolesPermisosPage() {
  const navegar = useAdminNavigation()
  const irNuevo = () => { window.location.hash = '#administrador/alta' }

  return (
    <AdministradorTemplate vista='ROLES Y PERMISOS' activeKey='roles' onNavigate={navegar} busqueda='' onBuscar={() => {}}>
      <div className='mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-6 text-base leading-normal sm:px-6 lg:px-8'>
        <ContextBarRoles />
        <RolesHeader onNuevo={irNuevo} />
        <div className='flex flex-col gap-12'>
          <PerfilesGrid />
          <MatrizPermisos />
        </div>
      </div>
    </AdministradorTemplate>
  )
}
