import $host from '../utils/axios'

export async function startingLogsAnalysis() {
  const { data } = await $host.get('/defineTheme/')
  return data
}
