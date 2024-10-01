import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { TouchableRipple } from 'react-native-paper'

import { read } from '../../data/texts'
import { COLOR, Colors } from '../utils/constants'
import { removeUnderscores } from '../utils/functions'

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
    // setTimeout(()=>{

    chapOrTop === 'top' ? onCardPress([data.name]) : onCardPress(data.name)
    // }, 0)
    // }
  }
  const navigation = useNavigation()
  const handleLongPress = () => {
    chapOrTop === 'top' ? onCardLongPress() : null
  }

  return (
    <View style={[styles.card, cardSize]} key={data.name}>
      {data.soon && (
        <View
          style={{
            backgroundColor: 'rgba(220,225,255, .7)',
            height: '100%',
            width: '100%',
            position: 'absolute',
            justifyContent: 'center',
            zIndex: 2,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#5846c7',
              fontWeight: 'bold',
              fontSize: 20,
              transform: [{ rotate: '-10deg' }],
              textShadowColor: '#323232', // Kolor cienia
              textShadowOffset: { width: 1, height: 1 }, // Przesunięcie cienia
              textShadowRadius: 2, // Promień rozmycia cienia
              width: '100%',
              textAlign: 'center',
            }}
          >
            COMING SOON
          </Text>
        </View>
      )}
      <TouchableRipple
        rippleColor={Colors.ripple}
        onPress={data.soon ? null : handlePress}
        onLongPress={handleLongPress}
        style={{ width: '100%', height: '100%' }}
      >
        <React.Fragment>
          <Image
            style={[
              styles.image,
              {
                height: cardSize.height * 0.6,
              },
            ]}
            source={
              data.image
                ? {
                    uri: data.image,
                  }
                : require('../../assets/failImage.png')
            }
          />

          <View style={styles.footer}>
            <Text numberOfLines={1} style={styles.title}>
              {removeUnderscores(data.name, true)}
            </Text>

            {chapOrTop === 'top' ? (
              <TouchableOpacity
                activeOpacity={0.75}
                style={{ alignItems: 'center', flex: 1 }}
                onPress={data.soon ? null : () => showTheory()}
              >
                <View style={styles.separator}></View>
                <Text style={styles.readText}>{read}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </React.Fragment>
      </TouchableRipple>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    backgroundColor: Colors.surfaceBg,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    gap: 5,
    elevation: 2,
    // borderWidth: 1,
    // borderColor: Colors.border
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
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
    color: Colors.boldText,
  },
  separator: {
    borderRadius: 10,
    borderTopWidth: 1,
    borderColor: Colors.border,
    width: '70%',
  },
  readText: {
    opacity: 0.9,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    width: '100%',
    height: '100%',
    color: '#756789', //#756789 //#8f8a96
    letterSpacing: 0.5,
  },
})
