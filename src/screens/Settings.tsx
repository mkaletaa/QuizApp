import { Animated } from 'react-native'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'

export default function Settings() {
  const pinch = Gesture.Pinch()

  return (
    <GestureDetector gesture={pinch}>
      <Animated.View />
    </GestureDetector>
  )
}
