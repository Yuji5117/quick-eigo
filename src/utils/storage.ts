type StorageType = 'localStorage' | 'sessionStorage'

const getStorage = (type: StorageType): Storage | null => {
  if (typeof window === 'undefined') {
    return null
  }
  return type === 'localStorage' ? localStorage : sessionStorage
}

export const createStorageUtils = (storageType: StorageType = 'localStorage') => {
  const storage = getStorage(storageType)

  return {
    get<T>(key: string): T | null {
      if (!storage) return null
      try {
        const item = storage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (error) {
        console.error(`Storage get error (${key}):`, error)
        storage.removeItem(key)
        return null
      }
    },

    set<T>(key: string, value: T): boolean {
      if (!storage) return false
      try {
        storage.setItem(key, JSON.stringify(value))
        return true
      } catch (error) {
        console.error(`Storage set error (${key}):`, error)
        return false
      }
    },

    remove(key: string): void {
      if (!storage) return
      storage.removeItem(key)
    },

    exists(key: string): boolean {
      if (!storage) return false
      return storage.getItem(key) !== null
    },

    clear(): void {
      if (!storage) return
      storage.clear()
    },
  }
}

export const storageUtils = createStorageUtils('localStorage')
