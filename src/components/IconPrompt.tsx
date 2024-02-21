import { View, Text, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { useState } from 'react'

export default function IconPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginBottom: 30,
        paddingRight: 10,
      }}
    >
      <Entypo
        name="dots-three-vertical"
        size={28}
        color="black"
        style={{
          position: 'absolute',
          top: 10,
          right: 20,
        }}
        onPress={() => {
          setShowPrompt(prev => !prev)
        }}
      />

      {showPrompt && (
        <View
          style={{
            position: 'absolute',
            top: 40,
            right: 60,
            flexDirection: 'row',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 6,
            // gap: 15,
            alignItems: 'center',
            // justifyContent: 'space-around',
            zIndex: 1,
          }}
        >
          <Button title="report a mistake" color="red" />
          <View
            style={{
              height: '100%',
              width: 1,
              backgroundColor: '#ccc',
              marginHorizontal: 10,
            }}
          />
          <AntDesign name="star" size={35} color="gold" />
        </View>
      )}
    </View>
  )
}
