import { AntDesign, Entypo } from '@expo/vector-icons'
import { useState } from 'react'
import { Button, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import sendAnEmail from '../../utils/functions'
import { Item } from '../../utils/types'

export default function IconPrompt({item}: {item: Item}) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const navigation = useNavigation()

  function handleMessageFn() {
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
    console.log('first')
  }

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
            top: 25,
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
          <Button
            title="report a mistake"
            color="red"
            //@ts-ignore
            onPress={() => {
              sendAnEmail("question id: " + item.id)
            }}
          />
          <View
            style={{
              height: '100%',
              width: 1,
              backgroundColor: '#ccc',
              marginHorizontal: 10,
            }}
          />
          <AntDesign
            onPress={() => handleMessageFn()}
            name="star"
            size={35}
            color="gold"
          />
        </View>
      )}

      {showMessage && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            top: 95,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              backgroundColor: 'lightblue',
              padding: 5,
              borderRadius: 10,
              zIndex: 2,
            }}
          >
            The question has been saved!
          </Text>
        </View>
      )}
    </View>
  )
}
