import React from 'react'
import { Text, View } from 'react-native'
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads'

import settings from '../../../data/settings.json'

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

  if (!settings.ads) {
    return null
  }

  return (
    <View
      style={{
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
      }}
    >
      <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : 'id'} // zmień 'id' na faktyczne ID reklamy produkcyjnej
        size={returnSize()} // typ reklamy w zależności od miejsca
      />
    </View>
  )
}
