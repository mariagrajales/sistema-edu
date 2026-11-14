import { useState } from 'react'

function generarPassword(): string {
  const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!#$%'
  const valores = new Uint32Array(14)
  crypto.getRandomValues(valores)
  return Array.from(valores, (valor) => caracteres[valor % caracteres.length]).join('')
}

export { generarPassword }

interface CredencialesSeguridadFormProps {
  email: string
  password: string
  onEmail: (valor: string) => void
  onPassword: (valor: string) => void
}

export function CredencialesSeguridadForm({ email, password, onEmail, onPassword }: CredencialesSeguridadFormProps) {
  const [mostrar, setMostrar] = useState(false)
  return (
    <section className='min-w-0 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
      <header className='flex min-w-0 items-center gap-3 border-b border-[var(--sa-border)] px-4 py-3'>
        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-sm font-bold text-[var(--sa-on-accent)]'>2</span>
        <h2 className='min-w-0 text-lg leading-tight font-bold text-[var(--sa-text)]'>Credenciales y Seguridad de Acceso</h2>
      </header>
      <div className='flex min-w-0 flex-col gap-4 px-4 py-4'>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Correo Institucional Generado *</label>
          <input type='email' value={email} onChange={(e) => onEmail(e.target.value)} placeholder='usuario.apellido@colegionorte.edu.mx' className='h-11 w-full min-w-0 rounded-lg border border-[var(--sa-border)] px-3 text-sm' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Teléfono Móvil (Contacto/MFA) *</label>
          <input placeholder='Ej. 55 1234 5678' className='h-11 w-full min-w-0 rounded-lg border border-[var(--sa-border)] px-3 text-sm' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold'>Contraseña Temporal de Primer Acceso *</label>
          <div className='flex min-w-0 flex-col gap-2'>
            <input type={mostrar ? 'text' : 'password'} value={password} onChange={(e) => onPassword(e.target.value)} className='h-11 w-full min-w-0 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 text-sm' />
            <div className='grid min-w-0 grid-cols-3 gap-2'>
              <button type='button' onClick={() => setMostrar((v) => !v)} className='inline-flex min-h-9 min-w-0 items-center justify-center gap-1 rounded-lg border border-[var(--sa-border)] px-2 text-xs font-semibold'>{mostrar ? 'Ocultar' : 'Ver'}</button>
              <button type='button' onClick={() => navigator.clipboard?.writeText(password)} className='inline-flex min-h-9 min-w-0 items-center justify-center gap-1 rounded-lg border border-[var(--sa-border)] px-2 text-xs font-semibold'>Copiar</button>
              <button type='button' onClick={() => onPassword(generarPassword())} className='inline-flex min-h-9 min-w-0 items-center justify-center gap-1 rounded-lg border border-[var(--sa-border)] px-2 text-xs font-semibold'>Regenerar</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
