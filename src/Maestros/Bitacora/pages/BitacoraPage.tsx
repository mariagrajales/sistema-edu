import { useMemo, useState } from 'react'
import { BitacoraHeader } from '../organisms/BitacoraHeader'
import { Timeline } from '../organisms/Timeline'
import { RegisterObservationModal } from '../organisms/RegisterObservationModal'
import { ProfileCard } from '../molecules/ProfileCard'
import { FilterPills } from '../molecules/FilterPills'
import { SummaryCard } from '../molecules/SummaryCard'
import { InfoBar } from '../molecules/InfoBar'
import { filtros } from '../constants/observaciones'
import type { BitacoraAlumno, FiltroId, Observacion } from '../types'

interface BitacoraPageProps {
  alumno: BitacoraAlumno
  observaciones: Observacion[]
  demoMode: boolean
  onAdd: (observacion: Observacion) => void
}

export function BitacoraPage({ alumno, observaciones, demoMode, onAdd }: BitacoraPageProps) {
  const [filtro, setFiltro] = useState<FiltroId>('todas')
  const [modalOpen, setModalOpen] = useState(false)

  const visibles = useMemo(
    () => (filtro === 'todas' ? observaciones : observaciones.filter((o) => o.filtro === filtro)),
    [filtro, observaciones]
  )

  return (
    <section className="mx-auto flex w-full max-w-[1080px] flex-col gap-4">
      <ProfileCard alumno={alumno} />
      <BitacoraHeader onAdd={() => setModalOpen(true)} />
      <FilterPills filters={filtros} active={filtro} count={visibles.length} onChange={setFiltro} />
      <Timeline observaciones={visibles} />
      <SummaryCard count={observaciones.length} demoMode={demoMode} />
      <InfoBar demoMode={demoMode} />

      {modalOpen ? (
        <RegisterObservationModal
          alumno={alumno}
          demoMode={demoMode}
          onClose={() => setModalOpen(false)}
          onSave={onAdd}
        />
      ) : null}
    </section>
  )
}

