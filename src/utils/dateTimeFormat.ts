import dayjs, { type Dayjs } from 'dayjs'

function dateTimeFormat(
  dateTime: string | Date | number | Dayjs | null | undefined,
  toFormat = 'MM/DD/YYYY h:mm A',
  fromFormat?: string | undefined
): string | undefined {
  if (!dateTime) {
    return undefined
  }

  const dateTimeValue: Dayjs = dayjs(dateTime, fromFormat)

  if (dateTimeValue.isValid() && dateTimeValue.format(toFormat) !== 'Invalid date') {
    return dateTimeValue.format(toFormat)
  }

  return undefined
}

export default dateTimeFormat
