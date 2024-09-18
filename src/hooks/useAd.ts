import { useEffect, useState } from 'react'
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads'

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
})

export default function useAd() {
  const loadInterstitial = () => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {},
    )

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {},
    )

    return () => {
      unsubscribeClosed()
      unsubscribeLoaded()
    }
  }

  useEffect(() => {
    interstitial.load()
  }, [])

  return { loadInterstitial, interstitial }
}
