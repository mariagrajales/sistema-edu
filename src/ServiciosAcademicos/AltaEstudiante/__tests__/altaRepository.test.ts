import { describe, expect, it } from 'vitest'
import { crearBorradorInicial } from '../services/altaFactory'
import {
  crearBorrador,
  finalizarAlta,
  guardarBorrador,
  listarEstudiantesAlta,
} from '../services/altaRepository'

describe('repositorio de altas en memoria', () => {
  it('crea borradores sin asignar automáticamente la matrícula', async () => {
    const primero = await crearBorrador()
    const segundo = await crearBorrador()

    expect(primero.id).not.toBe(segundo.id)
    expect(primero.matriculaProvisional).toBe('')
    expect(segundo.matriculaProvisional).toBe('')
  })

  it('finaliza una sola vez aunque se repita la confirmación', async () => {
    const borrador = crearBorradorInicial('alta-idempotente', 'NX-2024-999')
    await guardarBorrador(borrador)
    const primero = await finalizarAlta(borrador.id)
    const segundo = await finalizarAlta(borrador.id)
    const estudiantes = await listarEstudiantesAlta()

    expect(segundo).toEqual(primero)
    expect(estudiantes.filter((estudiante) => estudiante.matricula === 'NX-2024-999')).toHaveLength(
      1
    )
  })
})
