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
  View,
} from 'react-native'
import { thereIsNothingHere } from '../../data/texts'
import { theory } from '../../data/theory/theory'
import ContentRenderer from '../components/ContentRenderer'
import QuizButton from '../components/ui/QuizButton'
import TheoryPrompt from '../components/ui/TheoryPrompt'
import { removeUnderscores } from '../utils/functions'

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


  useEffect(() => {
    setTheoryData(theory[route.params.chapterName][route.params.topicName])
    setTopicName(route.params.topicName)
    setChapterName(route.params.chapterName)
    setTimeout(() => {
      setShouldMemoize(true)
    }, 0)
  }, [route.params])

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={{ marginBottom: 10, fontSize: 30 }}>
        {removeUnderscores(topicName, true)}
      </Text>
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
                // backgroundColor: 'red',
              }}
            >
              <Pressable onPress={() => scrollToSection(i)}>
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
  )

  const renderSectionHeader = ({ section }) => {
    if (section.title) {
      return (
        <View
          style={{
            padding: 10,
            paddingLeft: 30,
            backgroundColor: 'rgb(243, 243, 243)',
            borderTopWidth: 1,
            borderTopColor: 'rgb(243, 243, 243)',
            elevation: 3,
            shadowColor: '#000', // Kolor cienia
            shadowOffset: { width: 0, height: 2 }, // Przesunięcie cienia (width, height)
            shadowOpacity: 0.5, // Przezroczystość cienia (0 - 1)
            shadowRadius: 3, // Promień cienia
          }}
        >
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
      )
    }
    return null // Brak nagłówka dla sekcji bez tytułu
  }

  const renderItem = ({ item, index }) => (
    <View
      style={{
        marginBottom: 20,
        paddingHorizontal: 20,
        marginTop: index === 0 && 10, //set marginTop for the forst element from a segment
      }}
    >
      <ContentRenderer content={[item]} />
    </View>
  )

  const renderFooter = () => (
    <View style={{ padding: 30, alignItems: 'center' }}>
      <QuizButton chapterName={chapterName} topicName={topicName} />
    </View>
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
          // contentContainerStyle={{ paddingBottom: 20 }}
          onScroll={handleScroll}
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
    <View style={{ minHeight: screenHeight }}>
      <StatusBar style="auto" />
      <View
        style={[
          {
            width: `${scrollPercentage}%`,
          },
          styles.progressBarContainer,
        ]}
      />

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

      {theoryData && shouldMemoize && (
        <TheoryPrompt topicName={topicName} chapterName={chapterName} />
      )}
      {shouldMemoize ? (
        memoizedComponents
      ) : (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ top: screenHeight / 2 - 50 }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  progressBarContainer: {
    height: 5,
    backgroundColor: 'green',
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
    gap: 5,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  goUp: {
    padding: 8,
    backgroundColor: '#FFFFF8',
    position: 'absolute',
    bottom: 20,
    left: 30,
    zIndex: 1,
    borderRadius: 15,
    elevation: 3,
  },
})
