/**
 * Colocamos la barra  '/'  al inicio y al final, para que nos tome el valor como expresión
 * regular y no como string.
 */
export const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/