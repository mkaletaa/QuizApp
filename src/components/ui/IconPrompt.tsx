import { AntDesign, Entypo } from '@expo/vector-icons'
// import { AntDesign as staro } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import sendAnEmail from '../../utils/functions'
import { Item } from '../../utils/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function IconPrompt({ item }: { item: Item }) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [saved, setSaved] = useState(false)
  const navigation = useNavigation()
  const [message, setMessage] = useState<string>()

  // ...
  useEffect(() => {
    console.log('useEfefct')
    checkIfSaved() // Sprawdzenie stanu zapisanego po każdej zmianie 'saved'
  }, [saved, item.id])

  const checkIfSaved = async () => {
    try {
      console.log('sprawdzanko')

      const savedItems = await AsyncStorage.getItem('savedItems')
      const parsedSavedItems = savedItems ? JSON.parse(savedItems) : []
      if (parsedSavedItems.some(savedItem => savedItem === item.id))
        setSaved(true)
      else setSaved(false)
    } catch (error) {
      setSaved(false)
      console.error('Cannot check if the question is saved:', error)
    }
  }

  const removeItem = async () => {
    try {
      console.log('usuwanko')
      const savedItems = await AsyncStorage.getItem('savedItems')
      let parsedSavedItems = savedItems ? JSON.parse(savedItems) : []

      parsedSavedItems = parsedSavedItems.filter(
        savedItem => savedItem !== item.id
      )

      await AsyncStorage.setItem('savedItems', JSON.stringify(parsedSavedItems))
      setSaved(false)

      // setMessage('The question has been removed!')
    } catch (error) {
      setMessage('Something went wrong while removing the question')
      console.error('Error removing item:', error)
    }
  }

  // ...

  async function saveItem() {
    

    const value = item.id
    console.log("🚀 ~ saveItem ~ item.id:", item.id)

    try {
      console.log('dodawanko')
      const existingItems = await AsyncStorage.getItem('savedItems')
      let savedItems = []

      if (existingItems) {
        savedItems = JSON.parse(existingItems)
      }

      savedItems.push(value)
      console.log("🚀 ~ saveItem ~ savedItems:", savedItems)

      await AsyncStorage.setItem('savedItems', JSON.stringify(savedItems))
      setSaved(true)
      setMessage('The question has been saved!')
    } catch (error) {
      setMessage('Something went wrong')
    }
  }

  useEffect(() => {
    handleMessageFn()
  }, [message])

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
              sendAnEmail('question id: ' + item.id)
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
          {saved ? (
            <AntDesign
              onPress={() => removeItem()}
              name="star"
              size={35}
              color="gold"
            />
          ) : (
            <AntDesign
              onPress={() => saveItem()}
              name="staro"
              size={35}
              color="black"
            />
          )}
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
              opacity: 0.9,
              padding: 5,
              borderRadius: 10,
              zIndex: 2,
            }}
          >
            {message}
          </Text>
        </View>
      )}
    </View>
  )
}
