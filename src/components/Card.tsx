import React from 'react'
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native'
import useModifyText from '../hooks/useModifyText'

export default function Card({
  data,
  showQuiz,
  goToTopics = null,
  children = null,
}) {
  const handlePress = () => {
    if (data.name.endsWith('__All__')) {
      showQuiz()
    } else {
      goToTopics === null ? showQuiz([data.name]) : goToTopics(data.name)
    }
  }
  const windowDimensions = useWindowDimensions()
  const modifyText = useModifyText()

  const calculateCardSize = () => {
    // Dostosuj rozmiar karty na podstawie szerokości ekranu
    const screenWidth = windowDimensions.width
    const cardWidth = screenWidth >= 600 ? screenWidth / 3 : screenWidth / 2.7 // Przykładowy podział dla szerokich i wąskich ekranów
    const cardHeight = !goToTopics ? cardWidth * 1.25 : cardWidth * 1.2 // Przykładowy stosunek wysokości do szerokości

    return { width: cardWidth, height: cardHeight }
  }

  const cardSize = calculateCardSize()

//   function mofidyText(str: string): string {
//     // Jeśli str zawiera __All__, usuń je
//     let modifiedStr = str

//     if (str.endsWith('__All__')) {
//       modifiedStr = str.replace('__All__', '')
//       modifiedStr += ' - all topics'
//     }

//     // Następnie, jeśli zawiera podkreślenia, zamień je na spacje
//     modifiedStr = modifiedStr.replace(/_/g, ' ')

//     return modifiedStr
//   }

  return (
    <Pressable
      onPress={handlePress}
      //   style={({ pressed }) => [
      //     styles.cardPressable,
      //     pressed && styles.cardPressablePressed,
      //   ]}
    >
      <View style={[styles.cardContainer, cardSize]} key={data.name}>
        <Text numberOfLines={1} style={styles.cardText}>
          {modifyText(data.name)}
        </Text>

        <Image
          style={[styles.cardImage, { alignSelf: 'center' }]}
          source={{
            uri: data.image,
          }}
        />

        {children}
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
    // overflow: 'hidden'
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
    marginTop: 15,
    marginBottom: -5,
    borderRadius: 10,
  },
})
