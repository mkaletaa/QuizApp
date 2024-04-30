import { useEffect, useState } from 'react'
import { Animated } from 'react-native'

export default function useAnimatePopup(showPopup) {
  useEffect(() => {
    Animated.timing(popupScale, {
      toValue: showPopup ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }, [showPopup])

  const popupScale = useState(new Animated.Value(0))[0]

  const transform = [
    {
      scale: popupScale.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
  ]

  return { popupScale, transform }
}
