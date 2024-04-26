import React from 'react'
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { removeUnderscores } from '../utils/functions'
import { read } from '../../data/texts'

console.log('card')
const screenWidthDim = Dimensions.get('window').width

const calculateCardSize = () => {
  //Adjust the size of the card based on the screen width
  const screenWidth = screenWidthDim
  const cardWidth = screenWidth >= 600 ? screenWidth / 3.5 : screenWidth / 2.25
  const cardHeight = cardWidth * 1.3

  return { width: cardWidth, height: cardHeight }
}

const cardSize = calculateCardSize()

export default function Card({
  data,
  chapOrTop, //does this card represent topic or category
  onCardPress,
  onCardLongPress,
  showTheory = null,
}) {
  const handlePress = () => {
    // if (data.name.endsWith('__All__')) {
    //   chapOrTop === 'top' ? onCardPress() : onCardPress(data.name)
    // } else {
    chapOrTop === 'top' ? onCardPress([data.name]) : onCardPress(data.name)
    // }
  }

  return (
    <View style={[styles.card, cardSize]} key={data.name}>
      <Pressable
        onPress={handlePress}
        style={{ width: '100%', height: '100%' }}
      >
          <Image
            style={[
              styles.image,
              {
                height: cardSize.height * 0.6,
              },
            ]}
            source={{
              uri: data.image,
            }}
          />

        <View style={styles.footer}>
          <Text numberOfLines={1} style={styles.title}>
            {removeUnderscores(data.name, true)}
          </Text>

          {chapOrTop === 'top' ? (
            <TouchableOpacity
              activeOpacity={0.75}
              style={{ alignItems: 'center', flex: 1 }}
              onPress={() => showTheory()}
            >
              <View style={styles.separator}></View>
              <Text style={styles.readText}>{read}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 10,
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
  image: {
    width: '80%',
    resizeMode: 'cover',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 15,
  },
  footer: {
    justifyContent: 'center',
    gap: 5,
    marginTop: 5,
    width: '100%',
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  separator: {
    borderRadius: 10,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    width: '70%',
  },
  readText: {
    opacity: 0.6,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    width: '100%',
    height: '100%',
  },
})
