import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List, Switch as PaperSwitch } from 'react-native-paper'
import {
  aboutTheApp,
  contact,
  hideAnswers,
  hideAnswersExplain,
  randomOrder,
  savedQuestions,
} from '../../data/texts'
import Gradient from '../components/molecules/atoms/Gradient'
import {
  borderColor,
  screenBackground,
  surfaceRipple,
  textColor,
} from '../utils/constants'
import { getValue, setValue } from '../utils/utilStorage'
import { MaterialCommunityIcons } from '@expo/vector-icons'
const Settings = () => {
  const [isShuffleSwitchEnabled, setIsShuffleSwitchEnabled] =
    useState<boolean>()
  const [isHideAnswersSwitchEnabled, setIsHideAnswersSwitchEnabled] =
    useState<boolean>()

  useEffect(() => {
    async function checkPreferences() {
      const shouldShuffle = await getValue('shuffle')
      const shouldHide = await getValue('hide')
      if (shouldShuffle === null) setIsShuffleSwitchEnabled(false)
      else setIsShuffleSwitchEnabled(shouldShuffle)
      if (shouldHide === null) setIsHideAnswersSwitchEnabled(false)
      else setIsHideAnswersSwitchEnabled(shouldHide)
    }
    checkPreferences()
  }, [])

  function setShuffleStorage() {
    setIsShuffleSwitchEnabled(prev => !prev)
  }

  function setHideAnswersStorage() {
    setIsHideAnswersSwitchEnabled(prev => !prev)
  }

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

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Gradient />
      <List.Item
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

      <List.Section>
        <List.Item
          title={hideAnswers}
          onPress={setHideAnswersStorage}
          rippleColor={surfaceRipple}
          right={() => (
            <PaperSwitch
              value={isHideAnswersSwitchEnabled}
              onValueChange={setHideAnswersStorage}
            />
          )}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
            // height: 60,
            marginTop: -8,

            justifyContent: 'center',
          }}
          titleStyle={{ color: textColor }}
          description={() => (
            <Text style={{ opacity: 0.6 }}>{hideAnswersExplain}</Text>
          )}
        />
      </List.Section>

      <List.Item
        rippleColor={surfaceRipple}
        title={savedQuestions}
        left={() => (
          <Ionicons name="bookmark-outline" size={24} color={'slateblue'} />
        )}
        right={() => <AntDesign name="right" size={24} color={borderColor} />}
        //@ts-ignore
        onPress={() => navigation.navigate('Saved')}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
          paddingLeft: 15,
          marginTop: -8,
          // height: 60
        }}
        titleStyle={{ color: textColor }}
      />

      <List.Item
        rippleColor={surfaceRipple}
        title={aboutTheApp}
        left={() => (
          <MaterialCommunityIcons
            name="information-variant"
            size={26}
            color="slateblue"
          />
        )}
        right={() => <AntDesign name="right" size={24} color={borderColor} />}
        //@ts-ignore
        onPress={() => navigation.navigate('About')}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
          paddingLeft: 15,
          marginTop: 0,
          // height: 60
        }}
        titleStyle={{ color: textColor }}
      />

      <Text style={{ opacity: 0.6, marginTop: 10, paddingLeft: 15 }}>
        {contact}: <Text>learn.everything.app@proton.me</Text>
      </Text>
      {/* <MyBottomSheet /> */}
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

export default Settings
