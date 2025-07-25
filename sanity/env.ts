
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
  process.env.SANITY_API_TOKEN ||'skyr1mgXzEpGDteoCHDnYoJsH37Tex5iiKMuT6GrkbMGvG81OfzS4ZhpOBZvnJpPowmj6EvBw6xsHcZm3RswoenmaWrJPCr8IXNbYp6hnoXfjWTcKtm2TVFbO32E92w1wNclHGvshr2ZzaO2c1EQSi6hPGLq5mpVTXf49V5mYcNB3EtqCDjG',
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
