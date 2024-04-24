import * as React from 'react'
import TableWithActions from './TableWithActions'

type Props = Record<string, any>

function withActions<P extends Props>(Component: React.ComponentType<P>): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props: P) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return <TableWithActions as={Component} {...props} />
  }

  return WrappedComponent
}

export default withActions
