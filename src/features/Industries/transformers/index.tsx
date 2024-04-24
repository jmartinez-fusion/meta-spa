import { type Industry, type IndustryFromApi } from 'src/features/Industries/types'

export const industryFromApi = ({ id, name }: IndustryFromApi): Industry => {
  return {
    id,
    name,
  }
}
