export function getString(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value : ''
}

export function getNumber(formData: FormData, key: string): number {
  const value = formData.get(key)
  if (typeof value === 'string') {
    const parsed = Number(value)
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}
