// import { useEffect, useState } from 'react'
// import {
//   AdEventType,
//   InterstitialAd,
//   TestIds,
// } from 'react-native-google-mobile-ads'

// import settings from '../../data/settings.json'

// const interstitial = InterstitialAd.createForAdRequest(
//   settings.prod
//     ? 'ca-app-pub-8755010348178299/1253356666'
//     : TestIds.INTERSTITIAL,
//   {
//     requestNonPersonalizedAdsOnly: true,
//   },
// )

// export default function useAd() {
//   const loadInterstitial = () => {
//     const unsubscribeLoaded = interstitial.addAdEventListener(
//       AdEventType.LOADED,
//       () => {},
//     )

//     const unsubscribeClosed = interstitial.addAdEventListener(
//       AdEventType.CLOSED,
//       () => {},
//     )

//     return () => {
//       unsubscribeClosed()
//       unsubscribeLoaded()
//     }
//   }

//   useEffect(() => {
//     interstitial.load()
//   }, [])

//   return { loadInterstitial, interstitial }
// }
