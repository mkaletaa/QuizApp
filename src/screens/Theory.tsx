import { useHeaderHeight } from '@react-navigation/elements'
import { useFocusEffect } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Snackbar } from 'react-native-paper'

import settings from '../../data/settings.json'
import { thereIsNothingHere } from '../../data/texts'
import { theory } from '../../data/theory/theory'
import ContentRenderer from '../components/ContentRenderer/_ContentRenderer'
import Ad from '../components/ContentRenderer/Ad'
import Spoiler from '../components/ContentRenderer/Spoiler'
import ArrowUp from '../components/molecules/atoms/ArrowUp'
import QuizButton from '../components/molecules/atoms/QuizButton'
import TheoryPopup from '../components/molecules/TheoryPopup'
import { Colors } from '../utils/constants'
import useStore from '../utils/store'

let previousOffset = 0
let localMinOffset = 0

export default function Theory({
  route,
}: {
  route: { params: { chapterName: string; topicName: string } }
}) {
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

  const enableCarousel = useStore(state => state.enableCarousel)
  const disableCarousel = useStore(state => state.disableCarousel)

  useFocusEffect(() => {
    enableCarousel()
    return () => {
      disableCarousel()
    }
  })

  useEffect(() => {
    return () => {
      useStore.getState().clearImages()
    }
  }, [])

  const scrollToSection = sectionIndex => {
    try {
      if (sectionListRef.current) {
        //@ts-ignore
        sectionListRef.current.scrollToLocation({
          animated: true,
          itemIndex: 1,
          sectionIndex,
        })
      }
    } catch (e) {}
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

    if (contentOffset.y < previousOffset && contentOffset.y > 100) {
      if (contentOffset.y + 100 < localMinOffset) setShowGoUp(true)
    } else {
      setShowGoUp(false)
      localMinOffset = contentOffset.y
    }

    previousOffset = contentOffset.y
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
              <Pressable onPress={() => scrollToSection(i)}>
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
            backgroundColor: Colors.screenBg,
            borderTopWidth: 1,
            borderTopColor: Colors.border,
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
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: index === 0 && 10,
      }}
    >
      <ContentRenderer content={typeof item === 'string' ? item : [item]} />
    </View>
  )

  const renderFooter = () => (
    <React.Fragment>
      <Ad size="large"></Ad>
      <View
        style={{
          padding: 30,
          alignItems: 'center',
          height: 200,
          marginBottom: settings.ads ? 30 : 0,
          // backgroundColor: 'red',
        }}
      >
        <QuizButton chapterName={chapterName} topicName={topicName} />
      </View>
    </React.Fragment>
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
          renderSectionHeader={renderSectionHeader}
          renderItem={({ item, index }) => renderItem({ item, index })}
          ListFooterComponent={renderFooter}
          keyExtractor={(item, index) => index.toString()}
        />
        <Spoiler />
        <View style={{ position: 'absolute', bottom: 80 }}>
          <Ad />
        </View>
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
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {thereIsNothingHere}
          </Text>
        </Snackbar>
        <Text style={{ fontWeight: 'bold', fontSize: 150, opacity: 0.1 }}>
          404
        </Text>
      </View>
    )
  }, [topicName])

  return (
    <View style={{ minHeight: screenHeight, backgroundColor: Colors.screenBg }}>
      <StatusBar style="auto" />
      <View
        style={[{ width: `${scrollPercentage}%` }, styles.progressBarContainer]}
      />

      <ArrowUp showGoUp={showGoUp} scrollToTop={scrollToTop} />

      {theoryData && shouldMemoize && (
        <TheoryPopup topicName={topicName} chapterName={chapterName} />
      )}
      {shouldMemoize ? (
        <React.Fragment>{memoizedComponents}</React.Fragment>
      ) : (
        <ActivityIndicator
          size={50}
          color={Colors.primary}
          style={{ top: screenHeight / 2 - 50 }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 5,
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.boldText,
    textAlign: 'center',
  },
  header: {
    padding: 10,
    borderColor: Colors.border,
    alignItems: 'center',
    gap: 5,
  },
})
