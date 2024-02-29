import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import useAsyncStorage from '../hooks/useAsyncStorage'

export default function Stats({ onClose, catOrTop, key_: itemKey }) {
  const { getValue } = useAsyncStorage()
  const [stats, setStats] = useState<any>()
  console.log('keyy: ', itemKey) //key jest undefined

  useEffect(() => {
    console.log('key: ', itemKey) //key jest undefined
    getValue(itemKey).then(retrievedStats => {
      if (retrievedStats !== undefined) {
        setStats(retrievedStats)
        console.log('🚀 ~ getValue ~ retrievedStats:', retrievedStats) //null
      }
    })
  }, [])

  return (
    <View style={styles.modalContainer}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          elevation: 10,
          borderWidth: 2,
          borderColor: 'lightgrey',
          padding: 10,
          gap: 8
        }}
      >
        <AntDesign
        style={{right: 5, top: 5, position: 'absolute'}}
          onPress={() => onClose()}
          name="closesquare"
          size={34}
          color="red"
        />

        {stats && (
          <React.Fragment>
            <Text style={styles.text}>Ile topików:</Text>
            <Text style={styles.text}>ile pytań:</Text>
            {/* <Text>ile odpowiedzainych {stats.answers}</Text>
          <Text>ile odpowiedzainych dobzre {stats.correctAnswers}</Text>
          <Text>ile odpowiedzainych źle {stats.incorrectAnswers}</Text>
          <Text>ile odpowiedzainych prawie dobrze {stats.kindOfAnswers}</Text> */}
            <Text style={styles.text}>ile razy ukończony {stats.nrOfFinished}</Text>
            <Text style={styles.text}>kiedy ostatnio ukończony {stats.lastFinished}</Text>
            <Text style={styles.text}>ile razy ukończony na fulla {stats.allCorrect}</Text>
            <Text style={styles.text}>najlepszy wynik {stats.bestResult}</Text>
          </React.Fragment>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Przeźroczyste tło modalu
  },
  text:{
    fontSize: 18
  }
})