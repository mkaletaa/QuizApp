import React, { useEffect, useState } from 'react'
import { StyleSheet, Switch, View, Text } from 'react-native'
import { List, Switch as PaperSwitch } from 'react-native-paper'
import { getValue, setValue } from '../utils/utilStorage'
import { useNavigation } from '@react-navigation/native'
import { randomOrder, contact, aboutTheApp } from '../../data/texts'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import useStore from '../utils/store'
import { borderColor, buttonDark, screenBackground, surfaceRipple, textColor } from '../utils/constants'
import Gradient from '../components/molecules/Gradient'

const StickyHeaderScrollView = () => {
  const [isShuffleSwitchEnabled, setIsShuffleSwitchEnabled] =
    useState<boolean>()

  useEffect(() => {
    async function checkShuffle() {
      const shouldShuffle = await getValue('shuffle')
      if (shouldShuffle === null) setIsShuffleSwitchEnabled(false)
      else setIsShuffleSwitchEnabled(shouldShuffle)
    }
    checkShuffle()
  }, [])

  function setShuffleStorage() {
    setIsShuffleSwitchEnabled(prev => !prev)
  }

  useEffect(() => {
    try {
      setValue('shuffle', isShuffleSwitchEnabled)
    } catch (e) {
      console.error(e)
    }
  }, [isShuffleSwitchEnabled])

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Gradient />
      <List.Item //chcę aby wysokoć tego itema była taka sama jak tego poniżej
        title={randomOrder}
        onPress={setShuffleStorage}
        rippleColor={surfaceRipple}
        right={() => (
          <PaperSwitch
            value={isShuffleSwitchEnabled}
            onValueChange={setShuffleStorage}
          />
        )}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
          height: 60,
          justifyContent: 'center',
        }}
        titleStyle={{ color: textColor }} 
        />
      <List.Item
        rippleColor={surfaceRipple}
        title={aboutTheApp}
        left={() => <Entypo name="info" size={24} color={buttonDark} />}
        right={() => <AntDesign name="right" size={24} color={borderColor} />}
        onPress={() => navigation.navigate('About')}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
          paddingLeft: 15,
        }}
        titleStyle={{ color: textColor }} 
      />
      <Text style={{ opacity: 0.6, marginTop: 10, paddingLeft: 15 }}>
        {contact}: <Text>learn.everything.app@proton.me</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: screenBackground,
  },
})

export default StickyHeaderScrollView
