import { type Category, type CategoryFromApi } from 'features/Categories/types'

export const categoryFromApi = ({ id, name }: CategoryFromApi): Category => {
  return {
    id,
    name,
  }
}
