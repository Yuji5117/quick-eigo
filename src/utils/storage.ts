type StorageType = 'localStorage' | 'sessionStorage'

const getStorage = (type: StorageType): Storage => {
  return type === 'localStorage' ? localStorage : sessionStorage
}

export const createStorageUtils = (storageType: StorageType = 'localStorage') => {
  const storage = getStorage(storageType)

  return {
    get<T>(key: string): T | null {
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
      try {
        storage.setItem(key, JSON.stringify(value))
        return true
      } catch (error) {
        console.error(`Storage set error (${key}):`, error)
        return false
      }
    },

    remove(key: string): void {
      storage.removeItem(key)
    },

    exists(key: string): boolean {
      return storage.getItem(key) !== null
    },

    clear(): void {
      storage.clear()
    },
  }
}

export const storageUtils = createStorageUtils('localStorage')
