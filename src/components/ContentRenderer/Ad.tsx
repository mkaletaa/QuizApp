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
        // backgroundColor: 'red'
      }}
    >
      <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : 'id'}
        size={BannerAdSize.FULL_BANNER}
      ></BannerAd>
    </View>
  )
}
