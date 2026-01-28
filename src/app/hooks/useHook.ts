const modules = import.meta.glob(
  '/src/app/usecase/**/*.usecase.ts',
  { eager: true }
) as Record<string, Record<string, Function>>

export function useHook(registry: string) {
  const hookFile = Object.entries(modules).find(([path]) =>
    path.toLowerCase().endsWith(`${registry.toLowerCase()}.usecase.ts`)
  )

  if (!hookFile) {
    throw new Error(`Hook "${registry}" not found`)
  }

  const [, mod] = hookFile

  const hookName =
    `use${registry.charAt(0).toUpperCase()}${registry.slice(1)}`

  return mod[hookName]()
}
