
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-07-03'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET||"production",
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||"ssrvg6nb",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
) 
export const apiToken=assertValue(
  process.env.SANITY_API_TOKEN ||'skc0IZHFQMpUS6zK0kqKsCGCVmfx5F5DIS4UlMK285PqbaUqjkbXua1W7FkdbR55kYRB2DWeEhFUTxSVhkVGsdPF5onsUIBDRcOrT4K5RwUpsPW38ThcDECsxpLNXfVgLBZvd8bsf9TpaQEZuRA0DSAh90lyPIdkrLJzWlSXe5MtuKyliER3;',
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
