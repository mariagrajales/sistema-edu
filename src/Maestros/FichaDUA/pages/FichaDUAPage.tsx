import { Icon } from '../../../utils/atoms/Icon'
import type { EstudianteApiDetalle } from '../../../utils/services/catalogosApi'
import { ModuleCard } from '../organisms/ModuleCard'
import { PrintBar } from '../molecules/PrintBar'

interface FichaDUAPageProps {
  students: EstudianteApiDetalle[]
  selectedStudentId: number | null
  loading: boolean
  error: string | null
  onRetry: () => void
  onSelectStudent: (studentId: number | null) => void
  onBack: () => void
  onViewHistory: () => void
}

export function FichaDUAPage({
  students,
  selectedStudentId,
  loading,
  error,
  onRetry,
  onSelectStudent,
  onBack,
  onViewHistory,
}: FichaDUAPageProps) {
  const alumno = students.find((student) => student.api.id === selectedStudentId)

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4">
      <h1 className="sr-only">Ficha de adaptaciones DUA</h1>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-sm font-semibold hover:bg-[var(--sa-field)]"
        >
          <Icon name="arrow-left" size={16} color="currentColor" />
          Volver al directorio
        </button>
        <label className="flex min-w-[min(100%,280px)] flex-col gap-1 text-xs font-semibold text-[var(--sa-muted)]">
          <span className="sr-only">Seleccionar alumno</span>
          <select
            aria-label="Seleccionar alumno para ficha DUA"
            value={selectedStudentId ?? ''}
            onChange={(event) => onSelectStudent(event.target.value ? Number(event.target.value) : null)}
            disabled={loading || Boolean(error)}
            className="min-h-10 rounded-lg border border-[var(--sa-input-border)] bg-[var(--sa-card)] px-3 text-sm text-[var(--color-text-primary)] disabled:opacity-60"
          >
            <option value="">Seleccione un alumno…</option>
            {students.map((student) => (
              <option key={student.api.id} value={student.api.id}>
                {student.nombreCompleto} · {student.api.enrollmentNumber}
              </option>
            ))}
          </select>
        </label>
      </header>

      {loading ? <p role="status" className="rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 text-sm text-[var(--sa-muted)]">Cargando alumnos…</p> : null}
      {error ? (
        <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--sa-danger)] bg-[var(--sa-rosa)] p-4 text-sm text-[var(--sa-on-rosa)]">
          <span>{error}</span>
          <button type="button" onClick={onRetry} className="font-bold underline">Reintentar</button>
        </div>
      ) : null}

      {alumno ? (
        <>
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            <article className="rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--sa-menta-soft)] text-base font-bold text-[var(--sa-accent)]" aria-hidden="true">
                  {`${alumno.api.firstName.charAt(0)}${alumno.api.lastName.charAt(0)}`.toUpperCase()}
                </span>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{alumno.nombreCompleto}</h2>
                  <span className="mt-2 inline-flex rounded-full bg-[var(--sa-menta-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--sa-accent)]">
                    {alumno.api.active ? 'Alumno activo' : 'Alumno inactivo'}
                  </span>
                  <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-3">
                    <div>
                      <dt className="text-xs text-[var(--sa-muted)]">Matrícula</dt>
                      <dd className="text-sm font-semibold">{alumno.api.enrollmentNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[var(--sa-muted)]">Grupo</dt>
                      <dd className="text-sm font-semibold">{alumno.grado} {alumno.grupo}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[var(--sa-muted)]">Turno</dt>
                      <dd className="text-sm font-semibold">{alumno.turno}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </article>
            <article className="flex flex-col justify-center rounded-xl border border-[var(--sa-border)] bg-[var(--sa-menta-soft)] p-5">
              <div className="flex items-center gap-2 text-[var(--sa-accent)]">
                <Icon name="circle-check" size={18} color="currentColor" />
                <h2 className="text-xs font-bold uppercase tracking-wider">Estado escolar</h2>
              </div>
              <p className="mt-2 text-lg font-bold text-[var(--sa-accent)]">
                {alumno.api.active ? 'Activo en el sistema' : 'Inactivo en el sistema'}
              </p>
            </article>
          </section>

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2" aria-label="Información DUA y de acompañamiento">
            <article className="flex min-h-32 flex-col gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5">
              <div className="flex items-center gap-2 text-[var(--sa-accent)]">
                <Icon name="clipboard-check" size={18} color="currentColor" />
                <h2 className="text-sm font-bold">Diagnóstico clínico oficial</h2>
              </div>
              <p className="text-sm leading-relaxed text-[var(--sa-muted)]">
                Esta información no está disponible en los datos recibidos para este alumno.
              </p>
            </article>
            <article className="flex min-h-32 flex-col gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5">
              <div className="flex items-center gap-2 text-[var(--sa-accent)]">
                <Icon name="heart" size={18} color="currentColor" />
                <h2 className="text-sm font-bold">Psicóloga titular asignada</h2>
              </div>
              <p className="text-sm leading-relaxed text-[var(--sa-muted)]">
                No hay información de especialistas disponible para este alumno.
              </p>
            </article>
          </section>

          <section className="flex min-h-40 flex-col justify-center gap-2 rounded-xl border border-dashed border-[var(--sa-border)] bg-[var(--sa-card)] p-6">
              <div className="flex items-center gap-2 text-[var(--sa-accent)]">
                <Icon name="book-open" size={18} color="currentColor" />
                <h2 className="text-base font-bold">Pautas pedagógicas DUA</h2>
              </div>
              <p className="text-sm text-[var(--sa-muted)]">
                Las adaptaciones específicas no están incluidas en la información recibida para este alumno.
              </p>
          </section>
          <PrintBar onViewHistory={onViewHistory} />
        </>
      ) : null}

      {!loading && !error && !alumno ? (
        <p className="px-1 text-sm text-[var(--sa-muted)]">
          Seleccione un alumno para consultar sus datos escolares disponibles.
        </p>
      ) : null}
    </div>
  )
}
