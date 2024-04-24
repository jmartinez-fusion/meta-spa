import * as React from 'react'
import PaginatedTable from './PaginatedTable'

type Props = any

// Se define la función y sus tipos
function withPagination<P extends Props>(Component: React.ComponentType<P>): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props: any) => {
    return <PaginatedTable as={Component} {...props} />
  }

  return WrappedComponent
}

export default withPagination
