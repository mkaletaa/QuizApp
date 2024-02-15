import React from 'react'
import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

export default function Card({ data, showQuiz, goToTopics }) {
  const handlePress = () => {
    if (data.name.endsWith('__All__')) {
      showQuiz([data.name])
    } else {
      goToTopics(data.name)
    }
  }
  const windowDimensions = useWindowDimensions()

  const calculateCardSize = () => {
    // Dostosuj rozmiar karty na podstawie szerokości ekranu
    const screenWidth = windowDimensions.width
    const cardWidth = screenWidth >= 600 ? screenWidth / 3 : screenWidth/2.7 // Przykładowy podział dla szerokich i wąskich ekranów
    const cardHeight = cardWidth*1.2  // Przykładowy stosunek wysokości do szerokości

    return { width: cardWidth, height: cardHeight }
  }
    const cardSize = calculateCardSize()


  return (
    <Pressable
      onPress={handlePress}
      //   style={({ pressed }) => [
      //     styles.cardPressable,
      //     pressed && styles.cardPressablePressed,
      //   ]}
    >
      <View style={[styles.cardContainer, cardSize]} key={data.name}>
        <Text style={styles.cardText}>
          {data.name}
          {windowDimensions.width}
        </Text>

        <Image
          style={[styles.cardImage, { alignSelf: 'center' }]}
          source={{
            uri: data.image,
          }}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cardPressable: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  cardPressablePressed: {
    backgroundColor: '#ddd', // Change to the desired pressed color
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
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },
})
