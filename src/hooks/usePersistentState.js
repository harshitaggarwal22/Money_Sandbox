import { useState } from 'react'
import { readStored, writeStored } from '../utils/storage'

export function usePersistentState(key, fallback) {
  const [value, setValue] = useState(() => readStored(key, fallback))
  const update = (next) => setValue(previous => { const resolved = typeof next === 'function' ? next(previous) : next; writeStored(key, resolved); return resolved })
  return [value, update]
}
