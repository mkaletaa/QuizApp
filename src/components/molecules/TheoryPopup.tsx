import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'
import useAnimatePopup from '../../hooks/useAnimatePopup'
import useStore from '../../utils/store'
import utilStyles from '../../utils/styles'
import MistakeButton from './atoms/MistakeButton'
import QuizButton from './atoms/QuizButton'

export default function TheoryPopup({ topicName, chapterName }) {
  const showPopup = useStore(state => state.showPopup)
  const setShowPopup = useStore(state => state.setShowPopup)

  const { popupScale, transform } = useAnimatePopup(showPopup)

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        flexDirection: 'row',
        right: 5,
        marginTop: 0,
        zIndex: 1,
        position: 'absolute',
        // backgroundColor: 'red',
        // width: '100%',
      }}
    >
      <TouchableOpacity
        style={{
          width: 45,
          height: 45,
          borderRadius: 50,
          justifyContent: 'center',
          // backgroundColor: 'red'
        }}
        onPress={() => setShowPopup(!showPopup)}
      >
        <Entypo
          name="dots-three-vertical"
          size={28}
          color="black"
          style={{
            textAlign: 'center',
          }}
        />
      </TouchableOpacity>

      <Animated.View
        style={[
          utilStyles.popup,
          {
            opacity: popupScale,
            transform,

            zIndex: 1,
            // flexDirection: 'column',
            top: 25,
            gap: 10,
            alignItems: 'stretch',
          },
        ]}
      >
        {/* <Button
          title={reportAMistake}
          color="red"
          onPress={() => {
            sendAnEmail(removeUnderscores(topicName))
            setShowPopup(false)
          }}
        /> */}
        <MistakeButton prop={topicName} />
        <QuizButton chapterName={chapterName} topicName={topicName} />
      </Animated.View>
    </View>
  )
}
