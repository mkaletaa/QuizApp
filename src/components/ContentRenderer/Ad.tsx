import React from 'react';
import { Text, View } from 'react-native';
import { BannerAd, BannerAdSize, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';



import settings from '../../../data/settings.json';


type adSize = 'anchored' | 'rectangle' | 'large'

export default function Ad({
  width = '100%',
  size = 'anchored',
  id = TestIds.BANNER,
}: {
  width?: any
  size?: adSize
  id: string
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
        unitId={settings.prod ? id : TestIds.BANNER} // zmień 'id' na faktyczne ID reklamy produkcyjnej
        size={returnSize()} // typ reklamy w zależności od miejsca
      />
    </View>
  )
}