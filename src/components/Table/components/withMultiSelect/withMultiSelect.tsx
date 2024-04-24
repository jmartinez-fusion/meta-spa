import MultiSelectTable, { type MultiSelectTableProps } from './MultiSelectTable'
import { type ComponentType } from 'react'

function withMultiSelect<P>(Component: ComponentType<P & MultiSelectTableProps>) {
  return function Wrapped(props: P & MultiSelectTableProps) {
    return <MultiSelectTable as={Component} {...props} />
  }
}

export default withMultiSelect
