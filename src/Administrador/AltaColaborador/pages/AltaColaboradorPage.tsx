import { AdministradorTemplate } from '../../shared/templates/AdministradorTemplate'
import { DatosPersonalesForm, type DatosPersonales } from '../molecules/DatosPersonalesForm'
import { CredencialesSeguridadForm, generarPassword } from '../molecules/CredencialesSeguridadForm'
import { RolAsignacion } from '../molecules/RolAsignacion'
import { PlantelGradosForm } from '../molecules/PlantelGradosForm'
import { Icon } from '../../../utils/atoms/Icon'
import { useAdminNavigation } from '../../shared/hooks/useAdminNavigation'
import { useEffect, useState } from 'react'
import { teachersApi, usersApi, type ApiRole, type ApiTeacher } from '../../../utils/services/sigeanApi'
import { mapAuthError } from '../../../Login/services/authService'
import type { RolColaborador } from '../constants/roles'

const rolesApi: Record<Exclude<RolColaborador, ''>, ApiRole> = {
  maestro: 'TEACHER',
  prefecto: 'PREFECT',
  psicologo: 'PSYCHOLOGIST',
  servicios: 'ACADEMIC_SERVICES',
}

const datosIniciales: DatosPersonales = { nombres: '', primerApellido: '', segundoApellido: '' }

