import { useCallback, useEffect, useState } from 'react'

type Item = any

type CallbackFunction = (updatedState: Item[]) => void

interface SelectionActions {
  handleDeselectAll: (callback?: CallbackFunction) => void
  handleDeselectOne: (item: Item, callback?: CallbackFunction) => void
  handleSelectAll: (callback?: CallbackFunction) => void
  handleSelectOne: (item: Item, callback?: CallbackFunction) => void
  selected: Item[]
}

export const useSelection = (items: Item[] = []): SelectionActions => {
  const [selected, setSelected] = useState<Item[]>([])

  useEffect(() => {
    setSelected([])
  }, [])

  const handleSelectAll = useCallback(
    (callback?: CallbackFunction) => {
      const updatedState = [...items]
      setSelected(updatedState)
      callback?.(updatedState)
    },
    [items]
  )

  const handleSelectOne = useCallback((item: Item, callback?: CallbackFunction) => {
    setSelected((prevState) => {
      const updatedState = [...prevState, item]
      callback?.(updatedState)
      return updatedState
    })
  }, [])

  const handleDeselectAll = useCallback((callback?: CallbackFunction) => {
    setSelected([])
    // eslint-disable-next-line n/no-callback-literal
    callback?.([])
  }, [])

  const handleDeselectOne = useCallback((item: Item, callback?: CallbackFunction) => {
    setSelected((prevState) => {
      const updatedState = prevState.filter((_item) => _item !== item)
      callback?.(updatedState)
      return updatedState
    })
  }, [])

  return {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    selected,
  }
}
