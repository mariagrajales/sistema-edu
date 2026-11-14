import { useMemo, useState } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import type { EstudianteApiDetalle } from '../../../utils/services/catalogosApi'

interface HomePageProps {
  students: EstudianteApiDetalle[]
  loading: boolean
  error: string | null
  onRetry: () => void
  onNewReferral: () => void
  onViewStudent: (studentId: number) => void
}

function grupoDe(alumno: EstudianteApiDetalle): string {
  const grado = alumno.grado || `${alumno.api.gradeId}°`
  const grupo = alumno.grupo || `Grupo ${alumno.api.schoolGroupId}`
  return `${grado} ${grupo} · ${alumno.turno}`
}

export function HomePage({
  students,
  loading,
  error,
  onRetry,
  onNewReferral,
  onViewStudent,
}: HomePageProps) {
  const [query, setQuery] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [page, setPage] = useState(0)
  const pageSize = 8

  const groups = useMemo(
    () => [...new Set(students.map(grupoDe))].sort((first, second) => first.localeCompare(second, 'es')),
    [students]
  )
  const activeCount = students.filter((student) => student.api.active).length
  const filteredStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es')
    return students.filter((student) => {
      const matchesQuery =
        !normalizedQuery ||
        student.nombreCompleto.toLocaleLowerCase('es').includes(normalizedQuery) ||
        student.api.enrollmentNumber.toLocaleLowerCase('es').includes(normalizedQuery)
      const matchesGroup = !selectedGroup || grupoDe(student) === selectedGroup
      const matchesStatus =
        status === 'all' || (status === 'active' ? student.api.active : !student.api.active)
      return matchesQuery && matchesGroup && matchesStatus
    })
  }, [query, selectedGroup, status, students])
  const pageCount = Math.max(1, Math.ceil(filteredStudents.length / pageSize))
  const visibleStudents = filteredStudents.slice(page * pageSize, (page + 1) * pageSize)
  const shifts = [...new Set(students.map((student) => student.turno))]
  const groupsSummary = loading
    ? 'Cargando datos del backend…'
    : error
      ? 'Datos no disponibles'
      : groups.length
        ? groups.join(', ')
        : 'Sin grupos reportados'

  const resetFilters = () => {
    setQuery('')
    setSelectedGroup('')
    setStatus('all')
    setPage(0)
  }

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]">Directorio escolar inclusivo</h1>
          <p className="mt-1 text-sm text-[var(--sa-muted)]">Grupos atendidos: {groupsSummary}</p>
        </div>
        <button
          type="button"
          onClick={onNewReferral}
          className="inline-flex min-h-10 items-center gap-2 rounded-[10px] bg-[var(--color-forest)] px-4 text-sm font-bold text-[var(--sa-on-accent)] hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]"
        >
          <Icon name="plus" size={16} color="currentColor" />
          Nueva canalización
        </button>
      </header>

      <section aria-label="Resumen de estudiantes" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          {
            title: 'Alumnos registrados',
            value: loading || error ? '—' : String(students.length),
            description: 'En el directorio',
            icon: 'users' as const,
          },
          {
            title: 'Alumnos activos',
            value: loading || error ? '—' : String(activeCount),
            description: 'Con estado activo',
            icon: 'circle-check' as const,
          },
          {
            title: 'Grupos con alumnos',
            value: loading || error ? '—' : String(groups.length),
            description: loading || error
              ? 'Datos no disponibles'
              : shifts.length
                ? `Turnos: ${shifts.join(', ')}`
                : 'Sin grupos reportados',
            icon: 'layout' as const,
          },
        ].map((metric) => (
          <article key={metric.title} className="flex min-h-32 h-full flex-col items-start rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-3.5 shadow-[var(--shadow-sm)]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sa-menta-soft)] text-[var(--sa-accent)]">
              <Icon name={metric.icon} size={18} color="currentColor" />
            </span>
            <h2 className="mt-2 text-sm font-semibold text-[var(--sa-muted)]">{metric.title}</h2>
            <p className="mt-1 text-[22px] font-bold text-[var(--sa-accent)]">{metric.value}</p>
            <p className="mt-1 text-xs text-[var(--sa-muted)]">{metric.description}</p>
          </article>
        ))}
      </section>

      <section aria-label="Filtros de estudiantes" className="grid grid-cols-1 items-end gap-3 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-3.5 shadow-[var(--shadow-sm)] md:grid-cols-[minmax(0,1fr)_minmax(180px,0.55fr)_minmax(150px,0.45fr)_auto]">
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-[var(--sa-muted)]">
          Buscar alumno
          <span className="flex min-h-11 items-center gap-2 rounded-lg border border-[var(--sa-input-border)] px-3 text-[var(--color-text-primary)] focus-within:border-[var(--sa-accent)]">
            <Icon name="search" size={16} color="var(--sa-muted)" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(0)
              }}
              placeholder="Nombre o matrícula"
              className="teacher-student-search min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--sa-muted)]"
            />
          </span>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-[var(--sa-muted)]">
          Grupo
          <select
            value={selectedGroup}
            onChange={(event) => {
              setSelectedGroup(event.target.value)
              setPage(0)
            }}
            className="min-h-11 rounded-lg border border-[var(--sa-input-border)] bg-[var(--sa-card)] px-3 text-sm text-[var(--color-text-primary)]"
          >
            <option value="">Todos los grupos</option>
            {groups.map((group) => <option key={group} value={group}>{group}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-[var(--sa-muted)]">
          Estado
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as typeof status)
              setPage(0)
            }}
            className="min-h-11 rounded-lg border border-[var(--sa-input-border)] bg-[var(--sa-card)] px-3 text-sm text-[var(--color-text-primary)]"
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </label>
        <button
          type="button"
          onClick={resetFilters}
          className="min-h-11 px-2 text-sm font-semibold text-[var(--sa-accent)] hover:underline"
        >
          Limpiar filtros
        </button>
      </section>

      <section className="flex flex-col gap-3" aria-label="Lista de estudiantes">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-bold text-[var(--color-text-primary)]">Alumnos del plantel</h2>
          <span className="text-xs text-[var(--sa-muted)]">{filteredStudents.length} resultados</span>
        </div>

        {loading ? <p role="status" className="min-h-40 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] py-12 text-center text-sm text-[var(--sa-muted)]">Cargando alumnos desde el backend…</p> : null}
        {error ? (
          <div role="alert" className="flex min-h-40 flex-col items-center justify-center gap-2.5 rounded-xl border border-[var(--sa-danger)] bg-[var(--sa-rosa)] p-4 text-center text-sm text-[var(--sa-on-rosa)]">
            <Icon name="alert-triangle" size={22} color="currentColor" />
            <h3 className="text-[15px] font-bold">No se pudieron cargar los alumnos</h3>
            <p>{error}</p>
            <button type="button" onClick={onRetry} className="min-h-10 rounded-lg border border-current px-4 font-bold hover:bg-black/5">Reintentar</button>
          </div>
        ) : null}
        {!loading && !error && visibleStudents.length === 0 ? (
          <p className="min-h-36 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-8 text-center text-sm text-[var(--sa-muted)]">
            No hay alumnos que coincidan con estos filtros.
          </p>
        ) : null}
        {!error && visibleStudents.map((student) => {
          const initials = `${student.api.firstName.charAt(0)}${student.api.lastName.charAt(0)}`.toUpperCase()
          return (
            <article key={student.api.id} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-3 shadow-[var(--shadow-sm)] sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sa-menta-soft)] text-xs font-bold text-[var(--sa-accent)]" aria-hidden="true">{initials}</span>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-[var(--color-text-primary)]">{student.nombreCompleto}</h3>
                <p className="mt-0.5 truncate text-xs text-[var(--sa-muted)]">
                  Matrícula {student.api.enrollmentNumber} · {grupoDe(student)}
                </p>
              </div>
              <span className={student.api.active ? 'col-start-2 w-fit rounded-full bg-[var(--sa-menta-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--sa-accent)] sm:col-auto' : 'col-start-2 w-fit rounded-full bg-[var(--sa-field)] px-2.5 py-1 text-xs font-semibold text-[var(--sa-muted)] sm:col-auto'}>
                {student.api.active ? 'Activo' : 'Inactivo'}
              </span>
              <button
                type="button"
                onClick={() => onViewStudent(student.api.id)}
                className="col-start-2 min-h-9 w-fit rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-xs font-semibold text-[var(--sa-accent)] hover:bg-[var(--sa-field)] sm:col-auto"
                aria-label={`Ver ficha de ${student.nombreCompleto}`}
              >
                Ver ficha
              </button>
            </article>
          )
        })}

        {!loading && !error && filteredStudents.length > pageSize ? (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-xs text-[var(--sa-muted)]">
              Mostrando {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filteredStudents.length)} de {filteredStudents.length}
            </p>
            <div className="flex items-center gap-2">
              <button type="button" disabled={page === 0} onClick={() => setPage((value) => Math.max(0, value - 1))} className="min-h-9 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-xs font-semibold disabled:opacity-50">Anterior</button>
              <span className="text-xs text-[var(--sa-muted)]">{page + 1} / {pageCount}</span>
              <button type="button" disabled={page + 1 >= pageCount} onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))} className="min-h-9 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-xs font-semibold disabled:opacity-50">Siguiente</button>
            </div>
          </div>
        ) : null}
      </section>

    </div>
  )
}
