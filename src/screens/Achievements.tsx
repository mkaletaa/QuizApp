import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-paper'

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
  const [infiniteStreak, setInfiniteStreak] = useState<number | null>(null)
  const [goodInfiniteStreak, setGoodInfiniteStreak] = useState<number | null>(
    null,
  )
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

        const infiniteStreakResult = await getValue('infiniteStreak')
        setInfiniteStreak(infiniteStreakResult)
        const goodInfiniteStreakResult = await getValue('goodInfiniteStreak')
        setGoodInfiniteStreak(goodInfiniteStreakResult)

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

  const rangs = [
    { name: 'expert', min: 72, max: Infinity },
    { name: 'laik', min: 0, max: 71 },
  ]
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Achievements</Text>
      <Text style={styles.streak}>
        Your Daily Streak is: {streak !== null ? streak : 0}
      </Text>
      <Text style={styles.info}>
        Complete at least one quiz everyday to increase the streak
      </Text>
      <Text>
        Infinite streak maximum: {infiniteStreak !== null ? infiniteStreak : 0}
      </Text>
      <Text>
        Good Infinite streak maximum:{' '}
        {goodInfiniteStreak !== null ? goodInfiniteStreak : 0}
      </Text>
      <Text style={styles.totalCorrectAnswers}>
        Total number of correct answers:{' '}
        {goodAnsCount !== null ? goodAnsCount : 0}
      </Text>
      {/* {
        rangs.map(el => {
          if (goodAnsCount >= el.min && goodAnsCount <= el.max) return
        })
      } */}
      {rangs.map(el => {
        if (goodAnsCount >= el.min && goodAnsCount <= el.max) {
          return (
            <>
              <Text>Twoja ranga to: {el.name}</Text>
              <View
                style={{
                  width: '100%',
                  backgroundColor: 'grey',
                  height: 15,
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: el.max===Infinity ? '100%' : `${(goodAnsCount / el.max) * 100}%`,
                    backgroundColor: 'green',
                    height: '100%',
                    borderRadius: 10,
                  }}
                />
              </View>
            </>
          )
        }
        return null // jeśli warunek nie jest spełniony, zwracamy null
      })}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chapter Stats</Text>
        {chaptersGoodAnsCount !== null &&
          chaptersGoodAnsCount.map(chapter => (
            <View key={chapter.name}>
              {rangs.map(rang => {
                if (chapter.count >= rang.min && chapter.count <= rang.max) {
                  return (
                    <View key={rang.name}>
                      <Text>
                        Twoja ranga w rozdziale {chapter.name} to: {rang.name}
                      </Text>
                      <Text key={chapter.name} style={styles.item}>
                        Number of correct answers for {chapter.name} chapter:{' '}
                        {chapter.count}
                      </Text>
                      <View
                        style={{
                          width: '100%',
                          backgroundColor: 'grey',
                          height: 15,
                          borderRadius: 10,
                          overflow: 'hidden',
                        }}
                      >
                        <View
                          style={{
                            width: rang.max===Infinity ? '100%' :`${(chapter.count / rang.max) * 100}%`,
                            backgroundColor: 'green',
                            height: '100%',
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    </View>
                  )
                }
                return null // jeśli warunek nie jest spełniony, zwracamy null
              })}
            </View>
          ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Topic Stats</Text>
        {topicsAllGoodAnsCount !== null &&
          topicsAllGoodAnsCount.map((el, i) => {
            // console.log(topics[el.chapter].find(top=>top.name === el.topic).image)
            return (
              <>
                {i === 0 && <Text>{topicsAllGoodAnsCount[0].chapter}</Text>}

                {topicsAllGoodAnsCount[i].chapter ===
                  topicsAllGoodAnsCount[i + 1]?.chapter && (
                  <Text>{topicsAllGoodAnsCount[i].chapter}</Text>
                )}
                <View
                  key={`${el.chapter}-${el.topic}`}
                  style={{ flexDirection: 'row', gap: 10 }}
                >
                  <View>
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        tintColor: 'gray',
                        borderRadius: 5,
                      }}
                      source={{
                        uri: `${topics[el.chapter].find(top => top.name === el.topic).image}`,
                      }}
                    />
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        position: 'absolute',
                        opacity: el.count > 0 ? 1 : 0.2,
                        borderRadius: 5,
                      }}
                      source={{
                        uri: `${topics[el.chapter].find(top => top.name === el.topic).image}`,
                      }}
                    />
                  </View>
                  <Text style={styles.item}>
                    {el.topic} | {el.count}
                  </Text>
                </View>
              </>
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
