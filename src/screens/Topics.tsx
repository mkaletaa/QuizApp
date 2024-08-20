import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'

import { chapters, topics } from '../../data/data'
import Card from '../components/Card'
import Gradient from '../components/molecules/atoms/Gradient'
import RandomQuestionButton from '../components/molecules/atoms/RandomQuestionButton'
import ChapterDescription from '../components/molecules/ChapterDescription'
import useOpenQuiz from '../hooks/useOpenQuiz'
import { Colors } from '../utils/constants'
import utilStyles from '../utils/styles'

export default function Topics({ route }) {
  const [chapterName, setChapterName] = useState('')
  const [chapterDes, setChapterDes] = useState('')
  const [topicsToShow, setTopicsToShow] = useState([]) 
  const navigation = useNavigation()
  const { openQuiz, noQuestionModal } = useOpenQuiz()

  useEffect(() => {
    const chapterName: string = route.params.chapterName

    const chapter = chapters.find(chapter => chapter.name === chapterName).des
    setChapterDes(
      chapter
        ? "<span style='font-size:16px'>" + chapter + '</span>'
        : undefined,
    )
    if (chapterName && topics[chapterName]) {
      setChapterName(chapterName)
      setTopicsToShow([...topics[chapterName]])
    }
  }, [route.params])

  const showTheory = (topicName, chapterName) => {
    //@ts-ignore
    navigation.navigate('Theory', { topicName, chapterName })
  }

  //this function calls importQuiz and gives it an array of chosen topics
  const showQuiz = (topicName: string, chapterName: string): void => {
    openQuiz({ topicName, chapterName })
  }

  // const [pressedTopic, setPressedTopic] = useState<string>()
  function handleLongPress(pressedTopicName: string) {
    // setPressedTopic(pressedTopicName)
    // setShowStats(true)
    //@ts-ignore
    navigation.navigate('Questions', {
      topicName: pressedTopicName,
      chapterName: chapterName,
    })
  }

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: Colors.screenBg,
      }}
    >
      <Gradient />

      <RandomQuestionButton chapName={chapterName} />
      <ScrollView contentContainerStyle={utilStyles.scrollViewCardContainer}>
        {chapterDes !== undefined && (
          <ChapterDescription chapterDescription={chapterDes} />
        )}

        {topicsToShow.map(topic => (
          <Card
            chapOrTop={'top'}
            key={topic.name}
            data={topic}
            onCardPress={() => showQuiz(topic.name, chapterName)}
            showTheory={() => showTheory(topic.name, chapterName)}
            onCardLongPress={() => handleLongPress(topic.name)}
          ></Card>
        ))}
        {noQuestionModal()}
      </ScrollView>

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={showStats}
        onRequestClose={() => setShowStats(false)}
      >
        <Stats
          key_={pressedTopic}
          onClose={() => setShowStats(false)}
          chapOrTop={'top'}
        />
      </Modal> */}

      {/* <CustomModal
        showModal={showNoQuestionsModal}
        onRequestClose={() => setShowNoQuestionsModal(false)}
        modalText={noQuestions}
      ></CustomModal> */}
    </View>
  )
}
