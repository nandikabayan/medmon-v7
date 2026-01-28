const modules = import.meta.glob(
  '/src/app/usecase/**/*.usecase.ts',
  { eager: true }
) as Record<string, Record<string, Function>>

function createEmptyHook(name: string) {
  const warn = (msg: string) => {
    if (import.meta.env.DEV) {
      console.warn(`[useHook] ${msg}`)
    }
  }

  warn(`Hook "${name}" not found`)

  return new Proxy(
    {},
    {
      get(_, prop) {
        warn(`"${String(prop)}" called on missing hook "${name}"`)
        return () => {}
      }
    }
  )
}

export function useHook(registry: string) {
  const normalized = registry.toLowerCase()

  const entry = Object.entries(modules).find(([path]) =>
    path.toLowerCase().endsWith(`${normalized}.usecase.ts`)
  )

  if (!entry) return createEmptyHook(registry)

  const [, mod] = entry
  const hookName =
    `use${registry.charAt(0).toUpperCase()}${registry.slice(1)}`

  const hook = mod[hookName]

  if (typeof hook !== 'function') {
    return createEmptyHook(registry)
  }

  return hook()
}
