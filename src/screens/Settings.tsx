import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'

const StickyHeaderScrollView = () => {
  // const adUnitId = __DEV__
  //   ? TestIds.BANNER
  //   : 'ca-app-pub-8755010348178299~4784433482'
  // Pobierz niestandardowe wartości zdefiniowane w app.json
  // const ads = JSON.stringify(Constants.manifest2.extra.expoClient.extra.ads)
  // console.log(ads) // Wyświetli wartość customConfig z app.json

  const handleButtonPress = async () => {
    try {
      // await sendNotification()
      console.log('Notification sent successfully')
    } catch (error) {
      console.error('Error sending notification:', error)
    }
  }

  // const sendNotification = async () => {
  //   console.log('dede')
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'Nowa notyfikacja',
  //       body: 'To jest treść nowej notyfikacji.',
  //     },
  //     trigger: null, // Notyfikacja zostanie natychmiast wyświetlona
  //   })
  // }

  useEffect(() => {
    handleButtonPress()
  }, [])

  return (
    <View style={styles.container}>
      <Button title="Wyślij notyfikację" onPress={handleButtonPress} />
      {true &&
        // <BannerAd
        //   unitId={'ca-app-pub-8755010348178299~4784433482'}
        //   size={BannerAdSize.FULL_BANNER}
        //   requestOptions={{
        //     requestNonPersonalizedAdsOnly: true,
        //   }}
        // />
        null
        }
      <Text>Test</Text>
      {true &&
        // <BannerAd
        //   unitId={TestIds.BANNER}
        //   size={BannerAdSize.FULL_BANNER}
        //   requestOptions={{
        //     requestNonPersonalizedAdsOnly: true,
        //   }}
        // />
        null
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickyHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 50, // Ustaw to, aby uniknąć zakrywania treści przez nagłówek
    // Inna zawartość ScrollView
  },
})

export default StickyHeaderScrollView
