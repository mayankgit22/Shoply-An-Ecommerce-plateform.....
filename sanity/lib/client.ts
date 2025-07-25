import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId,apiToken } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, 
  token:apiToken
})
