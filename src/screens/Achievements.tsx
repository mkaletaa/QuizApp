import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { Text } from 'react-native-paper'

import { chapters, topics } from '../../data/data'
import { quiz } from '../../data/quiz/quizModule'
import Gradient from '../components/molecules/atoms/Gradient'
import { COLOR, Colors } from '../utils/constants'
import { removeUnderscores } from '../utils/functions'
import { getValue } from '../utils/utilStorage'

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
  const [faces, setFaces] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const streakResult = await getDailyStreak()
        // setStreak(streakResult)
        // console.log('🚀 ~ fetchData ~ streakResult:', streakResult)

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

        let faceArr = []
        for (let i = 0; i <= 17; i++) {
          let face = await getValue(`face_${i}`)
          faceArr.push(face)
        }
        setFaces(faceArr)

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
    { name: 'legend', min: 10000, max: Infinity },
    { name: 'grandmaster', min: 5000, max: 9999 },
    { name: 'master', min: 3000, max: 4999 },
    { name: 'expert', min: 2000, max: 2999 },
    { name: 'advanced', min: 1000, max: 1999 },
    { name: 'skilled', min: 500, max: 999 },
    { name: 'intermediate', min: 250, max: 499 },
    { name: 'apprentice', min: 100, max: 249 },
    { name: 'beginner', min: 25, max: 99 },
    { name: 'novice', min: 0, max: 24 },
  ]

  // const chapterRangs = [
  //   { name: 'legend', min: 10000, max: Infinity },
  //   { name: 'grandmaster', min: 5000, max: 9999 },
  //   { name: 'master', min: 3000, max: 4999 },
  //   { name: 'expert', min: 2000, max: 2999 },
  //   { name: 'advanced', min: 1000, max: 1999 },
  //   { name: 'skilled', min: 100, max: 999 },
  //   { name: 'intermediate', min: 50, max: 99 },
  //   { name: 'apprentice', min: 20, max: 49 },
  //   { name: 'beginner', min: 10, max: 19 },
  //   { name: 'novice', min: 0, max: 9 },
  // ]
  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.heading}>Achievements</Text>
      <Text style={styles.streak}>
        Your Daily Streak is: {streak !== null ? streak : 0}
      </Text>
      <Text style={styles.info}>
        Complete at least one quiz everyday to increase the streak
      </Text> */}
      <Text
        variant="bodyLarge"
        style={[
          styles.section,
          {
            backgroundColor: Colors.gradientLight,
            borderRadius: 10,
            padding: 10,
            elevation: 1,
            borderWidth: 1,
            borderColor: Colors.gradient,
          },
        ]}
      >
        Gamification in learning uses game design elements to make educational
        experiences more engaging and motivating. By incorporating badges and
        challenges, it transforms traditional learning into an enjoyable
        process.
      </Text>
      <View style={[styles.section, { gap: 7 }]}>
        <Text variant="titleLarge">
          Endless Challenger: {infiniteStreak !== null ? infiniteStreak : 0}
        </Text>
        <Text variant="bodyMedium">
          The highest number of consecutive answers in 'Random Question' mode
          (all chapters at once).
        </Text>
        <Divider></Divider>
        <Text variant="titleLarge">
          Flawless Streak:{' '}
          {goodInfiniteStreak !== null ? goodInfiniteStreak : 0}
        </Text>
        <Text variant="bodyMedium">
          The longest streak of consecutive{' '}
          <Text style={{ textDecorationLine: 'underline' }}>correct</Text>{' '}
          answers in 'Random Question' mode (all chapters at once).
        </Text>
        <Divider></Divider>
        <Text
          variant="titleLarge"
          //style={styles.totalCorrectAnswers}
        >
          Total Correct Answers: {goodAnsCount !== null ? goodAnsCount : 0}
        </Text>
        <Text variant="bodyMedium">
          The total number of correct answers given across the app.
        </Text>
      </View>

      {rangs.map(el => {
        if (goodAnsCount >= el.min && goodAnsCount <= el.max) {
          return (
            <View style={{ alignItems: 'center', gap: 10, marginTop: 10 }}>
              <Text
                variant="labelLarge"
                style={{
                  backgroundColor: Colors.gradient,
                  borderRadius: 15,
                  paddingHorizontal: 10,
                }}
              >
                {el.name}
              </Text>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: '100%',
                    height: 15,
                  },
                ]}
              >
                <View
                  style={{
                    width:
                      el.max === Infinity
                        ? '100%'
                        : `${(goodAnsCount / el.max) * 100}%`,
                    backgroundColor: COLOR.GREEN,
                    height: '100%',
                    borderRadius: 10,
                    // borderWidth:3,
                    // borderColor: 'green'
                  }}
                />
                {/* <Gradient  ></Gradient> */}
              </View>
            </View>
          )
        }
        return null // jeśli warunek nie jest spełniony, zwracamy null
      })}

      <View style={styles.section}>
        <Text variant="headlineSmall">Chapters Stats</Text>
        <Text variant="bodyLarge">
          The total number of correct answers given in each chapter.
        </Text>
        {chaptersGoodAnsCount !== null &&
          chaptersGoodAnsCount.map(chapter => (
            <View key={chapter.name}>
              {rangs.map(rang => {
                if (chapter.count >= rang.min && chapter.count <= rang.max) {
                  return (
                    <View
                      key={rang.name}
                      style={{ flexDirection: 'row', gap: 5 }}
                    >
                      <Image
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 5,
                        }}
                        source={{
                          uri: `${chapters.find(chap => chap.name === chapter.name).image}`,
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          height: 80,
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text
                          key={chapter.name}
                          variant="titleMedium"
                          style={{
                            width: '90%',
                            // backgroundColor: 'red',
                            alignSelf: 'center',
                          }}
                        >
                          {removeUnderscores(chapter.name, true)}:{' '}
                          {chapter.count}
                        </Text>
                        <View
                          style={{
                            position: 'relative',
                            //backgroundColor: 'red',
                            marginBottom: 20,
                          }}
                        >
                          <Text
                            style={{
                              // width: '100%',
                              position: 'absolute',
                              textAlign: 'center',
                              alignSelf: 'center',
                              backgroundColor: Colors.gradient,
                              borderRadius: 15,
                              paddingHorizontal: 10,
                            }}
                            variant="labelLarge"
                          >
                            {rang.name}
                          </Text>
                        </View>

                        <View
                          style={[
                            ,
                            styles.progressBar,
                            {
                              width: '90%',
                              height: 10,
                              alignSelf: 'center',
                            },
                          ]}
                        >
                          <View
                            style={{
                              width:
                                rang.max === Infinity
                                  ? '100%'
                                  : `${(chapter.count / rang.max) * 100}%`,
                              backgroundColor: COLOR.GREEN,
                              height: '100%',
                              borderRadius: 10,
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  )
                }
                return null // jeśli warunek nie jest spełniony, zwracamy null
              })}
            </View>
          ))}
      </View>

      <View style={[styles.section]}>
        <Text variant="headlineSmall">Lessons Stats</Text>
        {topicsAllGoodAnsCount !== null &&
          topicsAllGoodAnsCount.map((el, i) => {
            // console.log(topics[el.chapter].find(top=>top.name === el.topic).image)
            return (
              <>
                {/* {topicsAllGoodAnsCount[i].chapter ===
                  topicsAllGoodAnsCount[i + 1]?.chapter && (
                  <Text variant="titleMedium" style={{ marginLeft: 10 }}>
                    {removeUnderscores(topicsAllGoodAnsCount[i].chapter, true)}
                  </Text>
                )} */}
                <View
                  key={`${el.chapter}-${el.topic}`}
                  style={{ flexDirection: 'row', gap: 10, width: '100%' }}
                >
                  <View>
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        tintColor: Colors.gradientLight,
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
                        opacity: el.count > 0 ? 1 : 0.1,
                        borderRadius: 5,
                      }}
                      source={{
                        uri: `${topics[el.chapter].find(top => top.name === el.topic).image}`,
                      }}
                    />
                  </View>
                  <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <Text variant="bodyMedium">
                      Achieved 100% correct answers on a quiz from the lesson{' '}
                      {removeUnderscores(el.topic, true)}
                    </Text>
                    {el.count !== 0 && (
                      <Text variant="labelLarge">
                        You did it {el.count}{' '}
                        {el.count === 1 ? 'time' : 'times'}
                      </Text>
                    )}
                  </View>
                </View>
              </>
            )
          })}
      </View>

      <View style={styles.section}>
        <Text variant="titleLarge">Face Collection</Text>
        <Text variant="bodyLarge">
          Your progress in quizzes has revealed these unique expressions. Keep
          completing quizzes to discover more!
        </Text>
        {/* <Text variant='bodyLarge'>Here are the faces you've unlocked based on your quiz results. Keep completing quizzes to discover more!</Text> | Can
          you unlock them all? */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between', // rozstawienie elementów
            marginBottom: 32,
          }}
        >
          {faces.map((a, i) => {
            return (
              <View
                key={i}
                style={{
                  width: '16.6%',
                  marginBottom: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'red',
                }}
              >
                {a ? (
                  <FontAwesome6 name={a} size={44} color={Colors.boldText} />
                ) : (
                  <FontAwesome5
                    name="question"
                    size={34}
                    color={Colors.gradient}
                  />
                )}
              </View>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    // backgroundColor: 'red'
    backgroundColor: Colors.screenBg,
  },
  section: {
    marginTop: 26,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
    gap: 10,
    // backgroundColor: 'red'
  },
  progressBar: {
    backgroundColor: Colors.gradientLight,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gradient,
  },
})
