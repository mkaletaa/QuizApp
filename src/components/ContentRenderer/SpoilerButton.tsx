import React from 'react'
import { Button } from 'react-native-paper'
import useStore from '../../utils/store'
import { showSpoiler } from '../../../data/texts'

export default function SpoilerButton({ value, props }) {
  const setShowBottomSheet = useStore(state => state.setShowBottomSheet)
  const setBottomSheetSnapIndex = useStore(
    state => state.setBottomSheetSnapIndex
  )
  const setBottomSheetContent = useStore(state => state.setBottomSheetContent)

  function openBottomSheet() {
    setBottomSheetContent(value)
    setBottomSheetSnapIndex(props?.index || 0)
    setShowBottomSheet(true)
  }

  return (
    <Button mode="contained" onPress={openBottomSheet}>
      {props?.text || showSpoiler}
    </Button>
  )
}