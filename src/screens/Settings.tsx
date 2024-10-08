import { AntDesign, Ionicons } from '@expo/vector-icons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List, Switch as PaperSwitch } from 'react-native-paper'

import {
  aboutTheApp,
  codeSettings,
  contact,
  hideAnswers,
  hideAnswersExplain,
  randomOrder,
  savedQuestions,
} from '../../data/texts'
import CodeSettings from '../components/CodeSettings'
import Gradient from '../components/molecules/atoms/Gradient'
import { Colors } from '../utils/constants'
import { throttle } from '../utils/functions'
import useStore from '../utils/store'
import { getValue, setValue } from '../utils/utilStorage'

// Prosta implementacja debounce
const debounce = (func, delay) => {
  let timer
  return function (...args) {
    const context = this
    clearTimeout(timer) // Anulowanie poprzedniego wywołania
    timer = setTimeout(() => func.apply(context, args), delay) // Ustawienie nowego
  }
}

const Settings = () => {
  const shuffle = useStore(state => state.shuffle)
  const toggleShuffle = useStore(state => state.toggleShuffle)
  const hide = useStore(state => state.hide)
  const toggleHide = useStore(state => state.toggleHide)

  const setShowBottomSheet = useStore(state => state.setShowBottomSheet)
  const setBottomSheetContent = useStore(state => state.setBottomSheetContent)
  const setBottomSheetSnapIndex = useStore(
    state => state.setBottomSheetSnapIndex,
  )
  const navigation = useNavigation()

  // Użycie throttle zamiast debounce, limit 300 ms
  const throttledToggleShuffle = useCallback(throttle(toggleShuffle, 300), [])
  const throttledToggleHide = useCallback(throttle(toggleHide, 300), [])

  useEffect(() => {
    try {
      setValue('shuffle', shuffle)
    } catch (e) {
      console.error(e)
    }
  }, [shuffle])

  useEffect(() => {
    try {
      setValue('hide', hide)
    } catch (e) {
      console.error(e)
    }
  }, [hide])

  function setShuffleStorage() {
    throttledToggleShuffle() // Wywołanie funkcji z throttlem
  }

  function setHideAnswersStorage() {
    throttledToggleHide() // Wywołanie funkcji z throttlem
  }

  return (
    <View style={styles.container}>
      <Gradient />
      <List.Item
        title={randomOrder}
        onPress={setShuffleStorage}
        rippleColor={Colors.ripple}
        right={() => (
          <PaperSwitch value={shuffle} onValueChange={setShuffleStorage} />
        )}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
          height: 60,
          justifyContent: 'center',
        }}
        titleStyle={{ color: Colors.text }}
      />

      <List.Section>
        <List.Item
          title={hideAnswers}
          onPress={setHideAnswersStorage}
          rippleColor={Colors.ripple}
          right={() => (
            <PaperSwitch value={hide} onValueChange={setHideAnswersStorage} />
          )}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.border,
            marginTop: -8,
            justifyContent: 'center',
          }}
          titleStyle={{ color: Colors.text }}
          description={() => (
            <Text style={{ opacity: 0.6 }}>{hideAnswersExplain}</Text>
          )}
        />
      </List.Section>

      <List.Item
        title={codeSettings}
        onPress={() => {
          setBottomSheetContent(<CodeSettings />)
          setShowBottomSheet(true)
          setBottomSheetSnapIndex(2)
        }}
        rippleColor={Colors.ripple}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
          paddingLeft: 15,
          marginTop: -8,
        }}
        titleStyle={{ color: Colors.text }}
        left={() => (
          <FontAwesome6
            name="code"
            size={20}
            color={'#654DA1'}
            style={styles.leftIcon}
          />
        )}
      />

      <List.Item
        rippleColor={Colors.ripple}
        title={savedQuestions}
        left={() => (
          <FontAwesome6
            name="bookmark"
            size={24}
            color={'#654DA1'}
            style={styles.leftIcon}
          />
        )}
        right={() => (
          <AntDesign
            name="right"
            size={24}
            color={Colors.border}
            style={styles.rightIcon}
          />
        )}
        //@ts-ignore
        onPress={() => navigation.navigate('Saved')}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
          paddingLeft: 15,
          // marginTop: -8,
        }}
        titleStyle={{ color: Colors.text }}
      />

      <List.Item
        rippleColor={Colors.ripple}
        title={aboutTheApp}
        left={() => (
          <Ionicons
            name="information"
            size={32}
            color={'#654DA1'}
            style={styles.leftIcon}
          />
        )}
        right={() => (
          <AntDesign
            name="right"
            size={24}
            color={Colors.border}
            style={styles.rightIcon}
          />
        )}
        //@ts-ignore
        onPress={() => navigation.navigate('About')}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
          paddingLeft: 15,
          marginTop: 0,
        }}
        titleStyle={{ color: Colors.text }}
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
    paddingTop: 15,
    backgroundColor: Colors.screenBg,
  },
  leftIcon: {
    opacity: 0.7,
    // backgroundColor: 'red',
    marginLeft: 5,
    width: 25,
    height: 28,
    lineHeight: 28,
    textAlign: 'center',
  },
  rightIcon: {
    backgroundColor: 'transparent',
    lineHeight: 28,
  },
})

export default Settings
