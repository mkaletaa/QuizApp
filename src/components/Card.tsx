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
    <Pressable
      onPress={handlePress}
      // onLongPress={() => onCardLongPress()}
      //   style={({ pressed }) => [
      //     styles.cardPressable,
      //     pressed && styles.cardPressablePressed,
      //   ]}
    >
      <View style={[styles.cardContainer, cardSize]} key={data.name}>
        {/* <View
          style={{
            width: '90%',
            marginTop: 10,
          }}
        > */}
          <Image
            style={[
              styles.cardImage,
              {
                alignSelf: 'center',
                height: cardSize.height * 0.6,
                // backgroundColor: 'blue',
                marginTop: 15,
              },
            ]}
            source={{
              uri: data.image,
            }}
          />
        {/* </View> */}

        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.cardTitle}>
            {removeUnderscores(data.name, true)}
          </Text>

          {!data.name.endsWith('__All__') && chapOrTop === 'top' ? (
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
    // paddingHorizontal: 10,
    // paddingTop: 10,
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
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    // width: '90%'
    paddingHorizontal: 15
  },
  cardDes: {
    fontSize: 12,
    textAlign: 'center',
  },
  cardImage: {
    width: '80%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textContainer: {
    justifyContent: 'center',
    gap: 5,
    marginTop: 5,
    width: '100%',
    // alignItems: 'center',
    // height: cardSize.height - cardSize.width * 0.9,
    // height: '30%',
    // backgroundColor: 'green',
    flex: 1,
  },
  readTouchable: {
    borderRadius: 10,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    // backgroundColor: 'red',
    flex: 1,
  },
  read: {
    opacity: 0.6,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
})
