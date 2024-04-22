import React, { useEffect, useState } from 'react'
import { StyleSheet, Switch, View, Text, Pressable } from 'react-native'
import { getValue, setValue } from '../utils/utilStorage'
import { useNavigation } from '@react-navigation/native'

const StickyHeaderScrollView = () => {
  const [isShuffleSwitchEnabled, setIsShuffleSwitchEnabled] =
    useState<boolean>()

  useEffect(() => {
    async function checkShuffle() {
      const shouldShuffle = await getValue('shuffle')
      if (shouldShuffle === null) setIsShuffleSwitchEnabled(false)
      else setIsShuffleSwitchEnabled(shouldShuffle)
    } checkShuffle()
  }, [])

  function setShuffleStorage() {
    setIsShuffleSwitchEnabled(prev => !prev)
  }

  //tutaj niepotrzebnie się wywołuje podczas każdego mountingu
  useEffect(() => {
    try {
      setValue("shuffle", isShuffleSwitchEnabled)
    } catch (e) {
      console.error(e)
    }
  }, [isShuffleSwitchEnabled])

  const navigation = useNavigation()


  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setShuffleStorage()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 15, //used to be -15
          marginBottom: 10,
          paddingHorizontal: 15,
          // fontSize: 20
          // backgroundColor: 'blue',
        }}
      >
        <Switch
          onValueChange={() => setShuffleStorage()}
          value={isShuffleSwitchEnabled}
        />
        <Text>Losowa kolejność pytań</Text>
      </Pressable>

      <Pressable
      //@ts-ignore
        onPress={() => navigation.navigate('About')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 15, //used to be -15
          marginBottom: 10,
          paddingHorizontal: 15,
          elevation: 5,
          height: 50,
          // fontSize: 20
          backgroundColor: 'blue',
        }}
      >
        <Text>O aplikacji</Text>
      </Pressable>

      <Text>Kontakt: <Text>ddddd</Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default StickyHeaderScrollView
