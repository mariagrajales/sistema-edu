import { AdministradorTemplate } from '../../shared/templates/AdministradorTemplate'
import { ContextBarIntegridad } from '../molecules/ContextBarIntegridad'
import { BitacoraHeader } from '../molecules/BitacoraHeader'
import { BitacoraKpiGrid } from '../organisms/BitacoraKpiGrid'
import { BitacoraTabla } from '../organisms/BitacoraTabla'
import { useAdminNavigation } from '../../shared/hooks/useAdminNavigation'

export function BitacoraAuditoriaPage() {
  const navegar = useAdminNavigation()
  const noop = () => {}

  return (
    <AdministradorTemplate vista='BITÁCORA DE ACCESOS Y SEGURIDAD' activeKey='bitacora' onNavigate={navegar} busqueda='' onBuscar={() => {}}>
      <div className='mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 text-base leading-normal sm:px-6 lg:px-8'>
        <BitacoraHeader onFiltrarFechas={noop} onEventoCritico={noop} onExportar={noop} onActa={noop} />
        <BitacoraKpiGrid />
        <ContextBarIntegridad />
        <BitacoraTabla />
        <div className='flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[var(--sa-field)] px-4 py-3 text-xs'>
          <p>Resguardo de Registros por 5 Años conforme a normativas de auditoría de la Secretaría de Educación y LGDNNA (Ley General de los Derechos de Niñas, Niños y Adolescentes). Registros sellados con marca temporal RFC 3161.</p>
          <button type='button' className='inline-flex min-h-9 items-center gap-2 rounded-lg border border-[var(--sa-border)] px-3 text-xs font-semibold'>Certificado de Integridad</button>
        </div>
      </div>
    </AdministradorTemplate>
  )
}
