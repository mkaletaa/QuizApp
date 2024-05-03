import { Entypo } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { thereIsNothingHere } from '../../data/texts'
import { theory } from '../../data/theory/theory'
import ContentRenderer from '../components/ContentRenderer/_ContentRenderer'
import QuizButton from '../components/ui/QuizButton'
import TheoryPopup from '../components/ui/TheoryPopup'
import { removeUnderscores } from '../utils/functions'
import useStore from '../utils/store'
import { goUpBackground, sectionHeaderBG, spinner } from '../utils/constants'
import { screenBackground } from '../utils/constants'

export default function Theory({ route }) {
  const sectionListRef = useRef()
  const [topicName, setTopicName] = useState('')
  const [chapterName, setChapterName] = useState('')
  const [theoryData, setTheoryData] = useState([])
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [showGoUp, setShowGoUp] = useState(false)
  const [shouldMemoize, setShouldMemoize] = useState(false)
  const screenHeight = Dimensions.get('window').height
  const headerHeight = useHeaderHeight()
  // const { images, addImage, removeImage } = useStore()

  const setShowPopup = useStore(state => state.setShowPopup)

  useEffect(() => {
    setTheoryData(theory[route.params.chapterName][route.params.topicName])
    setTopicName(route.params.topicName)
    setChapterName(route.params.chapterName)
    setTimeout(() => {
      setShouldMemoize(true)
    }, 0)
  }, [route.params])

  // useEffect(() => {
  //   // Przetwarzanie danych i dodawanie wartości obrazów do stanu `images`
  //   theoryData.forEach(segment => {
  //     if (segment.data) {
  //       segment.data.forEach(item => {
  //         if (item.type === 'Image') {
  //           const imageUrl = item.value
  //           useStore.getState().addImage(imageUrl)
  //         }
  //       })
  //     }
  //   })
  // }, [theoryData])

  useEffect(() => {
    //todo: dodaj do store carousel=true
    useStore.getState().enableCarousel()

    return () => {
      useStore.getState().clearImages() // Pobierz funkcję clearImages ze stanu
      // clearImages() // Wywołaj funkcję clearImages przy opuszczaniu ekranu
      useStore.getState().disableCarousel()
      useStore.getState().setShowPopup(false) //todo : naprawić bo ta linia nie działa
    }
  }, [])

  const renderHeader = () => (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowPopup(false)
      }}
    >
      <View
        style={[
          styles.header,
          { borderBottomWidth: theoryData[1]?.title ? 1 : 0 },
        ]}
      >
        {theoryData.map(
          (a, i) =>
            a.title && (
              <View
                key={i.toString()}
                style={{
                  alignItems: 'flex-start',
                  width: '100%',
                  paddingHorizontal: 20,
                  gap: 20,
                }}
              >
                <Pressable
                  onPress={() => {
                    scrollToSection(i)
                    setShowPopup(false)
                  }}
                >
                  <Text
                    style={{
                      fontSize: 21,
                      textDecorationLine: 'underline',
                      // backgroundColor: 'blue',
                    }}
                  >
                    {/* sprawdź czy pierwszy segment ma tytuł i na tej podstawie zdecyduj od którego numery rozpocząć indeksowanie */}
                    {theoryData[0]?.title ? i + 1 : i} {a.title}
                  </Text>
                </Pressable>
              </View>
            )
        )}
      </View>
    </TouchableWithoutFeedback>
  )

  const renderSectionHeader = ({ section }) => {
    if (section.title) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            setShowPopup(false)
          }}
        >
          <View
            style={{
              padding: 10,
              paddingLeft: 30,
              paddingRight: 30,

              // backgroundColor: 'red',
              backgroundColor: sectionHeaderBG,
              borderTopWidth: 1,
              borderTopColor: "lightgray",
              // elevation: 1,
              // shadowColor: '#000', // Kolor cienia
              // shadowOffset: { width: 0, height: 2 }, // Przesunięcie cienia (width, height)
              // shadowOpacity: 0.5, // Przezroczystość cienia (0 - 1)
              // shadowRadius: 3, // Promień cienia
            }}
          >
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    return null // Brak nagłówka dla sekcji bez tytułu
  }

  const renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowPopup(false)
      }}
    >
      <View
        style={{
          paddingBottom: 20,
          paddingHorizontal: 20,
          paddingTop: index === 0 && 10, //set marginTop for the forst element from a segment
        }}
      >
        <ContentRenderer content={[item]} />
      </View>
    </TouchableWithoutFeedback>
  )

  const renderFooter = () => (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowPopup(false)
      }}
    >
      <View style={{ padding: 30, alignItems: 'center', height: 200 }}>
        <QuizButton chapterName={chapterName} topicName={topicName} />
      </View>
    </TouchableWithoutFeedback>
  )

  const scrollToSection = sectionIndex => {
    if (sectionListRef.current) {
      //@ts-ignore
      sectionListRef.current.scrollToLocation({
        animated: true,
        itemIndex: 1, //for some reason I have to set 1 instead of 0 while` using stickySectionHeadersEnabled
        sectionIndex,
      })
    }
  }

  const scrollToTop = () => {
    // Przewiń do nagłówka listy
    if (sectionListRef.current) {
      //@ts-ignore
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex: 0,
        itemIndex: 0, // Dla nagłówka listy itemIndex powinien być ustawiony na 0
        viewOffset: 0, // Opcjonalne: Offset od góry widoku
      })
    }
  }

  const handleScroll = event => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent
    const percent =
      (contentOffset.y / (contentSize.height - layoutMeasurement.height)) * 100
    setScrollPercentage(percent)
    if (contentOffset.y > 100) setShowGoUp(true)
    else setShowGoUp(false)
  }

  const memoizedComponents = useMemo(() => {
    return theoryData ? (
      <React.Fragment>
        <SectionList
          onStartShouldSetResponder={() => true}
          contentContainerStyle={{
            // backgroundColor: screenBackground,
            // height: '100%',
          }}
          onScroll={handleScroll}
          onScrollBeginDrag={() => setShowPopup(false)}
          ref={sectionListRef}
          sections={theoryData}
          scrollEventThrottle={15}
          ListHeaderComponent={renderHeader}
          stickySectionHeadersEnabled
          renderItem={({ item, index }) => renderItem({ item, index })}
          renderSectionHeader={renderSectionHeader}
          ListFooterComponent={renderFooter}
          keyExtractor={(item, index) => index.toString()}
        />
      </React.Fragment>
    ) : (
      <View
        style={{
          justifyContent: 'center',

          alignItems: 'center',
          height: screenHeight - headerHeight,
        }}
      >
        <Text>{thereIsNothingHere}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 150, opacity: 0.1 }}>
          404
        </Text>
      </View>
    )
  }, [topicName])

  return (
    <View
      style={{ minHeight: screenHeight, backgroundColor: screenBackground }}
    >
      <StatusBar style="auto" />
      <View
        style={[
          {
            width: `${scrollPercentage}%`,
          },
          styles.progressBarContainer,
        ]}
      />

      <TouchableWithoutFeedback
        onPress={() => {
          setShowPopup(false)
        }}
      >
        <Entypo
          name="arrow-up"
          size={40}
          color="black"
          style={[
            styles.goUp,
            { bottom: showGoUp ? 120 : -70 }, // Dynamiczne style
          ]}
          onPress={() => scrollToTop()}
        />
      </TouchableWithoutFeedback>

      {theoryData && shouldMemoize && (
        <TheoryPopup topicName={topicName} chapterName={chapterName} />
      )}
      {shouldMemoize ? (
        memoizedComponents
      ) : (
        <ActivityIndicator
          size={50}
          color={spinner}
          style={{ top: screenHeight / 2 - 50 }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flexGrow: 1,
  //   backgroundColor: screenBackground,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingBottom: 50,
  // },
  progressBarContainer: {
    height: 5,
    backgroundColor: 'green',
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  header: {
    padding: 10,
    // borderBottomWidth: 1,
    alignItems: 'center',
    gap: 5,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: 'black',
    color: 'rgb(20, 20, 60)',
    textAlign: 'center',
    // paddingRight:10
  },
  goUp: {
    padding: 8,
    backgroundColor: goUpBackground,
    position: 'absolute',
    bottom: 20,
    left: 30,
    zIndex: 1,
    borderRadius: 15,
    elevation: 3,
  },
})
