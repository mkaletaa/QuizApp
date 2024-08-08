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
      }}
    >
      {/* <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.LARGE_BANNER}
      ></BannerAd> */}
    </View>
  )
}
