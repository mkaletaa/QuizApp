import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React, { useEffect, useState } from 'react'
import {
  Animated,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Divider, List } from 'react-native-paper'

import { reportAMistake, takeAQuiz } from '../../../data/texts'
import useAnimatePopup from '../../hooks/useAnimatePopup'
import { Colors } from '../../utils/constants'
import { removeUnderscores, sendAnEmail } from '../../utils/functions'
import useStore from '../../utils/store'
import MistakeButton from './atoms/MistakeButton'
import QuizButton from './atoms/QuizButton'
import QuizListItem from './atoms/QuizListItem'

export default function TheoryPopup({ topicName, chapterName }) {
  // const showPopup = useStore(state => state.showPopup)
  // const setShowPopup = useStore(state => state.setShowPopup)
  const [showPopup, setShowPopup] = useState(false)

  const { popupOpacity, transform } = useAnimatePopup(showPopup)

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
          onPress={() => setShowPopup(e => !e)}
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
              // backgroundColor: 'rgba(0, 0, 20, .1)', // Adjust the opacity as needed
              justifyContent: 'center',
              alignItems: 'center',
              // gap: 20,
            }}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  {
                    top: 85,
                    right: 15,
                    position: 'absolute',
                    opacity: popupOpacity,
                    transform,
                    zIndex: 1,
                    // gap: 20,
                    borderRadius: 3, // Adjust the border radius as needed
                    // borderTopRightRadius:2,
                    backgroundColor: Colors.screenBg,
                    elevation: 3,
                  },
                ]}
              >
                <QuizListItem
                  chapterName={chapterName}
                  topicName={topicName}
                  handlePress={() => setShowPopup(false)}
                  iconStyle={styles.icon}
                />
                <List.Item
                  rippleColor={Colors.ripple}
                  title={reportAMistake}
                  left={() => (
                    // <Entypo name="flag" size={24} color="tomato"/>
                    // <FontAwesome6 name="font-awesome-flag" size={22} color="tomato" />
                    <MaterialIcons
                      style={styles.icon}
                      name="outlined-flag"
                      size={24}
                      color="tomato"
                    />
                    // <MaterialCommunityIcons name="flag-variant-outline" size={24} color="tomato" />
                  )}
                  onPress={() => {
                    sendAnEmail(removeUnderscores(topicName))
                    setShowPopup(false)
                  }}
                  //@ts-ignore
                  style={{
                    // borderBottomWidth: 1,
                    // borderBottomColor: Colors.border,
                    // paddingLeft: 15,
                    paddingRight: 20,
                    marginTop: 0,
                  }}
                  titleStyle={{ color: Colors.text }}
                />
                <View
                  style={{
                    width: '85%',
                    height: 0.5,
                    backgroundColor: Colors.border,
                    marginHorizontal: 10,
                    alignItems: 'center',
                  }}
                />
                {/* <Divider></Divider> */}
                {/* <MistakeButton prop={topicName} /> */}
                {/* <QuizButton chapterName={chapterName} topicName={topicName} /> */}
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    textAlign: 'center',
    marginLeft: 10,
    // backgroundColor: 'red',
  },
})
