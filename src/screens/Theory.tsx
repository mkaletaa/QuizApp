import React, { useEffect, useMemo, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  Button,
  Dimensions,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { theory } from '../../data/theory/theory'
import ContentRenderer from '../components/ContentRenderer'
import { removeUnderscores, sendAnEmail } from '../utils/functions'
import { useHeaderHeight } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import useQuizData from '../utils/useQuizData'
import TheoryPrompt from '../components/ui/TheoryPrompt'
import QuizButton from '../components/ui/QuizButton'
import { FontAwesome5 } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

export default function Theory({ route }) {
  const sectionListRef = useRef()
  const [topicName, setTopicName] = useState('')
  const [chapterName, setChapterName] = useState('')
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [showGoUp, setShowGoUp] = useState(false)
  const screenHeight = Dimensions.get('window').height
  const headerHeight = useHeaderHeight()
  // const navigation = useNavigation()
  // const { countItemsInTopics } = useQuizData()

  useEffect(() => {
    setTopicName(route.params.topicName)
    setChapterName(route.params.chapterName)
  }, [route.params])

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={{ marginBottom: 10, fontSize: 30 }}>
        {removeUnderscores(topicName, true)}
      </Text>
      {theory[route.params.chapterName][route.params.topicName].map(
        (a, i) =>
          a.title && (
            <View
              key={i.toString()}
              style={{
                alignItems: 'flex-start',
                width: '100%',
                paddingHorizontal: 20,
                // backgroundColor: 'red',
              }}
            >
              <Pressable onPress={() => scrollToSection(i)}>
                <Text
                  style={{
                    fontSize: 23,
                    textDecorationLine: 'underline',
                    // backgroundColor: 'blue',
                  }}
                >
                  {a.title}
                </Text>
              </Pressable>
            </View>
          )
      )}
      {/* <Text style={styles.listHeaderText}>List Header</Text> */}
    </View>
  )

  const renderSectionHeader = ({ section }) => {
    if (section.title) {
      return (
        <View style={{ padding: 10, backgroundColor: 'lightgray' }}>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
      )
    }
    return null // Brak nagłówka dla sekcji bez tytułu
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {/* {renderComponent(component, width)} */}
      <ContentRenderer content={[item]} />
    </View>
  )

  const renderFooter = () => (
    <View style={styles.footer}>
      <QuizButton chapterName={chapterName} topicName={topicName} />
    </View>
  )

  // const showQuiz = (
  //   topicName: string,
  //   chapterName: string
  //   // howManyItems: number | null = null
  // ): void => {
  //   //* można tez zrobić że tutaj się pobierają pytania, i przekazywane w formie topArray lub przez zustand
  //   //@ts-ignore
  //   navigation.navigate('Quiz', {
  //     topName: topicName,
  //     chapName: chapterName,
  //     howManyItems: countItemsInTopics(topicName, chapterName),
  //     shuffle: false,
  //   })

  //   // setHowManyItems(null)
  // }

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
    return theory[route.params.chapterName][route.params.topicName] ? (
      <React.Fragment>
        <SectionList
          // contentContainerStyle={{ paddingBottom: 20 }}
          onScroll={handleScroll}
          ref={sectionListRef}
          sections={theory[route.params.chapterName][route.params.topicName]}
          scrollEventThrottle={15}
          ListHeaderComponent={renderHeader}
          stickySectionHeadersEnabled
          renderItem={renderItem}
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
        <Text>There is nothing here ;{'('}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 150, opacity: 0.1 }}>
          404
        </Text>
      </View>
    )
  }, [topicName])

  return (
    <View>
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
          { bottom: showGoUp ? 20 : -70 }, // Dynamiczne style
        ]}
        onPress={() => scrollToTop()}
      />


      <TheoryPrompt topicName={topicName} chapterName={chapterName} />
      {memoizedComponents}
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
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  item: {
    marginTop: 20,
    paddingHorizontal: 20, //*
    // backgroundColor: 'white',
  },
  footer: {
    backgroundColor: 'lightgray',
    padding: 10,
    alignItems: 'center',
  },
  goUp: {
    // width: 40,
    // height: 40,
    padding:8,
    backgroundColor: '#FFFFF0',
    position: 'absolute',
    bottom: 20,
    left: 30,
    zIndex: 1,
    borderRadius:15,
    elevation: 3
  },
})
