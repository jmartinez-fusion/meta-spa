import dayjs, { type Dayjs } from 'dayjs'

function dateFormat(
  date: string | Date | number | Dayjs | null | undefined,
  toFormat = 'MM/DD/YYYY',
  fromFormat?: string
): string {
  if (!date) {
    return ''
  }

  const dateValue: Dayjs = dayjs(date, fromFormat)

  if (dateValue.isValid() && dateValue.format(toFormat) !== 'Invalid date') {
    return dateValue.format(toFormat)
  }

  return ''
}

export default dateFormat
