import React from 'react'
import { Text } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { takeAQuiz } from '../../../../data/texts'
import useOpenQuiz from '../../../hooks/useOpenQuiz'
import { buttonDark } from '../../../utils/constants'
import useStore from '../../../utils/store'
export default function QuizButton({ topicName, chapterName }) {
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
      <PaperButton
        mode="elevated"
        onPress={() => {
          openQuiz({ topicName, chapterName })
          // setShowPopup(false)
        }}
        // disabled={chosenOptions.length === 0}
        elevation={5}
        buttonColor={buttonDark}
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
      </PaperButton>
      {noQuestionModal()}
    </React.Fragment>
  )
}