export function AltaColaboradorPage() {
  const [rolSeleccionado, setRolSeleccionado] = useState<RolColaborador>('')
  const [datos, setDatos] = useState<DatosPersonales>(datosIniciales)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(generarPassword)
  const [teacherId, setTeacherId] = useState('')
  const [docentes, setDocentes] = useState<ApiTeacher[]>([])
  const [cargandoDocentes, setCargandoDocentes] = useState(true)
  const [errorDocentes, setErrorDocentes] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [exito, setExito] = useState<string | null>(null)
  const navegar = useAdminNavigation()
  const volver = () => { window.location.hash = '#administrador/directorio' }

  useEffect(() => {
    const controller = new AbortController()
    teachersApi
      .list(controller.signal)
      .then(setDocentes)
      .catch((err) => {
        if (!controller.signal.aborted) setErrorDocentes(mapAuthError(err))
      })
      .finally(() => {
        if (!controller.signal.aborted) setCargandoDocentes(false)
      })
    return () => controller.abort()
  }, [])

  const crearCuenta = async () => {
    setError(null)
    setExito(null)
    const correo = email.trim().toLowerCase()
    const fullName = [datos.nombres, datos.primerApellido, datos.segundoApellido].map((v) => v.trim()).filter(Boolean).join(' ')
    if (!datos.nombres.trim() || !datos.primerApellido.trim()) return setError('Capture el nombre y el primer apellido.')
    if (!/^[^\s@]+@[^\s@]+$/.test(correo)) return setError('Capture un correo válido.')
    if (password.length < 8) return setError('La contraseña debe tener al menos 8 caracteres.')
    if (!rolSeleccionado) return setError('Seleccione un rol institucional.')
    const role = rolesApi[rolSeleccionado]
    if (role === 'TEACHER' && !teacherId) return setError('Seleccione el docente vinculado.')
    setEnviando(true)
    try {
      const usuario = await usersApi.register({
        username: correo.split('@')[0],
        email: correo,
        fullName,
        password,
        role,
        teacherId: role === 'TEACHER' ? Number(teacherId) : null,
      })
      setExito(`Cuenta creada para ${usuario.fullName ?? usuario.username} (${usuario.email}).`)
      setDatos(datosIniciales)
      setEmail('')
      setPassword(generarPassword())
      setTeacherId('')
      setRolSeleccionado('')
    } catch (err) {
      setError(mapAuthError(err))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <AdministradorTemplate vista='ALTA DE COLABORADOR' activeKey='directorio' onNavigate={navegar} busqueda='' onBuscar={() => {}} mostrarBusqueda={false}>
      <div className='mx-auto flex min-w-0 w-full max-w-[1000px] flex-col gap-6 px-4 py-6 text-base leading-normal sm:px-6 lg:px-8'>
        <div className='flex min-w-0 flex-wrap items-center justify-between gap-4 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-4 py-4 shadow-sm sm:px-5'>
          <div className='min-w-0'>
            <h1 className='text-2xl leading-tight font-extrabold text-[var(--sa-title)] sm:text-3xl'>Registro y Alta Integral de Colaborador Institucional</h1>
            <p className='mt-2 max-w-[100ch] text-sm leading-relaxed text-[var(--sa-muted)]'>Cree el perfil institucional, genere credenciales seguras de acceso y configure la gobernanza de permisos clínicos y pedagógicos con estricta observancia a las leyes LGDNNA y FERPA</p>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='rounded-full bg-[color-mix(in_srgb,var(--color-forest)_20%,transparent)] px-3 py-1 text-[10px] font-bold text-[var(--color-forest)]'>REGISTRO ACTIVO DE SISTEMA</span>
            <button type='button' onClick={volver} className='inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--sa-border)] px-4 text-sm font-semibold hover:bg-[var(--sa-field)]'>
              <Icon name='arrow-left' size={17} />
              Volver al Directorio
            </button>
            <button type='button' onClick={() => void crearCuenta()} disabled={enviando} className='inline-flex min-h-8 items-center gap-1.5 rounded-lg bg-[var(--color-forest)] px-3 text-xs font-bold text-[var(--sa-on-accent)] hover:brightness-95 disabled:opacity-60'>
              <Icon name='save' size={14} />
              {enviando ? 'Creando cuenta…' : 'Crear Cuenta y Enviar Accesos'}
            </button>
          </div>
        </div>
        {error ? (
          <div role='alert' className='rounded-xl border border-[#C62828] bg-[#FFF4F4] px-4 py-3 text-sm font-bold text-[#C62828]'>{error}</div>
        ) : null}
        {exito ? (
          <div role='status' className='rounded-xl border border-[var(--color-forest)] bg-[color-mix(in_srgb,var(--color-forest)_12%,transparent)] px-4 py-3 text-sm font-bold text-[var(--color-forest)]'>{exito}</div>
        ) : null}
        <div className='grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2'>
          <DatosPersonalesForm valores={datos} onCambiar={(campo, valor) => setDatos((previo) => ({ ...previo, [campo]: valor }))} />
          <CredencialesSeguridadForm email={email} password={password} onEmail={setEmail} onPassword={setPassword} />
        </div>
        <RolAsignacion rolSeleccionado={rolSeleccionado} onSelect={setRolSeleccionado} />
        {rolSeleccionado === 'maestro' ? (
          <div className='flex min-w-0 flex-col gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-4 py-4 shadow-sm'>
            <label htmlFor='teacher-id' className='text-sm font-semibold'>Docente Vinculado *</label>
            <select id='teacher-id' value={teacherId} onChange={(e) => setTeacherId(e.target.value)} disabled={cargandoDocentes || docentes.length === 0} className='h-11 min-w-0 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-sm disabled:opacity-60'>
              <option value=''>{cargandoDocentes ? 'Cargando docentes…' : docentes.length === 0 ? 'No hay docentes disponibles' : 'Seleccione un docente'}</option>
              {docentes.map((docente) => (
                <option key={docente.id} value={docente.id}>{`${docente.lastName} ${docente.firstName}`.trim()}</option>
              ))}
            </select>
            {errorDocentes ? <span role='alert' className='text-[18px] font-bold text-[#C62828]'>{errorDocentes}</span> : null}
          </div>
        ) : null}
        <PlantelGradosForm />
        <div className='flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-4 py-4 shadow-sm'>
          <div className='flex min-w-0 items-start gap-2 text-xs leading-relaxed text-[var(--sa-muted)]'>
            <Icon name='shield' size={16} className='mt-0.5 shrink-0' />
            <span>Validación de privacidad y datos personales conforme a lineamientos institucionales. No se almacena información sensible en URL ni logs.</span>
          </div>
          <div className='grid w-full grid-cols-1 gap-2 sm:flex sm:w-auto sm:flex-wrap'>
            <button type='button' onClick={volver} className='inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-[var(--sa-border)] px-3 text-xs font-semibold hover:bg-[var(--sa-field)]'>Cancelar y Descartar</button>
            <button type='button' className='inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-[var(--sa-border)] px-3 text-xs font-semibold hover:bg-[var(--sa-field)]'>Guardar como Borrador</button>
            <button type='button' onClick={() => void crearCuenta()} disabled={enviando} className='inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[var(--color-forest)] px-3 text-xs font-bold text-[var(--sa-on-accent)] hover:brightness-95 disabled:opacity-60'>Crear Cuenta y Notificar al Colaborador</button>
          </div>
        </div>
      </div>
    </AdministradorTemplate>
  )
}
