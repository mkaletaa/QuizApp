import React, { useRef } from 'react'
import { View, Text, Button } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'

const MyBottomSheet = () => {
  const bottomSheetRef = useRef(null)

  const openBottomSheet = () => {
    bottomSheetRef.current.expand()
  }

  const closeBottomSheet = () => {
    bottomSheetRef.current.close()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Bottom Sheet" onPress={openBottomSheet} />
      <BottomSheet
        ref={bottomSheetRef}
        index={1} // Ustawiamy indeks na 1, aby dolny arkusz był częściowo otwarty na starcie
        snapPoints={['50%', '90%']} // Ustawiamy punkty przyciągania na odpowiednie wartości procentowe
        style={{ backgroundColor: 'white' }}
        enablePanDownToClose // Włączamy możliwość zamknięcia arkusza przez przeciągnięcie w dół
      >
        <View style={{ padding: 16 }}>
          <Text>Content inside the bottom sheet</Text>
          <Button title="Close Bottom Sheet" onPress={closeBottomSheet} />
        </View>
      </BottomSheet>
    </View>
  )
}

export default MyBottomSheet
