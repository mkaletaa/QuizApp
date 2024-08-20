import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { List, Switch as PaperSwitch } from 'react-native-paper';



import { aboutTheApp, contact, hideAnswers, hideAnswersExplain, randomOrder, savedQuestions } from '../../data/texts';
import Gradient from '../components/molecules/atoms/Gradient';
import { Colors } from '../utils/constants';
import { getValue, setValue } from '../utils/utilStorage';


const Settings = () => {
  const [isShuffleSwitchEnabled, setIsShuffleSwitchEnabled] =
    useState<boolean>()
  const [isHideAnswersSwitchEnabled, setIsHideAnswersSwitchEnabled] =
    useState<boolean>()

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
        rippleColor={Colors.ripple}
        title={savedQuestions}
        left={() => (
          <Ionicons name="bookmark-outline" size={24} color={'#714696'} />
        )}
        right={() => <AntDesign name="right" size={24} color={Colors.border} />}
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
            color="#714696"
          />
        )}
        right={() => <AntDesign name="right" size={24} color={Colors.border} />}
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
})

export default Settings