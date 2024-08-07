import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { quiz } from '../../data/quiz/quizModule'
import { getDailyStreak, getValue } from '../utils/utilStorage'

export default function Achievements() {
  const [streak, setStreak] = useState<number | null>(null)
  const [goodAnsCount, setGoodAnsCount] = useState<number | null>(null)
  const [chaptersGoodAnsCount, setChaptersGoodAnsCount] = useState<
    any[] | null
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
        for (let i = 0; i < Object.keys(quiz).length; i++) {
          let chapter = Object.keys(quiz)[i]
          let count = await getValue(chapter + '|goodAnsCount') || 0
          chaptersArray.push({ name: chapter, count: count })
        }
        setChaptersGoodAnsCount(chaptersArray)
      } catch (error) {
        console.error('Error achievements:', error)
        setStreak(-1)
        setGoodAnsCount(-1)
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
      {chaptersGoodAnsCount !== null &&
        chaptersGoodAnsCount.map(el => {
          return (
            <Text key={el.name}>
              number of correct answers for {el.name} chapter: {el.count}
            </Text>
          )
        })}
    </ScrollView>
  )
}
