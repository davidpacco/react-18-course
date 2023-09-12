const RANDOM_FACT_API = 'https://catfact.ninja/fact'

export const getRandomFact = async () => {
  const response = await fetch(RANDOM_FACT_API)
  const data = await response.json()
  return data.fact
}