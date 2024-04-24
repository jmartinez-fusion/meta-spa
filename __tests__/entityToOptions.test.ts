// Import functions to be tested
import entitiesToOptions, { entityToOption } from '../src/utils/entityToOptions'

// Define test data
const entity1 = { id: 1, name: 'John Doe', lastName: 'Doe', email: 'john.doe@example.com' }
const entity2 = { id: 2, name: 'Jane Doe', lastName: 'Doe', email: 'jane.doe@example.com' }
const entities = [entity1, entity2]

describe('entitiesToOptions', () => {
  it('should return an empty array if no entities are provided', () => {
    expect(entitiesToOptions()).toEqual([])
  })

  it('should convert an array of entities to an array of options', () => {
    const expectedOptions = [
      { name: 'John Doe', value: 1 },
      { name: 'Jane Doe', value: 2 },
    ]

    expect(entitiesToOptions(entities)).toEqual(expectedOptions)
  })

  it('should use custom fieldValue and fieldLabel if provided', () => {
    const options = { fieldValue: 'email', fieldLabel: 'lastName' }
    const expectedOptions = [
      { name: entity1.lastName, value: entity1.email },
      { name: entity2.lastName, value: entity2.email },
    ]

    expect(entitiesToOptions(entities, options)).toEqual(expectedOptions)
  })
  it('should return an empty array when entities is undefined', () => {
    const result = entitiesToOptions(undefined)
    expect(result).toEqual([])
  })
})

describe('entityToOption', () => {
  it('should convert an entity to an option', () => {
    const expectedOption = { name: 'John Doe', value: 1 }
    expect(entityToOption(entity1)).toEqual(expectedOption)
  })

  it('should use custom fieldValue and fieldLabel if provided', () => {
    const options = { fieldValue: 'email', fieldLabel: 'lastName' }
    const expectedOption = { name: entity1.lastName, value: entity1.email }

    expect(entityToOption(entity1, options)).toEqual(expectedOption)
  })

  it('should use the entity name if fieldLabel is not present', () => {
    const option = entityToOption({ id: 1, email: 'john.doe@example.com', name: 'John Doe' })
    expect(option.name).toBe('John Doe')
  })

  it('should use the entity value if fieldValue is not present and undefined', () => {
    const option = entityToOption({ name: 'John Doe', value: 'john.doe' })
    expect(option.value).toBe('john.doe')
  })
})
