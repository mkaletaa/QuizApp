import React, { useEffect, useState } from 'react'
import { StyleSheet, Switch, View, Text, Pressable } from 'react-native'
import { getValue, setValue } from '../utils/utilStorage'
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

  useEffect(() => {
    try {
      setValue("shuffle", isShuffleSwitchEnabled)
    } catch (e) {
      console.error(e)
    }
  }, [isShuffleSwitchEnabled])

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setShuffleStorage()}
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: -10, //used to be -15
          marginBottom: 10,

          // backgroundColor: 'blue',
        }}
      >
        <Switch
          onValueChange={() => setShuffleStorage()}
          value={isShuffleSwitchEnabled}
        />
        <Text>Losowa kolejność pytań</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default StickyHeaderScrollView
