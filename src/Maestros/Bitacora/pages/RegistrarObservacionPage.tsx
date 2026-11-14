import { ObservationForm } from '../organisms/ObservationForm'
import type { BitacoraAlumno, Observacion } from '../types'

interface RegistrarObservacionPageProps {
  alumno: BitacoraAlumno
  demoMode?: boolean
  onAdd: (observacion: Observacion) => void
}

export function RegistrarObservacionPage({ alumno, demoMode = false, onAdd }: RegistrarObservacionPageProps) {
  return (
    <section
      aria-label="Registrar nueva observación de aula"
      className="mx-auto w-full max-w-[920px] overflow-hidden rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-[var(--shadow-sm)]"
    >
      <ObservationForm alumno={alumno} variant="page" demoMode={demoMode} titleId="obs-page-title" onSave={onAdd} />
    </section>
  )
}
