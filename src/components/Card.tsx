import React, { useState } from 'react'
import { removeUnderscores } from '../utils/functions'
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Dimensions,
  Modal,
} from 'react-native'
import useQuizData from '../hooks/useQuizData'

const screenWidthDim = Dimensions.get('window').width

const calculateCardSize = () => {
  //Adjust the size of the card based on the screen width
  const screenWidth = screenWidthDim
  const cardWidth = screenWidth >= 600 ? screenWidth / 3 : screenWidth / 2.3
  const cardHeight = cardWidth * 1.2

  return { width: cardWidth, height: cardHeight }
}

const cardSize = calculateCardSize()

export default function Card({
  data,
  catOrTop, //does this card represent topic or category
  onCardPress,
  onCardLongPress,
  showTheory = null,
}) {
  const handlePress = () => {
    if (data.name.endsWith('__All__')) {
      catOrTop === 'top' ? onCardPress() : onCardPress(data.name)
    } else {
      catOrTop === 'top' ? onCardPress([data.name]) : onCardPress(data.name)
    }
  }



  return (
    <Pressable
      onPress={handlePress}
      onLongPress={() => onCardLongPress()}
      //   style={({ pressed }) => [
      //     styles.cardPressable,
      //     pressed && styles.cardPressablePressed,
      //   ]}
    >


      <View style={[styles.cardContainer, cardSize]} key={data.name}>
        <Image
          style={[
            styles.cardImage,
            {
              alignSelf: 'center',
              height: cardSize.height * 0.6,
              backgroundColor: 'blue',
            },
          ]}
          source={{
            uri: data.image,
          }}
        />

        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.cardTitle}>
            {removeUnderscores(data.name, true)}
          </Text>

          {!data.name.endsWith('__All__') && catOrTop === 'top' ? (
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.readTouchable}
              onPress={() => showTheory()}
            >
              <Text style={styles.read}>Read</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cardPressable: {
    borderRadius: 10,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    gap: 5,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardDes: {
    fontSize: 12,
    textAlign: 'center',
  },
  cardImage: {
    width: '90%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textContainer: {
    justifyContent: 'center',
    gap: 5,
    marginTop: 5,
    width: '90%',
    height: cardSize.height - cardSize.width * 0.9,
  },
  readTouchable: {
    borderRadius: 10,
    borderTopWidth: 1,
    borderColor: 'grey',
  },
  read: {
    opacity: 0.6,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
})
