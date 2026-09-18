export function readStored(key, fallback) { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback } catch { return fallback } }
export function writeStored(key, value) { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* Demo continues when storage is unavailable. */ } }
