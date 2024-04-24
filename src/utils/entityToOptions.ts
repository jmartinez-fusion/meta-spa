type Entity = Record<string, any>

export interface OptionConfig {
  fieldValue?: string
  fieldLabel?: string
}

export default function entitiesToOptions(
  entities: Entity[] = [],
  options?: OptionConfig
): Array<{ name: any; value: any }> {
  return entities?.map((entity) => entityToOption(entity, options)) || []
}

export function entityToOption(
  entity: Entity,
  { fieldValue = 'id', fieldLabel = 'name' }: OptionConfig = {}
): { name: any; value: any } {
  return {
    name: entity[fieldLabel] || entity.name,
    value: entity[fieldValue] !== undefined ? entity[fieldValue] : entity.value,
  }
}
