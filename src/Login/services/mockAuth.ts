import { ApiError } from '../../utils/services/apiClient'
import type { AuthCredentials, AuthSession } from '../types/auth'

const MOCK_DELAY_MS = 900
const LOCAL_DEMO_EMAIL = 'servicios@sep.gob.mx'
const LOCAL_DEMO_PASSWORD = 'NexusLocal2026!'

export const MOCK_NOT_PROVISIONED_MESSAGE =
  'Acceso dado de alta exclusivamente por la Administración Escolar. Contacte a la Mesa de Ayuda (Ext. 142).'

export function mockSignIn(
  credentials: AuthCredentials,
  options: { signal?: AbortSignal } = {}
): Promise<AuthSession> {
  return new Promise((resolve, reject) => {
    const abort = () => {
      window.clearTimeout(timeoutId)
      reject(new DOMException('Aborted', 'AbortError'))
    }
    const timeoutId = window.setTimeout(() => {
      options.signal?.removeEventListener('abort', abort)
      if (!import.meta.env.DEV) {
        reject(new ApiError(MOCK_NOT_PROVISIONED_MESSAGE, 403, 'ACCOUNT_NOT_PROVISIONED'))
        return
      }

      if (
        credentials.email.trim().toLowerCase() !== LOCAL_DEMO_EMAIL ||
        credentials.password !== LOCAL_DEMO_PASSWORD
      ) {
        reject(new ApiError('Correo o contraseña incorrectos.', 401, 'INVALID_CREDENTIALS'))
        return
      }

      resolve({
        token: 'local-demo-token',
        user: {
          id: 'local-demo-services',
          username: 'servicios',
          email: LOCAL_DEMO_EMAIL,
          fullName: 'Usuario local de prueba',
          role: 'ACADEMIC_SERVICES',
          teacherId: null,
        },
      })
    }, MOCK_DELAY_MS)

    if (options.signal?.aborted) {
      abort()
      return
    }
    options.signal?.addEventListener('abort', abort, { once: true })
  })
}
