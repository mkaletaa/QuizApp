import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet } from 'react-native'

import settings from '../../../../data/settings.json'
import { Colors } from '../../../utils/constants'

export default function ArrowUp({
  showGoUp,
  scrollToTop,
  screenWidth,
}: {
  showGoUp: boolean
  scrollToTop: () => void
  screenWidth: number
}) {
  const [scaleValue] = useState(new Animated.Value(0))

  useEffect(() => {
    if (showGoUp) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start()
    }
  }, [showGoUp])

  return (
    <Animated.View
      style={[
        styles.goUp,
        {
          transform: [{ scale: scaleValue }],
          bottom: settings.ads ? screenWidth / 8 + 100 : 120,
        },
      ]}
    >
      <AntDesign
        name="up"
        size={40}
        color={Colors.boldText}
        onPress={() => scrollToTop()}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  goUp: {
    padding: 8,
    backgroundColor: Colors.surfaceBg,
    position: 'absolute',
    left: 30,
    zIndex: 1,
    borderRadius: 15,
    elevation: 3,
  },
})
