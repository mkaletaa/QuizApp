import React, { useEffect, useState } from 'react'
import { ScrollView, Text } from 'react-native'

import { quiz } from '../../data/quiz/quizModule'
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
  const [topicsGoodAnsCount, setTopicsGoodAnsCount] = useState<
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
        setTopicsGoodAnsCount(topicsArray)
      } catch (error) {
        console.error('Error achievements:', error)
        setStreak(-1)
        setGoodAnsCount(-1)
        setChaptersGoodAnsCount([{ name: 'Error', count: -1 }])
        setTopicsGoodAnsCount([{ chapter: 'Error', topic: 'Error', count: -1 }])
      }
    }

    fetchData()
  }, [])

  return (
    <ScrollView>
      <Text>Achievements</Text>
      <Text>Daily streak: {streak !== null ? streak : 0}</Text>
      <Text>
        Total number of correct answers:{' '}
        {goodAnsCount !== null ? goodAnsCount : 0}
      </Text>
      <Text></Text>
      {chaptersGoodAnsCount !== null &&
        chaptersGoodAnsCount.map(el => (
          <Text key={el.name}>
            Number of correct answers for {el.name} chapter: {el.count}
          </Text>
        ))}
        <Text></Text>
      {topicsGoodAnsCount !== null &&
        topicsGoodAnsCount.map(el => (
          <Text key={`${el.chapter}-${el.topic}`}>
            Number of All correct answers for {el.chapter} - {el.topic} topic:{' '}
            {el.count}
          </Text>
        ))}
    </ScrollView>
  )
}
