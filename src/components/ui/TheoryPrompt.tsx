import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { Button, View, Animated } from 'react-native'
import { reportAMistake } from '../../../data/texts'
import { removeUnderscores, sendAnEmail } from '../../utils/functions'
import QuizButton from './QuizButton'
import useStore from '../../utils/store'

export default function TheoryPrompt({ topicName, chapterName }) {
  const navigation = useNavigation()
  const showPrompt = useStore(state => state.showPrompt)
  const setShowPrompt = useStore(state => state.setShowPrompt)
  const promptScale = useState(new Animated.Value(0))[0]

  useEffect(() => {
    Animated.timing(promptScale, {
      toValue: showPrompt ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }, [showPrompt])

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        flexDirection: 'row',
        right: 10,
        marginTop: 10,
        zIndex: 1,
        position: 'absolute',
      }}
    >
      <Entypo
        name="dots-three-vertical"
        size={28}
        color="black"
        style={{
          width: 35,
          textAlign: 'center',
        }}
        onPress={() => setShowPrompt(!showPrompt)}
      />

      <Animated.View
        style={{
          opacity: promptScale,
          transform: [
            {
              scale: promptScale.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
          position: 'absolute',
          top: 25,
          right: 60,
          flexDirection: 'column',
          gap: 10,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 6,
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <Button
          title={reportAMistake}
          color="red"
          onPress={() => {
            sendAnEmail(removeUnderscores(topicName));
            setShowPrompt(false)
          }}
        />
        <QuizButton chapterName={chapterName} topicName={topicName} />
      </Animated.View>
    </View>
  )
}
