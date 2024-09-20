import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Modal, ScrollView, View } from 'react-native'

import { chapters } from '../../data/data'
import Card from '../components/Card'
import Gradient from '../components/molecules/atoms/Gradient'
import RandomQuestionButton from '../components/molecules/atoms/RandomQuestionButton'
import { Colors } from '../utils/constants'
import useStore from '../utils/store'
import utilStyles from '../utils/styles'
import { getValue } from '../utils/utilStorage'
import Spoiler from '../components/ContentRenderer/Spoiler'

export default function Chapters() {
  const navigation = useNavigation()
  const setHljsStyle = useStore().setHljsStyle

  const goToTopics = chapName => {
    // @ts-ignore
    navigation.navigate('Topics', { chapterName: chapName })
  }

  useEffect(() => {
    ;(async () => {
      const codeStyle = await getValue('hljsStyle')
      // console.log('🚀 ~ ; ~ codeStyle:', codeStyle)
      if (codeStyle) setHljsStyle(codeStyle)
    })()
  }, [])

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: Colors.screenBg,
      }}
    >
      <Gradient />
      <Spoiler />
      <RandomQuestionButton chapName={'__All__'} />
      <ScrollView contentContainerStyle={utilStyles.scrollViewCardContainer}>
        <StatusBar style="auto" />

        {chapters?.map(chapter => (
          <Card
            chapOrTop={'cat'}
            key={chapter.name}
            data={chapter}
            onCardPress={goToTopics}
            onCardLongPress={() => {}}
          />
        ))}
      </ScrollView>
    </View>
  )
}
