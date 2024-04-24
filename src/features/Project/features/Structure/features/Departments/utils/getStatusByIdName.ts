interface Status {
  id: number
  name: string
}

const statusArray: Status[] = [
  { id: 1, name: 'not started' },
  { id: 2, name: 'in process' },
  { id: 3, name: 'route for review' },
  { id: 4, name: 'returned' },
  { id: 5, name: 'approved' },
]

const getStatusIdByName = (statusName: string): number | undefined => {
  const foundStatus = statusArray.find((status) => status.name === statusName)
  return foundStatus?.id
}

export default getStatusIdByName
