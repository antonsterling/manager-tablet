/** Clave única de sesión en sessionStorage (debe coincidir en login/logout). */
export const SESSION_USER_KEY = 'currentUser'

/**
 * Usuario válido en sesión o null si no hay sesión usable.
 * Evita tratar como "logueado" valores como "", "null", "{}" roto o JSON inválido.
 */
export function getSessionUser() {
  const raw = sessionStorage.getItem(SESSION_USER_KEY)
  if (raw == null || raw === '' || raw === 'null' || raw === 'undefined') return null
  try {
    const u = JSON.parse(raw)
    if (u == null || typeof u !== 'object' || Array.isArray(u)) return null
    return u
  } catch {
    return null
  }
}

export function clearSessionUser() {
  sessionStorage.removeItem(SESSION_USER_KEY)
}
