import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Modal, ScrollView, View } from 'react-native'

import { chapters } from '../../data/data'
import Card from '../components/Card'
import Gradient from '../components/molecules/atoms/Gradient'
import RandomQuestionButton from '../components/molecules/atoms/RandomQuestionButton'
import { Colors } from '../utils/constants'
import utilStyles from '../utils/styles'

export default function Chapters() {
  const navigation = useNavigation()

  const goToTopics = chapName => {
    // @ts-ignore
    navigation.navigate('Topics', { chapterName: chapName })
  }

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: Colors.screenBg,
      }}
    >
      <Gradient />

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

      {/* <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={false}
        visible={true}
        onRequestClose={() => {}}
        // style={{}}
      >
        <View style={{height: 100, marginTop: 100 }}>
          <ScrollView horizontal style={{ height: 100, }}>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: 'pink',
                borderWidth: 1,
              }}
            ></View>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: 'pink',
                borderWidth: 1,
              }}
            ></View>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: 'pink',
                borderWidth: 1,
              }}
            ></View>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: 'pink',
                borderWidth: 1,
              }}
            ></View>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: 'pink',
                borderWidth: 1,
              }}
            ></View>
          </ScrollView>
        </View>
      </Modal> */}
    </View>
  )
}
