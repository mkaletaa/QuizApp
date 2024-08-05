import React from 'react'
import { Button } from 'react-native-paper'
import useStore from '../../utils/store'

export default function SpoilerButton({ value, props }) {
  const setShowBottomSheet = useStore(state => state.setShowBottomSheet)
  const setBottomSheetContent = useStore(state => state.setBottomSheetContent)

  function openBottomSheet() {
    setBottomSheetContent(value)
    setShowBottomSheet(true)
  }
  
  return (
    <Button mode="contained" onPress={openBottomSheet}>
      Pokaż spoiler
    </Button>
  )
}
