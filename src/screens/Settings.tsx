import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
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
import Spoiler from '../components/ContentRenderer/Spoiler'
import Gradient from '../components/molecules/atoms/Gradient'
import { Colors } from '../utils/constants'
import useStore from '../utils/store'
import { getValue, setValue } from '../utils/utilStorage'

const Settings = () => {
  const [isShuffleSwitchEnabled, setIsShuffleSwitchEnabled] =
    useState<boolean>()
  const [isHideAnswersSwitchEnabled, setIsHideAnswersSwitchEnabled] =
    useState<boolean>()
  const setShowBottomSheet = useStore(state => state.setShowBottomSheet)
  const showBottomSheet = useStore(state => state.showBottomSheet)
  const setBottomSheetContent = useStore(state => state.setBottomSheetContent)
  const setBottomSheetSnapIndex = useStore(
    state => state.setBottomSheetSnapIndex,
  )
  const navigation = useNavigation()

  async function checkPreferences() {
    const shouldShuffle = await getValue('shuffle')
    const shouldHide = await getValue('hide')
    console.log('🚀 ~ checkPreferences ~ shouldShuffle:', shouldShuffle)
    if (shouldShuffle === null) setIsShuffleSwitchEnabled(false)
    else setIsShuffleSwitchEnabled(shouldShuffle)
    if (shouldHide === null) setIsHideAnswersSwitchEnabled(false)
    else setIsHideAnswersSwitchEnabled(shouldHide)
  }

  useEffect(() => {
    checkPreferences()
  }, [])

  useEffect(() => {
    try {
      setValue('shuffle', isShuffleSwitchEnabled)
    } catch (e) {
      console.error(e)
    }
  }, [isShuffleSwitchEnabled])

  useEffect(() => {
    try {
      setValue('hide', isHideAnswersSwitchEnabled)
    } catch (e) {
      console.error(e)
    }
  }, [isHideAnswersSwitchEnabled])

  function setShuffleStorage() {
    setIsShuffleSwitchEnabled(prev => !prev)
  }

  function setHideAnswersStorage() {
    setIsHideAnswersSwitchEnabled(prev => !prev)
  }

  const bottomSheet = useMemo(() => {
    return <Spoiler children={<CodeSettings />}></Spoiler>
  }, [showBottomSheet])

  return (
    <View style={styles.container}>
      <Gradient />
      <List.Item
        title={randomOrder}
        onPress={setShuffleStorage}
        rippleColor={Colors.ripple}
        right={() => (
          <PaperSwitch
            value={isShuffleSwitchEnabled}
            onValueChange={setShuffleStorage}
          />
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
            <PaperSwitch
              value={isHideAnswersSwitchEnabled}
              onValueChange={setHideAnswersStorage}
            />
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
          setBottomSheetContent([])
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
          <FontAwesome6 name="code" size={20} color={'#654DA1'} />
        )}
      />

      <List.Section>
        <List.Item
          rippleColor={Colors.ripple}
          title={savedQuestions}
          left={() => (
            <FontAwesome6
              name="bookmark"
              size={24}
              color={'#654DA1'}
              style={{ marginLeft: 4 }}
            />
          )}
          right={() => (
            <AntDesign name="right" size={24} color={Colors.border} />
          )}
          //@ts-ignore
          onPress={() => navigation.navigate('Saved')}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.border,
            paddingLeft: 15,
            marginTop: -8,
          }}
          titleStyle={{ color: Colors.text }}
        />

        <List.Item
          rippleColor={Colors.ripple}
          title={aboutTheApp}
          left={() => (
            <MaterialCommunityIcons
              name="information-variant"
              size={26}
              color="#654DA1"
            />
          )}
          right={() => (
            <AntDesign name="right" size={24} color={Colors.border} />
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
      </List.Section>

      <Text style={{ opacity: 0.6, marginTop: 10, paddingLeft: 15 }}>
        {contact}: <Text>learn.everything.app@proton.me</Text>
      </Text>

      {bottomSheet}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: Colors.screenBg,
  },
})

export default Settings
