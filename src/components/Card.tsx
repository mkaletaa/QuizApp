import React from 'react'
import {removeUnderscores} from '../utils/modifyText'
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native'
import useImportItem from '../hooks/useImportItem'

export default function Card({
  data,
  showQuiz = null,
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
  const {countItems} = useImportItem()

  const calculateCardSize = () => {
    //Adjust the size of the card based on the screen width
    const screenWidth = windowDimensions.width
    const cardWidth = screenWidth >= 600 ? screenWidth / 3 : screenWidth / 2.3 
    const cardHeight = !goToTopics ? cardWidth * 1.25 : cardWidth * 1.2 

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
        <Text numberOfLines={1} style={styles.cardTitle}>
          {removeUnderscores(data.name)}
        </Text>
        <Text numberOfLines={1} style={styles.cardDes}>
          {/* {showQuiz!==null && countItems('cat_1', [data.name])} questions */}
        </Text>

        <Image
          style={[
            styles.cardImage,
            { alignSelf: 'center', height: cardSize.height * 0.6 },
          ]}
          source={{
            uri: data.image,
          }}
          // aspectRatio={1/1}
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
  cardTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardDes: {
    fontSize: 12,
    marginBottom: 10,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  cardImage: {
    width: '90%',
    // resizeMode: 'contain',
    resizeMode: 'cover',
    // marginTop: 15,
    marginBottom: -5,
    borderRadius: 10,
  },
})
