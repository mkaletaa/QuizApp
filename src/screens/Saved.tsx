import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  Switch,
  Button,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useQuizData from '../hooks/useQuizData'
import ContentRenderer from '../components/ContentRenderer'
import Question from '../components/Question'
import { Item } from '../utils/types'
import { LinearGradient } from 'expo-linear-gradient'
import Explanation from '../components/Explanation'
import { useNavigation } from '@react-navigation/native'

//todo: util styles, refresh on scrollup, message if empty, loader if loading
export default function Saved() {
  const [savedItems, setSavedItems] = useState([])
  const [isPending, setIsPending] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState(null)
  const { importItemById } = useQuizData()
  const navigation = useNavigation()

  useEffect(() => {
    console.log('first saved')
    // Funkcja pobierająca dane z AsyncStorage
    const fetchSavedItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('savedItems')
        if (jsonValue !== null) {
          // Parsuj wartość JSON i przypisz do stanu savedItems
          const parsedItems: string[] = JSON.parse(jsonValue)
          console.log('🚀 ~ fetchSavedItems ~ parsedItems:', parsedItems)
          let itemsH: Item[] = []

          // Wywołaj funkcję z hooka wewnątrz useEffect
          for (const id of parsedItems) {
            console.log('🚀 ~ fetchSavedItems ~ id:', id)
            itemsH.push(importItemById(id))
          }
          console.log('🚀 ~ fetchSavedItems ~ itemsH:', itemsH)

          setSavedItems(itemsH)
        }
        setIsPending(false)
      } catch (error) {
        console.error('Błąd podczas pobierania danych z AsyncStorage:', error)
      }
    }

    // Wywołaj funkcję pobierającą dane przy mountowaniu komponentu
    fetchSavedItems()
  }, [])

  function seeFullQuestion(item: Item): void {
    setModalItem(item)
    setShowModal(true)
    console.log('preswsed')
  }
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    let savedItemsH = savedItems.reverse()
    setSavedItems(savedItemsH)
  }

  return (
    <View>
      <Modal
        // duration={1000}
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <Explanation
          showQuestion={true}
          item={modalItem}
          chosenOptions={null}
          handleBtnPress={() => {
            setShowModal(false)
          }}
          btnTitle={'close'}
        />
      </Modal>

      {savedItems.length > 0 ? (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 40,
            paddingTop: 20,
            // height: '100%',
          }}
        >
          <Pressable
            style={{
              backgroundColor: 'rgb(0, 150, 255)',
              width: 100,
              padding: 10,
              elevation: 5,
              borderRadius: 3,
            }}
            onPress={() => {
              //@ts-ignore
              navigation.navigate('Quiz', {
                catName: '__Saved__',
                topArray: [],
                itemsArray: savedItems,
                howManyItems: savedItems.length,
                shuffle: false,
              })
            }}
          >
            <Text>TAKE A QUIZ</Text>
          </Pressable>

          <Switch onValueChange={toggleSwitch} value={isEnabled} />
          {/* <View style={{}}></View> */}
          {savedItems.map((item, index) => (
            <Pressable
              style={{
                // backgroundColor: 'red',
                alignItems: 'center',
              }}
              onPress={() => {
                seeFullQuestion(item)
              }}
            >
              <View
                style={[
                  {
                    backgroundColor: 'white',
                    width: '68%',
                    // maxWidth: 400,
                    height: 80, //100
                    overflow: 'hidden',
                    alignItems: 'center',
                    marginTop: 16,

                    borderRadius: 10,
                    elevation: 3,
                  },
                ]}
              >
                <Question question={item.question} />

                <LinearGradient
                  // Button Linear Gradient
                  colors={['transparent', 'white']}
                  style={{
                    width: '100%',
                    height: 50,
                    position: 'absolute',
                    bottom: 0,
                  }}
                ></LinearGradient>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : (

        <View>
          {isPending ? <Text>Pobieranie</Text> : <Text>nie zapisano jeszcze żadnego pytania</Text>}
        </View>
      )}
    </View>
  )
}
