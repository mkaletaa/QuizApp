import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text as PaperText } from 'react-native-paper'

import settings from '../../data/settings.json'
import { COLOR, Colors } from '../utils/constants'
import Ad from './ContentRenderer/Ad'

export default function ResultsHeader({
  resultsArray,
  correctNr,
  kindofNr,
  incorrectNr,
}) {
  const [maxOutcome, setMaxOutcome] = useState<number>(-1)
  const [usersOutcome, setUsersOutcome] = useState<number>(-1)

  useEffect(() => {
    setMaxOutcome(resultsArray.length * 2)
    setUsersOutcome(correctNr * 2 + kindofNr)
  }, [])

  const returnIcon = () => {
    if (usersOutcome === maxOutcome)
      return <FontAwesome6 name="face-grin-hearts" size={44} color="green" />
    else if (usersOutcome >= (maxOutcome * 8) / 9)
      return <FontAwesome6 name="face-laugh-beam" size={44} color="green" />
    else if (usersOutcome >= (maxOutcome * 7) / 9)
      return <FontAwesome6 name="face-smile" size={44} color="green" />
    else if (usersOutcome >= (maxOutcome * 6) / 9)
      return <FontAwesome6 name="face-rolling-eyes" size={44} color="#FF8000" />
    else if (usersOutcome >= (maxOutcome * 5) / 9)
      return <FontAwesome6 name="face-meh-blank" size={44} color="#FF8000" />
    else if (usersOutcome >= (maxOutcome * 4) / 9)
      return <FontAwesome6 name="face-surprise" size={44} color="#FF8000" />
    else if (usersOutcome >= (maxOutcome * 3) / 9)
      return <FontAwesome6 name="face-frown-open" size={44} color="red" />
    else if (usersOutcome >= (maxOutcome * 2) / 9)
      return <FontAwesome6 name="face-tired" size={44} color="red" />
    else if (usersOutcome >= (maxOutcome * 1) / 9)
      return <FontAwesome6 name="face-sad-cry" size={44} color="red" />
    else return <FontAwesome6 name="face-dizzy" size={44} color="red" />
  }

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
      style={{ width: '100%', alignItems: 'center', gap: 20, marginBottom: 15 }}
    >
      <View
        style={{
          backgroundColor: '#e8e6fc', //#ddddf4 //#ececf9 //rgb(225,221,254) //d7d2f1
          elevation: 2,
          width: '85%',
          paddingBottom: 0,
          borderRadius: 8,
          overflow: 'hidden',
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
          {returnIcon()}
          <View style={{ maxWidth: 110 }}>{returnLabel()}</View>
        </View>

        <View
          style={{
            padding: 10,
          }}
        >
          <PaperText variant="headlineSmall" style={{ marginBottom: 5 }}>
            Results
          </PaperText>
          <PaperText variant="titleMedium" style={{ color: Colors.text }}>
            Correct answers:{' '}
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
            Incorrect answers:{' '}
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
              Partially correct answers:{' '}
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
