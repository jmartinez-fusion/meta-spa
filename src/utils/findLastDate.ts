import { type Dayjs } from 'dayjs'

export function findLastDate(arr: Dayjs[]): Dayjs | null {
  if (arr.length === 0) return null

  let largestDate: Dayjs = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].isAfter(largestDate)) {
      largestDate = arr[i]
    }
  }
  return largestDate
}
