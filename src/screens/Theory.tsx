import { AntDesign } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useFocusEffect } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { Snackbar } from 'react-native-paper';



import { thereIsNothingHere } from '../../data/texts';
import { theory } from '../../data/theory/theory';
import ContentRenderer from '../components/ContentRenderer/_ContentRenderer';
import Spoiler from '../components/ContentRenderer/Spoiler';
import QuizButton from '../components/molecules/atoms/QuizButton';
import TheoryPopup from '../components/molecules/TheoryPopup';
import { boldTextColor, borderColor, buttonDark, screenBackground, sectionHeaderBG, spinner, surfaceBg } from '../utils/constants';
import useStore from '../utils/store';


export default function Theory({ route }) {
  const [topicName, setTopicName] = useState('')
  const [chapterName, setChapterName] = useState('')
  const [theoryData, setTheoryData] = useState([])
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [showGoUp, setShowGoUp] = useState(false)
  const [shouldMemoize, setShouldMemoize] = useState(false)

  const screenHeight = Dimensions.get('window').height
  const headerHeight = useHeaderHeight()

  const sectionListRef = useRef()

  // const navigateTo = useStore(state => state.navigateTo)
  // const setNavigateTo = useStore(state => state.setNavigateTo)
  // const navigation = useNavigation()

  // useEffect(() => {
  // if (navigateTo) {
  //   const { destination, topic, chapter } = navigateTo

  //   // navigation.navigate("Theory", { topicName: "top_1", chapterName: "cat_1" })
  //   navigation.navigate(destination, { topicName: topic, chapterName: chapter })

  //   setNavigateTo(undefined)
  // }
  // }, [navigateTo])

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
      // useStore.getState().setShowPopup(false) //todo : naprawić bo ta linia nie działa
    }
  }, [])

  useFocusEffect(() => {})

  const scrollToSection = sectionIndex => {
    try {
      if (sectionListRef.current) {
        //@ts-ignore
        sectionListRef.current.scrollToLocation({
          animated: true,
          itemIndex: 1, //for some reason I have to set 1 instead of 0 while` using stickySectionHeadersEnabled
          sectionIndex,
        })
      }
    } catch (e) {
      // do nothing
      // previously app crashed after user wanted to scroll to the sections that hasn't been rendered yet
    }
  }

  const scrollToTop = () => {
    if (sectionListRef.current) {
      //@ts-ignore
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex: 0,
        itemIndex: 0,
        viewOffset: 0,
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

  const renderHeader = () => (
    <View
      style={[
        styles.header,
        { borderBottomWidth: theoryData.length > 1 ? 3 : 0 },
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
                }}
              >
                <Text
                  style={{
                    fontSize: 21,
                    textDecorationLine: 'underline',
                    color: '#54039b',
                  }}
                >
                  {theoryData[0]?.title ? i + 1 : i} {a.title}
                </Text>
              </Pressable>
            </View>
          ),
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
            paddingRight: 30,
            backgroundColor: sectionHeaderBG,
            borderTopWidth: 1,
            borderTopColor: borderColor,
          }}
        >
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
      )
    }
    return null // No header for the section with no title
  }

  const renderItem = ({ item, index }) => (
    <View
      style={{
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: index === 0 && 10, //set marginTop for the first element from a segment
      }}
    >
      <ContentRenderer content={[item]} />
    </View>
  )

  const memoizedComponents = useMemo(() => {
    return theoryData ? (
      <React.Fragment>
        <SectionList
          onStartShouldSetResponder={() => true}
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
        <Snackbar
          visible={true}
          onDismiss={() => null}
          elevation={0}
          style={{ bottom: 10 }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Text>{thereIsNothingHere}</Text>
          </Text>
        </Snackbar>
        <Text style={{ fontWeight: 'bold', fontSize: 150, opacity: 0.1 }}>
          404
        </Text>
      </View>
    )
  }, [topicName])

  const renderFooter = () => (
    <View style={{ padding: 30, alignItems: 'center', height: 200 }}>
      <QuizButton chapterName={chapterName} topicName={topicName} />
    </View>
  )

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

      <AntDesign
        name="up"
        size={40}
        color={boldTextColor}
        style={[styles.goUp, { bottom: showGoUp ? 120 : -70 }]}
        onPress={() => scrollToTop()}
      />

      {theoryData && shouldMemoize && (
        <TheoryPopup topicName={topicName} chapterName={chapterName} />
      )}
      {shouldMemoize ? (
        <React.Fragment>
          <Spoiler />
          {memoizedComponents}
        </React.Fragment>
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
  progressBarContainer: {
    height: 5,
    backgroundColor: buttonDark,
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  header: {
    padding: 10,
    borderColor: borderColor,
    alignItems: 'center',
    gap: 5,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: boldTextColor,
    textAlign: 'center',
  },
  goUp: {
    padding: 8,
    backgroundColor: surfaceBg,
    position: 'absolute',
    bottom: 20,
    left: 30,
    zIndex: 1,
    borderRadius: 15,
    elevation: 3,
  },
})