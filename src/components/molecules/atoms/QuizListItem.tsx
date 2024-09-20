import Octicons from '@expo/vector-icons/Octicons'
import React from 'react'
import { Text } from 'react-native'
import { List, Button as PaperButton } from 'react-native-paper'

import { takeAQuiz } from '../../../../data/texts'
import useOpenQuiz from '../../../hooks/useOpenQuiz'
import { COLOR, Colors } from '../../../utils/constants'
import useStore from '../../../utils/store'

export default function QuizListItem({ topicName, chapterName, handlePress }) {
  const { openQuiz, noQuestionModal } = useOpenQuiz()

  // const setShowPopup = useStore(state => state.setShowPopup)

  return (
    <React.Fragment>
      {/* <Button
        title={takeAQuiz}
        color="rgb(0, 150, 255)"
        onPress={() => {
          openQuiz({ topicName, chapterName })
          setShowPopup(false)
        }}
      /> */}
      <List.Item
        rippleColor={Colors.ripple}
        title={takeAQuiz}
        //@ts-ignore
        onPress={() => {
          // handlePress()
          openQuiz({ topicName, chapterName })
          // setShowPopup(false)
        }}
        left={() => {
          return (
            <Octicons
              name="light-bulb"
              size={24}
              color={COLOR.ORANGE}
              style={{ marginLeft: 10 }}
            />
          )
        }}
        titleStyle={{ color: Colors.text }}
      />
      {/* <PaperButton
        mode="elevated"
        // disabled={chosenOptions.length === 0}
        elevation={5}
        buttonColor={Colors.primary}
        style={{
          borderRadius: 4,
        }}
      >
        <Text
          style={{
            color: 'white',
          }}
        >
          {takeAQuiz.toUpperCase()}
        </Text>
      </PaperButton> */}
      {noQuestionModal()}
    </React.Fragment>
  )
}
