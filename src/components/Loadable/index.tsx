import React, { Suspense, type ComponentType } from 'react'

// project imports
import Loader from './Loader'

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

function Loadable(Component: ComponentType): React.FC {
  return function Wrapper(props): React.ReactElement {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    )
  }
}

export default Loadable
