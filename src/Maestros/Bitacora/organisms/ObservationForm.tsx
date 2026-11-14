import { useState } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { ContextSummary } from '../molecules/ContextSummary'
import { FormField } from '../molecules/FormField'
import { ObservationTypeOption } from '../molecules/ObservationTypeOption'
import { NotificationToggle } from '../molecules/NotificationToggle'
import { observacionModal } from '../constants/observacionModal'
import type { BitacoraAlumno, Observacion } from '../types'

interface ObservationFormProps {
  alumno: BitacoraAlumno
  variant: 'modal' | 'page'
  demoMode?: boolean
  titleId?: string
  onSave: (observacion: Observacion) => void
  onClose?: () => void
}

export function ObservationForm({
  alumno,
  variant,
  demoMode = false,
  titleId,
  onSave,
  onClose,
}: ObservationFormProps) {
  const large = variant === 'page'
  const cx = (small: string, big: string) => (large ? big : small)

  const [asignaturaId, setAsignaturaId] = useState(observacionModal.asignaturas[0].id)
  const [tipoId, setTipoId] = useState(observacionModal.tipos[0].id)
  const [descripcion, setDescripcion] = useState(observacionModal.descripcion.defaultText)
  const [notificar, setNotificar] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)
  const [saved, setSaved] = useState(false)

  const { header, asignatura, fecha, tipo, descripcion: desc, footer } = observacionModal
  const fechaTexto = demoMode
    ? `Vista previa · ${new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())}`
    : fecha.value

  const controlClasses = cn(
    'w-full rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] font-semibold text-[var(--color-text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--sa-accent)] focus-visible:outline-none',
    cx('h-[52px] px-4 text-base', 'h-12 px-4 text-base')
  )

  const handleSave = () => {
    if (descripcion.trim() === '') {
      setError(true)
      return
    }

    const asignaturaSel = observacionModal.asignaturas.find((a) => a.id === asignaturaId)!
    const tipoSel = observacionModal.tipos.find((t) => t.id === tipoId)!

    const nueva: Observacion = {
      id: `obs-${Date.now()}`,
      tone: tipoSel.tone,
      icon: tipoSel.icon,
      fecha: new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(new Date()),
      hora: new Intl.DateTimeFormat('es-MX', { hour: '2-digit', minute: '2-digit' }).format(new Date()),
      lugar: alumno.grupo,
      materia: asignaturaSel.materia,
      docente: demoMode ? 'Docente de ejemplo' : asignaturaSel.docente,
      materiaIcon: asignaturaSel.materiaIcon,
      categoria: tipoSel.categoria,
      nota: [{ text: descripcion.trim() }],
      chipsLabel: demoMode ? 'Datos de ejemplo:' : 'Estrategias DUA:',
      chips: demoMode ? ['Registro local de prueba'] : [desc.pautaLabel],
      link: demoMode
        ? { label: 'Vista previa · no sincronizado', icon: 'info' }
        : notificar
          ? { label: 'Notificado a Psicología y anexado al expediente', icon: 'check', tone: 'steel' }
          : { label: 'Sin notificación al Gabinete', icon: 'info' },
      filtro: asignaturaSel.filtro,
    }

    setSaving(true)
    window.setTimeout(() => {
      onSave(nueva)
      if (variant === 'modal') {
        onClose?.()
        return
      }
      setSaving(false)
      setSaved(true)
    }, 700)
  }

  const handleCancel = () => {
    if (variant === 'modal') {
      onClose?.()
      return
    }
    setAsignaturaId(observacionModal.asignaturas[0].id)
    setTipoId(observacionModal.tipos[0].id)
    setDescripcion(desc.defaultText)
    setNotificar(true)
    setError(false)
    setSaved(false)
  }

  return (
    <div className={cn('flex flex-col', large ? '' : 'min-h-0 flex-1')}>
      <header
        className={cn(
          'flex shrink-0 items-start justify-between bg-[var(--sa-modal-header)]',
          cx('gap-4 px-8 py-6', 'gap-4 px-6 py-5')
        )}
      >
        <div>
          <div className={cn('flex flex-wrap items-center', cx('gap-3', 'gap-4'))}>
            <span
              className={cn(
                'inline-flex items-center rounded-full bg-[var(--sa-avatar)] font-extrabold text-white',
                cx('gap-2 px-3 py-1.5 text-sm', 'gap-2 px-3 py-1.5 text-sm')
              )}
            >
              <Icon name={header.pill.icon} size={large ? 20 : 15} color="currentColor" />
              {header.pill.label}
            </span>
            <span
              className={cn(
                'rounded-full bg-[var(--sa-chip-gray)] font-bold text-[var(--sa-chip-gray-text)]',
                cx('px-3 py-1.5 text-[13px]', 'px-3 py-1.5 text-sm')
              )}
            >
              {header.badge}
            </span>
          </div>
          <h2
            id={titleId}
            className={cn(
              'leading-tight font-bold text-[var(--color-text-primary)]',
              cx('mt-3 text-[32px]', 'mt-3 text-[28px]')
            )}
          >
            {header.title}
          </h2>
        </div>
        {variant === 'modal' ? (
          <button
            type="button"
            onClick={onClose}
            aria-label={header.closeLabel}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-chip-gray)] text-[var(--color-text-primary)] hover:brightness-95 focus-visible:ring-2 focus-visible:ring-[var(--sa-accent)] focus-visible:outline-none"
          >
            <Icon name="x" size={20} color="currentColor" />
          </button>
        ) : null}
      </header>

      <div
        className={cn(
          'bg-[var(--sa-card)]',
          large
            ? 'flex flex-col gap-y-10 px-5 py-4'
            : 'flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-8 py-6'
        )}
      >
        {saved ? (
          <p
            role="status"
            className="flex items-center gap-2 rounded-xl bg-[var(--sa-pauta-bg)] px-5 py-3 text-base font-bold text-[var(--sa-accent)]"
          >
            <Icon name="circle-check" size={20} color="currentColor" />
            Observación guardada y sincronizada con el expediente.
          </p>
        ) : null}

        <ContextSummary alumno={alumno} large={large} demoMode={demoMode} />

        <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-x-6', cx('gap-y-4', 'gap-y-8'))}>
          <FormField
            icon={asignatura.icon}
            label={asignatura.label}
            help={asignatura.help}
            htmlFor="obs-asignatura"
            large={large}
          >
            <div className="relative">
              <select
                id="obs-asignatura"
                value={asignaturaId}
                onChange={(event) => setAsignaturaId(event.target.value)}
                className={cn(controlClasses, 'appearance-none pr-11')}
              >
                {observacionModal.asignaturas.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[var(--sa-muted)]">
                <Icon name="chevron-down" size={large ? 22 : 18} color="currentColor" />
              </span>
            </div>
          </FormField>

          <FormField
            icon={fecha.icon}
            label={fecha.label}
            help={fecha.help}
            htmlFor="obs-fecha"
            large={large}
          >
            <div className="relative">
              <input
                id="obs-fecha"
                type="text"
                readOnly
                value={fechaTexto}
                className={cn(controlClasses, 'pr-11')}
              />
              <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[var(--sa-muted)]">
                <Icon name="calendar" size={large ? 22 : 18} color="currentColor" />
              </span>
            </div>
          </FormField>
        </div>

        <fieldset>
          <legend
            className="font-bold text-sm text-[var(--color-text-primary)]"
          >
            <span className="inline-flex items-center gap-2">
              <Icon name={tipo.icon} size={16} color="var(--sa-accent)" />
              {tipo.label}
            </span>
          </legend>
          <div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-x-4', cx('mt-2 gap-y-3', 'mt-4 gap-y-6'))}>
            {observacionModal.tipos.map((option) => (
              <ObservationTypeOption
                key={option.id}
                name="obs-tipo"
                type={option}
                checked={option.id === tipoId}
                large={large}
                onSelect={setTipoId}
              />
            ))}
          </div>
        </fieldset>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="obs-descripcion"
              className={cn(
                'inline-flex items-center gap-2 font-bold text-[var(--color-text-primary)]',
                'text-sm'
              )}
            >
              <Icon name={desc.icon} size={16} color="var(--sa-accent)" />
              {desc.label}
            </label>
            <span
              className={cn(
                'rounded-full bg-[var(--sa-pauta-bg)] font-bold text-[var(--sa-accent)]',
                cx('px-3 py-1.5 text-[13px]', 'px-3 py-1.5 text-xs')
              )}
            >
              {desc.pautaLabel}
            </span>
          </div>
          <p className={cn(large ? 'mt-4 text-sm' : 'mt-2 text-base', 'text-[var(--sa-muted)]')}>
            {desc.help}
          </p>
          <textarea
            id="obs-descripcion"
            value={descripcion}
            onChange={(event) => {
              setDescripcion(event.target.value)
              if (error) setError(false)
            }}
            aria-invalid={error}
            className={cn(
              'w-full rounded-xl border bg-[var(--sa-card)] leading-[1.6] text-[var(--color-text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--sa-accent)] focus-visible:outline-none',
              cx('mt-2 min-h-[120px] px-4 py-3 text-base', 'mt-4 min-h-[128px] px-4 py-3 text-base'),
              error ? 'border-[#B42318]' : 'border-[var(--sa-input-border)]'
            )}
          />
          <div className={cn('flex items-center justify-between gap-2', large ? 'mt-4' : 'mt-2')}>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 text-[var(--sa-muted)]',
                large ? 'text-sm' : 'text-base'
              )}
            >
              <Icon name={desc.calidadIcon} size={14} color="var(--sa-accent)" />
              {desc.calidad}
            </span>
            <span
              className={cn('font-bold text-[var(--color-text-primary)]', large ? 'text-sm' : 'text-base')}
            >
              {descripcion.length} caracteres
            </span>
          </div>
          {error ? (
            <p role="alert" className={cn('mt-1 font-bold text-[#B42318]', large ? 'text-sm' : 'text-base')}>
              {footer.error}
            </p>
          ) : null}
        </div>

        <NotificationToggle checked={notificar} large={large} demoMode={demoMode} onChange={setNotificar} />
      </div>

      <footer
        className={cn(
          'flex shrink-0 flex-col-reverse bg-[var(--sa-modal-footer)] sm:flex-row sm:justify-end',
          cx('gap-4 px-8 py-4', 'gap-3 px-5 py-3')
        )}
      >
        <button
          type="button"
          onClick={handleCancel}
          disabled={saving}
          className={cn(
            'inline-flex w-full items-center justify-center rounded-xl bg-[var(--sa-chip-gray)] font-bold text-[var(--color-text-primary)] hover:brightness-95 focus-visible:ring-2 focus-visible:ring-[var(--sa-accent)] focus-visible:outline-none disabled:opacity-60 sm:w-auto',
            cx('h-14 gap-2.5 px-7 text-[18px]', 'h-12 gap-2 px-5 text-base')
          )}
        >
          <Icon name={footer.cancel.icon} size={large ? 20 : 20} color="currentColor" />
          {footer.cancel.label}
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={cn(
            'inline-flex w-full items-center justify-center rounded-xl bg-[var(--color-forest)] font-bold text-[var(--sa-on-accent)] shadow-[0_4px_10px_rgba(34,82,74,0.25)] hover:brightness-95 focus-visible:ring-2 focus-visible:ring-[var(--sa-accent)] focus-visible:outline-none disabled:opacity-70 sm:w-auto',
            cx('h-14 gap-2.5 px-7 text-[18px]', 'h-12 gap-2 px-5 text-base')
          )}
        >
          <Icon name={footer.save.icon} size={large ? 20 : 20} color="currentColor" />
          {saving ? footer.savingLabel : footer.save.label}
        </button>
      </footer>
    </div>
  )
}
