import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'

import { topics } from '../../data/data'
import { quiz } from '../../data/quiz/quizModule'
import Gradient from '../components/molecules/atoms/Gradient'
import { Colors } from '../utils/constants'
import { getDailyStreak, getValue } from '../utils/utilStorage'

//todo: add achievement of infinitymode (ile z rzędu, ile z rzędu dobrze)
//todo: allGoodAnsCount to raczej zrobić żeby było 1 tylko w sensie albo zrobiłeś albo nie
//todo: topicGoodAnsCount raczej zlikiwdować
export default function Achievements() {
  const [streak, setStreak] = useState<number | null>(null)
  const [goodAnsCount, setGoodAnsCount] = useState<number | null>(null)
  const [chaptersGoodAnsCount, setChaptersGoodAnsCount] = useState<
    { name: string; count: number }[] | null
  >(null)
  const [topicsAllGoodAnsCount, setTopicsAllGoodAnsCount] = useState<
    { chapter: string; topic: string; count: number }[] | null
  >(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const streakResult = await getDailyStreak()
        setStreak(streakResult)
        console.log('🚀 ~ fetchData ~ streakResult:', streakResult)

        const goodAnsCountResult = await getValue('goodAnsCount')
        setGoodAnsCount(goodAnsCountResult)

        let chaptersArray = []
        let topicsArray = []

        // Iterate over chapters
        for (let chapterKey of Object.keys(quiz)) {
          let chapterCount = (await getValue(chapterKey + '|goodAnsCount')) || 0
          chaptersArray.push({ name: chapterKey, count: chapterCount })

          // Iterate over topics in each chapter
          for (let topicKey of Object.keys(quiz[chapterKey])) {
            let topicCount =
              (await getValue(`${chapterKey}|${topicKey}|allGoodAnsCount`)) || 0
            topicsArray.push({
              chapter: chapterKey,
              topic: topicKey,
              count: topicCount,
            })
          }
        }

        setChaptersGoodAnsCount(chaptersArray)
        setTopicsAllGoodAnsCount(topicsArray)
      } catch (error) {
        console.error('Error achievements:', error)
        setStreak(-1)
        setGoodAnsCount(-1)
        setChaptersGoodAnsCount([{ name: 'Error', count: -1 }])
        setTopicsAllGoodAnsCount([
          { chapter: 'Error', topic: 'Error', count: -1 },
        ])
      }
    }

    fetchData()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Achievements</Text>
      <Text style={styles.streak}>
        Your Daily Streak is: {streak !== null ? streak : 0}
      </Text>
      <Text style={styles.info}>
        Complete at least one quiz everyday to increase the streak
      </Text>
      <Text style={styles.totalCorrectAnswers}>
        Total number of correct answers:{' '}
        {goodAnsCount !== null ? goodAnsCount : 0}
      </Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chapter Stats</Text>
        {chaptersGoodAnsCount !== null &&
          chaptersGoodAnsCount.map(el => (
            <Text key={el.name} style={styles.item}>
              Number of correct answers for {el.name} chapter: {el.count}
            </Text>
          ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Topic Stats</Text>
        {topicsAllGoodAnsCount !== null &&
          topicsAllGoodAnsCount.map(el => {
            // console.log(topics[el.chapter].find(top=>top.name === el.topic).image)
            return (
              <View
                key={`${el.chapter}-${el.topic}`}
                style={{ flexDirection: 'row', gap: 10 }}
              >
                <View>
                  <Image
                    style={{ width: 70, height: 70, tintColor: 'gray' }}
                    source={{
                      uri: `${topics[el.chapter].find(top => top.name === el.topic).image}`,
                    }}
                  />
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      position: 'absolute',
                      opacity: el.count>0 ? 1 : .2,
                    }}
                    source={{
                      uri: `${topics[el.chapter].find(top => top.name === el.topic).image}`,
                    }}
                  />
                </View>
                <Text style={styles.item}>
                  Complete {el.topic} quiz ({el.chapter}) perfectly | {el.count}
                </Text>
              </View>
            )
          })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.screenBg,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  streak: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  totalCorrectAnswers: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
    width: 200,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    fontSize: 16,
    marginBottom: 4,
  },
})
