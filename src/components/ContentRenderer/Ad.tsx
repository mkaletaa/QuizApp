import React from 'react'
import { Text, View } from 'react-native'
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads'

type adSize = 'anchored' | 'rectangle' | 'large'

export default function Ad({
  width = '100%',
  size = 'anchored',
}: {
  width?: any
  size?: adSize
}) {
  function returnSize() {
    switch (size) {
      case 'anchored':
        return BannerAdSize.ANCHORED_ADAPTIVE_BANNER
      case 'rectangle':
        return BannerAdSize.MEDIUM_RECTANGLE
      case 'large':
        return BannerAdSize.LARGE_BANNER
    }
  }
  return (
    <View
      style={{
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
      }}
    >
      {/* <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : 'id'}
        size={returnSize()} //anchored for quiz and default in theory; also rectangle and large could be useful
      ></BannerAd> */}
    </View>
  )
}
