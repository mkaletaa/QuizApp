import { Button as PaperButton } from 'react-native-paper'

import { randomQuestion } from '../../../../data/texts'
import useOpenQuiz from '../../../hooks/useOpenQuiz'
import { Colors } from '../../../utils/constants'

export default function RandomQuestionButton({ chapName }) {
  const { openQuiz, noQuestionModal } = useOpenQuiz()

  function instantQuestion() {
    try {
      openQuiz({
        topicName: '',
        chapterName: chapName,
        howManyItems: Infinity,
        shuffle: true,
      })
    } catch (e) {
      console.error(e)
    }
    return
  }

  return (
    <>
      {noQuestionModal()}
      <PaperButton
        mode="elevated"
        icon="dice-5"
        onPress={instantQuestion}
        elevation={5}
        buttonColor={Colors.primary}
        textColor="white"
        style={{
          alignItems: 'center',
          borderRadius: 10,
          justifyContent: 'center',
          bottom: 40,
          position: 'absolute',
          zIndex: 2,
          flexDirection: 'row',
        }}
      >
        {randomQuestion}
      </PaperButton>
    </>
  )
}
