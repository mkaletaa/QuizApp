import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import useAsyncStorage from '../hooks/useAsyncStorage'

export default function Stats({ onClose, catOrTop, key_: itemKey }) {
  const { getValue } = useAsyncStorage()
  const [stats, setStats] = useState<any>()
  console.log("keyy: ", itemKey) //key jest undefined

  useEffect(() => {
    console.log("key: ", itemKey) //key jest undefined
    getValue(itemKey).then(retrievedStats => {
      if (retrievedStats !== undefined) {
        setStats(retrievedStats)
        console.log("🚀 ~ getValue ~ retrievedStats:", retrievedStats) //null
      }
    })
  }, [])

  return (
    <View
      style={{
        height: '80%',
        width: '90%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
        marginTop: 50,
      }}
    >
      <AntDesign
        onPress={() => onClose()}
        name="closesquare"
        size={34}
        color="black"
      />
      {stats ? (
        <React.Fragment>
          <Text>Ile topików:</Text>
          <Text>ile pytań:</Text>
          <Text>ile odpowiedzainych {stats.answers}</Text>
          <Text>ile odpowiedzainych dobzre {stats.correctAnswers}</Text>
          <Text>ile odpowiedzainych źle {stats.incorrectAnswers}</Text>
          <Text>ile odpowiedzainych prawie dobrze {stats.kindOfAnswers}</Text>
          <Text>ile razy ukończony {stats.nrOfFinished}</Text>
          <Text>kiedy ostatnio ukończony {stats.lastFinished}</Text>
        </React.Fragment>
      ) : null}
    </View>
  )
}
