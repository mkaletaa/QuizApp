import React from 'react'
import { Text, View } from 'react-native'
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads'

export default function Ad({ width }) {
  return (
    <View
      style={{
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
      }}
    >
      <View style={{width: '100%', height: 75}}></View>
      {/* <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.LARGE_BANNER}
      ></BannerAd> */}
    </View>
  )
}
