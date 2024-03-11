import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { theory } from '../../data/theory/theory'
import ContentRenderer from '../components/ContentRenderer'
import { sendAnEmail, removeUnderscores } from '../utils/functions'

export default function Theory({ route }) {
  const sectionListRef = useRef()
  const [topicName, setTopicName] = useState('')
  const [scrollPercentage, setScrollPercentage] = useState(0)
  // const [data, setData] = useState<any>([])
  // const scrollViewRef = useRef(null)
  console.log('rerender')

  useEffect(() => {
    setTopicName(route.params.topicName)
  }, [route.params])

  const handleScroll = event => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent
    const percent =
      (contentOffset.y / (contentSize.height - layoutMeasurement.height)) * 100
    setScrollPercentage(percent)
  }

  // const handleContentSizeChange = (contentWidth, contentHeight) => {
  //   //@ts-ignore
  //   sectionListRef.current.scrollTo({ x: 0, y: 0, animated: false })
  //   setScrollPercentage(0)
  // }

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <Text style={{ marginBottom: 20, fontSize: 20 }}>
        {removeUnderscores(topicName, true)}
      </Text>
      {theory[route.params.categoryName][route.params.topicName].map(
        (a, i) =>
          a.title && (
            <View
              style={{
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <Pressable onPress={() => scrollToSection(i)}>
                <Text
                  style={{
                    fontSize: 25,
                    textDecorationLine: 'underline',
                    // backgroundColor: 'red',
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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
      )
    }
    return null // Brak nagłówka dla sekcji bez tytułu
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <ContentRenderer content={[item]} />
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

  return (
    <View>
      <StatusBar style="auto" />
      <View
        style={{
          width: `${scrollPercentage}%`,
          height: 5,
          backgroundColor: 'green',
          position: 'absolute',
          top: 0,
          zIndex: 2,
        }}
      />

      {/* if there is data, render it. if not, show a message */}
      {theory[route.params.categoryName][route.params.topicName] ? (
        <React.Fragment>
          <SectionList
            onScroll={handleScroll}
            ref={sectionListRef}
            sections={theory[route.params.categoryName][route.params.topicName]}
            scrollEventThrottle={15}
            ListHeaderComponent={renderHeader}
            stickySectionHeadersEnabled
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button
            title="report a mistake"
            color="red"
            onPress={() => {
              sendAnEmail('Topic name: ' + removeUnderscores(topicName))
            }}
          />
        </React.Fragment>
      ) : (
        <Text>nie dalo sie otworzyc, elo</Text>
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
    backgroundColor: 'lightgray',
  },
  item: {
    // padding: 10,
    marginBottom: 10,
    // backgroundColor: 'white',
    // borderBottomWidth: 1,
    // borderBottomColor: 'lightgray',
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: 'lightgray',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  listHeader: {
    padding: 20,
    // backgroundColor: 'blue',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  listHeaderText: {
    fontSize: 20,
    color: 'white',
  },
})
