import { Entypo } from '@expo/vector-icons'
import React from 'react'
import {
  Animated,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import useAnimatePopup from '../../hooks/useAnimatePopup'
import useStore from '../../utils/store'
import MistakeButton from './atoms/MistakeButton'
import QuizButton from './atoms/QuizButton'

export default function TheoryPopup({ topicName, chapterName }) {
  const showPopup = useStore(state => state.showPopup)
  const setShowPopup = useStore(state => state.setShowPopup)

  const { popupOpacity,  transform } = useAnimatePopup(showPopup)

  return (
    <React.Fragment>
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
      </View>

      <Modal
        visible={showPopup}
        transparent={true}
        animationType="fade"
        statusBarTranslucent
      >
        {/* <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} /> */}
        <TouchableWithoutFeedback onPress={() => setShowPopup(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
              justifyContent: 'center',
              alignItems: 'center',
              // gap: 20,
            }}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  {
                    top: 150,
                    right: 10,
                    position: 'absolute',
                    opacity: popupOpacity,
                    transform,
                    zIndex: 1,
                    gap: 20,
                    borderRadius: 10, // Adjust the border radius as needed
                  },
                ]}
              >
                <MistakeButton prop={topicName} />
                <QuizButton chapterName={chapterName} topicName={topicName} />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </React.Fragment>
  )
}
