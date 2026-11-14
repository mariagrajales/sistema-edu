import { cn } from '../../../utils/cn'
import { useState } from 'react'

export function PlantelGradosForm() {
  const [grados, setGrados] = useState<string[]>([])
  const toggleGrado = (g: string) => {
    setGrados((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]))
  }
  return (
    <section className='min-w-0 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
      <header className='flex items-center gap-3 border-b border-[var(--sa-border)] px-4 py-3'>
        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--sa-field)] text-sm font-bold text-[var(--sa-muted)]'>4</span>
        <h2 className='text-lg font-bold text-[var(--sa-title)]'>Plantel y Grados Asignados</h2>
      </header>
      <div className='grid min-w-0 gap-3 px-4 py-4 sm:grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Plantel de Adscripción *</label>
          <select className='h-11 w-full min-w-0 rounded-lg border border-[var(--sa-border)] px-3 text-sm'>
            <option>Colegio Humanista Norte</option>
            <option>Secundaria Anexa</option>
          </select>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Clave / Turno Institucional</label>
          <input placeholder='Ej. T-01 / MATUTINO' className='h-11 w-full min-w-0 rounded-lg border border-[var(--sa-border)] px-3 text-sm' />
        </div>
        <div className='flex flex-col gap-2 sm:col-span-2'>
          <label className='text-sm font-semibold'>Grados / Secciones a Cargo</label>
          <div className='flex flex-wrap gap-2'>
            {['1°', '2°', '3°'].map((g) => (
              <button
                key={g}
                type='button'
                onClick={() => toggleGrado(g)}
                className={cn('min-h-9 rounded-lg border px-3 py-1.5 text-xs font-semibold', grados.includes(g) ? 'border-[var(--color-forest)] bg-[color-mix(in_srgb,var(--color-forest)_14%,transparent)] text-[var(--color-forest)]' : 'border-[var(--sa-border)]')}
              >
                {g} Grado
              </button>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2 sm:col-span-2'>
          <label className='text-sm font-semibold'>Observaciones de Adscripción</label>
          <textarea placeholder='Ej. Tutoría de grupo, apoyo a Proyecto Escolar...' className='min-h-24 w-full min-w-0 rounded-lg border border-[var(--sa-border)] px-3 py-2 text-sm' />
        </div>
      </div>
    </section>
  )
}
