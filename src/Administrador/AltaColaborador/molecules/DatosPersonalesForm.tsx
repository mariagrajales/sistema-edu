export interface DatosPersonales {
  nombres: string
  primerApellido: string
  segundoApellido: string
}

interface DatosPersonalesFormProps {
  valores: DatosPersonales
  onCambiar: (campo: keyof DatosPersonales, valor: string) => void
}

export function DatosPersonalesForm({ valores, onCambiar }: DatosPersonalesFormProps) {
  return (
    <section className='min-w-0 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
      <header className='flex min-w-0 items-center gap-3 border-b border-[var(--sa-border)] px-4 py-3'>
        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-sm font-bold text-[var(--sa-on-accent)]'>1</span>
        <h2 className='min-w-0 text-lg leading-tight font-bold text-[var(--sa-title)]'>Datos Personales del Colaborador</h2>
      </header>
      <div className='grid min-w-0 gap-3 px-4 py-4 sm:grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Nombre(s) *</label>
          <input value={valores.nombres} onChange={(e) => onCambiar('nombres', e.target.value)} placeholder='Ej. Ana María' className='h-11 w-full min-w-0 rounded-lg border border-[var(--sa-border)] px-3 text-sm' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Primer Apellido *</label>
          <input value={valores.primerApellido} onChange={(e) => onCambiar('primerApellido', e.target.value)} placeholder='Ej. López' className='h-11 w-full min-w-0 rounded-lg border border-[var(--sa-border)] px-3 text-sm' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Segundo Apellido</label>
          <input value={valores.segundoApellido} onChange={(e) => onCambiar('segundoApellido', e.target.value)} placeholder='Ej. Ramírez' className='h-11 w-full min-w-0 rounded-lg border border-[var(--sa-border)] px-3 text-sm' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>CURP Registrada *</label>
          <input placeholder='Ej. LORA900101MDFRNN09' className='h-11 w-full min-w-0 rounded-lg border border-[var(--sa-border)] px-3 text-sm' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Cédula Prof. / N.º Empleado *</label>
          <input placeholder='Ej. 12345678' className='h-11 w-full min-w-0 rounded-lg border border-[var(--sa-border)] px-3 text-sm' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Jornada y Turno Asignado *</label>
          <select className='h-11 w-full min-w-0 rounded-lg border border-[var(--sa-border)] px-3 text-sm'>
            <option>Seleccione...</option>
            <option>Matutino</option>
            <option>Vespertino</option>
            <option>Completo</option>
          </select>
        </div>
      </div>
    </section>
  )
}
