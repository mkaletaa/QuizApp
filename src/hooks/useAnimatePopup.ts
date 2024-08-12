import { useEffect, useState } from 'react'
import { Animated } from 'react-native'

export default function useAnimatePopup(showPopup) {
  const popupOpacity = useState(new Animated.Value(0))[0]
  const popupTranslateX = useState(new Animated.Value(100))[0] // Początkowa wartość przesunięcia w prawo

  useEffect(() => {
    Animated.parallel([
      Animated.timing(popupOpacity, {
        toValue: showPopup ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(popupTranslateX, {
        toValue: showPopup ? 0 : 100, // Przesunięcie do lewej strony (do wartości 0)
        duration: 150, // Dłuższa animacja przesunięcia
        useNativeDriver: true,
      }),
    ]).start()
  }, [showPopup, popupOpacity, popupTranslateX])

  const transform = [
    {
      translateX: popupTranslateX,
    },
  ]

  return { popupOpacity, transform }
}
