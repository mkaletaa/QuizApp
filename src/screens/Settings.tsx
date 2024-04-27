import React, { useEffect, useState } from 'react'
import { StyleSheet, Switch, View, Text, Pressable } from 'react-native'
import { getValue, setValue } from '../utils/utilStorage'
import { useNavigation } from '@react-navigation/native'
import { randomOrder, contact, aboutTheApp } from '../../data/texts'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import * as Sentry from '@sentry/react-native'

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

  //tutaj niepotrzebnie się wywołuje podczas każdego mountingu
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
      <Pressable
        onPress={() => setShuffleStorage()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          // gap: 5, //used to be -15
          // marginBottom: 10,
          // paddingHorizontal: 15,
          // fontSize: 20
          // backgroundColor: 'blue',
          borderBottomColor: 'silver',
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            width: '85%',
            // backgroundColor: 'red',
            fontSize: 16,
            paddingRight: 15,
            flex:1
          }}
        >
          {randomOrder}
        </Text>
        <Switch
          style={{
            // backgroundColor: 'yellow',
            // width: '15%',
          }}
          onValueChange={() => setShuffleStorage()}
          value={isShuffleSwitchEnabled}
        />
      </Pressable>

      <Pressable
        //@ts-ignore
        onPress={() => navigation.navigate('About')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // flexGrow: 'center',
          // gap: 15, //used to be -15
          marginBottom: 10,
          //paddingHorizontal: 15,
          // elevation: 5,
          height: 50,
          // fontSize: 20
          // backgroundColor: 'blue',
          borderBottomColor: 'silver',
          borderBottomWidth: 1,
          // flexBasis: 'baseline',
        }}
      >
        <Entypo
          name="info-with-circle"
          size={24}
          color="steelblue"
          style={{
            // width: '10%',

            // backgroundColor: 'silver',
          }}
        />
        <Text style={{ fontSize: 18,
        //  backgroundColor: 'red', 
        // width: "auto" ,
        flex:1,
        paddingLeft: 10
        // alignSelf:"stretch"
        }}>
          {aboutTheApp}
        </Text>
        <AntDesign
          name="right"
          size={24}
          color="dimgrey"
          style={{
            // width: '10%',
            // backgroundColor: 'white',
          }}
        />
      </Pressable>

      <Text
        style={{
          opacity: 0.6,
          marginTop: 10,
        }}
      >
        {contact}: <Text>learn.everything.app@proton.me</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
})

export default StickyHeaderScrollView
