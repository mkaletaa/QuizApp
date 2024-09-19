import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Text as PaperText } from 'react-native-paper'

import settings from '../../data/settings.json'
import {
  correctAnsNr,
  incorrectAnsNr,
  kindofAnsNr,
  results,
} from '../../data/texts'
import { COLOR, Colors } from '../utils/constants'
import { setFaceStat } from '../utils/utilStorage'
import Ad from './ContentRenderer/Ad'

export default function ResultsHeader({
  resultsArray,
  correctNr,
  kindofNr,
  incorrectNr,
}) {
  const [maxOutcome, setMaxOutcome] = useState<number>(-1)
  const [usersOutcome, setUsersOutcome] = useState<number>(-2)

  useEffect(() => {
    setMaxOutcome(resultsArray.length * 2)
    setUsersOutcome(correctNr * 2 + kindofNr)
  }, [])

  const returnIcon = useMemo(() => {
    let probability: number | 'rare' | 'common' = Math.random()
    console.log('🚀 ~ returnIcon ~ probability:', probability)
    probability = probability > 0.75 ? 'rare' : 'common'

    switch (probability) {
      case 'common':
        if (usersOutcome === maxOutcome) {
          setFaceStat(0, 'face-grin-hearts')
          return (
            <FontAwesome6 name="face-grin-hearts" size={44} color="green" />
          )
        } else if (usersOutcome >= (maxOutcome * 8) / 9) {
          setFaceStat(2, 'face-laugh-beam')
          return <FontAwesome6 name="face-laugh-beam" size={44} color="green" />
        } else if (usersOutcome >= (maxOutcome * 7) / 9) {
          setFaceStat(4, 'face-smile')
          return <FontAwesome6 name="face-smile" size={44} color="green" />
        } else if (usersOutcome >= (maxOutcome * 6) / 9) {
          setFaceStat(6, 'face-rolling-eyes')
          return (
            <FontAwesome6 name="face-rolling-eyes" size={44} color="#FF8000" />
          )
        } else if (usersOutcome >= (maxOutcome * 5) / 9) {
          setFaceStat(8, 'face-meh-blank')
          return (
            <FontAwesome6 name="face-meh-blank" size={44} color="#FF8000" />
          )
        } else if (usersOutcome >= (maxOutcome * 4) / 9) {
          setFaceStat(10, 'face-surprise')
          return <FontAwesome6 name="face-surprise" size={44} color="#FF8000" />
        } else if (usersOutcome >= (maxOutcome * 3) / 9) {
          setFaceStat(12, 'face-frown-open')
          return <FontAwesome6 name="face-frown-open" size={44} color="red" />
        } else if (usersOutcome >= (maxOutcome * 2) / 9) {
          setFaceStat(13, 'face-tired')
          return <FontAwesome6 name="face-tired" size={44} color="red" />
        } else if (usersOutcome >= (maxOutcome * 1) / 9) {
          setFaceStat(15, 'face-sad-cry')
          return <FontAwesome6 name="face-sad-cry" size={44} color="red" />
        } else if (usersOutcome >= 0) {
          setFaceStat(17, 'face-dizzy')
          return <FontAwesome6 name="face-dizzy" size={44} color="red" />
        }

      case 'rare':
        if (usersOutcome === maxOutcome) {
          setFaceStat(1, 'face-grin-stars')
          return <FontAwesome6 name="face-grin-stars" size={44} color="green" />
        } else if (usersOutcome >= (maxOutcome * 8) / 9) {
          setFaceStat(3, 'face-grin-beam-sweat')
          return (
            <FontAwesome6 name="face-grin-beam-sweat" size={44} color="green" />
          )
        } else if (usersOutcome >= (maxOutcome * 7) / 9) {
          setFaceStat(5, 'face-smile-wink')
          return <FontAwesome6 name="face-smile-wink" size={44} color="green" />
        } else if (usersOutcome >= (maxOutcome * 6) / 9) {
          setFaceStat(7, 'face-flushed')
          return <FontAwesome6 name="face-flushed" size={44} color="#FF8000" />
        } else if (usersOutcome >= (maxOutcome * 5) / 9) {
          setFaceStat(9, 'face-meh')
          return <FontAwesome6 name="face-meh" size={44} color="#FF8000" />
        } else if (usersOutcome >= (maxOutcome * 4) / 9) {
          setFaceStat(11, 'face-grimace')
          return <FontAwesome6 name="face-grimace" size={44} color="#FF8000" />
        } else if (usersOutcome >= (maxOutcome * 3) / 9) {
          setFaceStat(12, 'face-frown-open')
          return <FontAwesome6 name="face-frown-open" size={44} color="red" />
        } else if (usersOutcome >= (maxOutcome * 2) / 9) {
          setFaceStat(14, 'face-angry')
          return <FontAwesome6 name="face-angry" size={44} color="red" />
        } else if (usersOutcome >= (maxOutcome * 1) / 9) {
          setFaceStat(16, 'face-sad-tear')
          return <FontAwesome6 name="face-sad-tear" size={44} color="red" />
        } else if (usersOutcome >= 0) {
          setFaceStat(17, 'face-dizzy')
          return <FontAwesome6 name="face-dizzy" size={44} color="red" />
        }
    }
  }, [maxOutcome])

  const returnLabel = () => {
    if (usersOutcome === maxOutcome)
      return (
        <PaperText variant="labelLarge" style={{ color: 'green' }}>
          {settings.lang === 'pl' ? 'no i o to chodziło!' : 'excellent!'}
        </PaperText>
      )
    else if (usersOutcome >= (maxOutcome * 8) / 9)
      return (
        <PaperText variant="labelLarge" style={{ color: 'green' }}>
          {settings.lang === 'pl' ? 'sztywniutko' : 'almost perfect'}
        </PaperText>
      )
    else if (usersOutcome >= (maxOutcome * 7) / 9)
      return (
        <PaperText variant="labelLarge" style={{ color: 'green' }}>
          {settings.lang === 'pl' ? 'najs' : 'very good'}
        </PaperText>
      )
    else if (usersOutcome >= (maxOutcome * 6) / 9)
      return (
        <PaperText variant="labelLarge" style={{ color: '#FF8000' }}>
          {settings.lang === 'pl' ? 'mogło być lepiej' : 'on the right track'}
        </PaperText>
      )
    else if (usersOutcome >= (maxOutcome * 5) / 9)
      return (
        <PaperText variant="labelLarge" style={{ color: '#FF8000' }}>
          {settings.lang === 'pl' ? 'może zdasz' : 'you can do better'}
        </PaperText>
      )
    else if (usersOutcome >= (maxOutcome * 4) / 9)
      return (
        <PaperText variant="labelLarge" style={{ color: '#FF8000' }}>
          {settings.lang === 'pl' ? 'no prawie' : "don't give up"}
        </PaperText>
      )
    else if (usersOutcome >= (maxOutcome * 3) / 9)
      return (
        <PaperText variant="labelLarge" style={{ color: 'red' }}>
          {settings.lang === 'pl' ? 'z czym do ludzi' : 'maybe next time'}
        </PaperText>
      )
    else if (usersOutcome >= (maxOutcome * 2) / 9)
      return (
        <PaperText variant="labelLarge" style={{ color: 'red' }}>
          {settings.lang === 'pl'
            ? 'bez spiny, są drugie terminy'
            : 'no one is perfect'}
        </PaperText>
      )
    else if (usersOutcome >= (maxOutcome * 1) / 9)
      return (
        <PaperText variant="labelLarge" style={{ color: 'red' }}>
          {settings.lang === 'pl' ? 'XD' : 'try again'}
        </PaperText>
      )
    else
      return (
        <PaperText variant="labelLarge" style={{ color: 'red' }}>
          {settings.lang === 'pl'
            ? 'małpa by to lepiej rozwiązała'
            : 'you need to put in more effort'}
        </PaperText>
      )
  }

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        gap: 20,
        marginBottom: 15,
        maxWidth: 500,
        alignSelf: 'center',
      }}
    >
      <View
        style={{
          // backgroundColor: '#e8e6fc', //#ddddf4 //#ececf9 //rgb(225,221,254) //d7d2f1
          // elevation: 2,
          // borderRadius: 8,
          width: '85%',
          paddingBottom: 0,
          overflow: 'hidden',
          //
          backgroundColor: Colors.gradientLight,
          borderRadius: 10,
          elevation: 1,
          borderWidth: 1,
          borderBottomWidth: 0,
          borderColor: Colors.gradient,
        }}
      >
        <View
          style={{
            position: 'absolute',
            right: 15,
            top: 10,
            alignItems: 'center',
          }}
        >
          {returnIcon}
          <View style={{ maxWidth: 110 }}>{returnLabel()}</View>
        </View>

        <View
          style={{
            padding: 10,
          }}
        >
          <PaperText variant="headlineSmall" style={{ marginBottom: 5 }}>
            {results}
          </PaperText>
          <PaperText variant="titleMedium" style={{ color: Colors.text }}>
            {correctAnsNr}
            {
              <PaperText
                variant="titleLarge"
                style={{ color: 'green', fontWeight: 'bold' }}
              >
                {correctNr}
              </PaperText>
            }
          </PaperText>
          <PaperText variant="titleMedium" style={{ color: Colors.text }}>
            {incorrectAnsNr}
            {
              <PaperText
                variant="titleLarge"
                style={{ color: 'red', fontWeight: 'bold' }}
              >
                {incorrectNr}
              </PaperText>
            }
          </PaperText>
          {kindofNr ? (
            <PaperText variant="titleMedium" style={{ color: Colors.text }}>
              {kindofAnsNr}
              {
                <PaperText
                  variant="titleLarge"
                  style={{ color: '#FF8000', fontWeight: 'bold' }}
                >
                  {kindofNr}
                </PaperText>
              }
            </PaperText>
          ) : null}
        </View>
        <View
          style={{
            width: '100%',
            height: 6,
            backgroundColor: 'grey',
            flexDirection: 'row',
            borderRadius: 5,
            elevation: 0,
          }}
        >
          <View
            style={{
              width: `${(correctNr / resultsArray.length) * 100}%`,
              backgroundColor: COLOR.GREEN,
            }}
          ></View>
          <View
            style={{
              width: `${(kindofNr / resultsArray.length) * 100}%`,
              backgroundColor: COLOR.ORANGE,
            }}
          ></View>
          <View
            style={{
              width: `${(incorrectNr / resultsArray.length) * 100}%`,
              backgroundColor: COLOR.RED,
            }}
          ></View>
        </View>
      </View>
      {settings.ads && <Ad size={'large'}></Ad>}
    </View>
  )
}
