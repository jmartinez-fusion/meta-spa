import * as React from 'react'
import SortableTable from 'components/Table/components/withSortHeader/SortableTable.tsx'

type Props = any

// Se define la función y sus tipos
function withSortHeaders<P extends Props>(Component: React.ComponentType<P>): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props: any) => {
    return <SortableTable as={Component} {...props} />
  }

  return WrappedComponent
}

export default withSortHeaders
